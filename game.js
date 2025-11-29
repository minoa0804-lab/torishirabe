// グローバル変数
let currentScreen = 'title';
let currentDifficulty = 'easy';
let gameState = {
    score: 0,
    combo: 0,
    maxCombo: 0,
    perfect: 0,
    good: 0,
    miss: 0,
    startTime: 0,
    isPlaying: false,
    currentPattern: null,
    activeCircles: [],
    spawnedCircles: new Set(),
    psychologyPercentage: 0, // 心理バー（%）
};

// 画面遷移
function showScreen(screenName) {
    const screens = ['titleScreen', 'difficultyScreen', 'howToPlayScreen', 'gameScreen', 'resultScreen'];
    screens.forEach(screen => {
        document.getElementById(screen).classList.add('hidden');
    });
    document.getElementById(screenName).classList.remove('hidden');
    currentScreen = screenName;
}

function showTitle() {
    showScreen('titleScreen');
}

function showDifficultySelect() {
    showScreen('difficultyScreen');
}

function showHowToPlay() {
    showScreen('howToPlayScreen');
}

// ゲーム開始
function startGame(difficulty) {
    currentDifficulty = difficulty;
    
    const pattern = GAME_PATTERNS[difficulty];
    gameState.currentPattern = pattern;
    
    resetGameState();
    
    // ランダムにシルエット画像を選択
    const silhouetteImages = ['silhouette_woman.png', 'silhouette_man.png'];
    const randomImage = silhouetteImages[Math.floor(Math.random() * silhouetteImages.length)];
    document.getElementById('personSilhouette').src = randomImage;
    
    showScreen('gameScreen');
    
    // 少し待ってからゲーム開始
    setTimeout(() => {
        gameState.isPlaying = true;
        gameState.startTime = Date.now();
        startGameLoop();
    }, 1000);
}

// ゲーム状態リセット
function resetGameState() {
    // 難易度に応じた初期心理バーを取得
    const pattern = gameState.currentPattern || GAME_PATTERNS[currentDifficulty];
    const initialPsychology = pattern.initialPsychology || 0;
    
    gameState = {
        score: 0,
        combo: 0,
        maxCombo: 0,
        perfect: 0,
        good: 0,
        miss: 0,
        startTime: 0,
        isPlaying: false,
        currentPattern: gameState.currentPattern,
        activeCircles: [],
        spawnedCircles: new Set(),
        psychologyPercentage: initialPsychology,
    };
    
    // UIリセット
    updateScore();
    updateCombo();
    updatePsychologyBar();
    document.getElementById('circleContainer').innerHTML = '';
}

// ゲームループ
function startGameLoop() {
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (!gameState.isPlaying) return;
    
    const currentTime = (Date.now() - gameState.startTime) / 1000;
    const pattern = gameState.currentPattern;
    
    // 円の生成
    pattern.circles.forEach((circleData, index) => {
        const circleId = `circle-${index}`;
        if (!gameState.spawnedCircles.has(circleId) && currentTime >= circleData.time) {
            spawnCircle(circleData, circleId);
            gameState.spawnedCircles.add(circleId);
        }
    });
    
    // アクティブ円の更新
    updateCircles(currentTime);
    
    // ゲーム終了判定
    if (currentTime > pattern.duration) {
        endGame();
        return;
    }
    
    requestAnimationFrame(gameLoop);
}

// 円の生成
function spawnCircle(circleData, circleId) {
    const container = document.getElementById('circleContainer');
    const gameArea = document.getElementById('gameArea');
    const areaRect = gameArea.getBoundingClientRect();
    
    // ラッパー要素
    const wrapper = document.createElement('div');
    wrapper.className = 'circle-wrapper';
    wrapper.id = circleId;
    wrapper.dataset.spawnTime = (Date.now() - gameState.startTime) / 1000;
    wrapper.dataset.targetTime = circleData.time + circleData.shrinkDuration;
    wrapper.dataset.shrinkDuration = circleData.shrinkDuration;
    wrapper.dataset.targetSize = circleData.targetSize;
    
    // 位置設定（パーセンテージをピクセルに変換）
    const x = (circleData.x / 100) * areaRect.width;
    const y = (circleData.y / 100) * areaRect.height;
    
    wrapper.style.left = `${x}px`;
    wrapper.style.top = `${y}px`;
    
    // ターゲット円（内側の小さい円）
    const targetCircle = document.createElement('div');
    targetCircle.className = 'target-circle';
    targetCircle.style.width = `${circleData.targetSize}px`;
    targetCircle.style.height = `${circleData.targetSize}px`;
    targetCircle.style.left = `${-circleData.targetSize / 2}px`;
    targetCircle.style.top = `${-circleData.targetSize / 2}px`;
    
    // 収縮する円（外側の大きい円）
    const shrinkingCircle = document.createElement('div');
    shrinkingCircle.className = `shrinking-circle type-${circleData.type}`;
    const initialSize = circleData.targetSize * 3; // 初期サイズは3倍
    shrinkingCircle.style.width = `${initialSize}px`;
    shrinkingCircle.style.height = `${initialSize}px`;
    shrinkingCircle.style.left = `${-initialSize / 2}px`;
    shrinkingCircle.style.top = `${-initialSize / 2}px`;
    
    wrapper.appendChild(targetCircle);
    wrapper.appendChild(shrinkingCircle);
    
    // クリックイベント
    wrapper.addEventListener('click', () => handleCircleClick(wrapper));
    
    container.appendChild(wrapper);
    
    gameState.activeCircles.push({
        element: wrapper,
        data: circleData,
        id: circleId,
        shrinkingCircle: shrinkingCircle,
    });
}

// 円の更新
function updateCircles(currentTime) {
    gameState.activeCircles = gameState.activeCircles.filter(circleObj => {
        const wrapper = circleObj.element;
        const shrinkingCircle = circleObj.shrinkingCircle;
        const data = circleObj.data;
        
        if (wrapper.dataset.clicked) {
            return true; // クリック済みの円は削除待ち
        }
        
        const spawnTime = parseFloat(wrapper.dataset.spawnTime);
        const shrinkDuration = parseFloat(wrapper.dataset.shrinkDuration);
        const targetSize = parseFloat(wrapper.dataset.targetSize);
        
        // 経過時間
        const elapsed = currentTime - spawnTime;
        
        // 収縮の進行度 (0 -> 1 -> さらに進む)
        // ターゲットサイズを超えても小さくなり続ける
        const progress = elapsed / shrinkDuration;
        
        // 現在のサイズ（3倍 -> 1倍 -> 0に向けて収縮）
        const initialSize = targetSize * 3;
        
        let currentSize;
        if (progress <= 1) {
            // 通常の収縮（3倍 -> 1倍）
            currentSize = initialSize - (initialSize - targetSize) * progress;
        } else {
            // ターゲットサイズを超えても収縮し続ける（1倍 -> 0）
            const overProgress = progress - 1;
            currentSize = targetSize * Math.max(0, 1 - overProgress);
        }
        
        shrinkingCircle.style.width = `${currentSize}px`;
        shrinkingCircle.style.height = `${currentSize}px`;
        shrinkingCircle.style.left = `${-currentSize / 2}px`;
        shrinkingCircle.style.top = `${-currentSize / 2}px`;
        
        // Miss判定（円がほぼ消えた or 十分に小さくなった）
        const minSize = targetSize * 0.1; // ターゲットサイズの10%まで
        if (currentSize < minSize || elapsed > shrinkDuration * 2.5) {
            if (!wrapper.dataset.judged) {
                judgeMiss();
                wrapper.dataset.judged = 'true';
            }
            wrapper.classList.add('miss');
            setTimeout(() => wrapper.remove(), 100);
            return false;
        }
        
        return true;
    });
}

// 円のクリック処理
function handleCircleClick(wrapper) {
    if (wrapper.dataset.clicked || wrapper.dataset.judged) return;
    
    const currentTime = (Date.now() - gameState.startTime) / 1000;
    const spawnTime = parseFloat(wrapper.dataset.spawnTime);
    const shrinkDuration = parseFloat(wrapper.dataset.shrinkDuration);
    const targetTime = spawnTime + shrinkDuration;
    
    // タイミング差
    const timeDiff = Math.abs(currentTime - targetTime);
    
    // 判定
    if (timeDiff <= JUDGMENT_TIMING.perfect) {
        judgePerfect();
        wrapper.classList.add('hit');
    } else if (timeDiff <= JUDGMENT_TIMING.good) {
        judgeGood();
        wrapper.classList.add('hit');
    } else {
        judgeMiss();
        wrapper.classList.add('miss');
    }
    
    wrapper.dataset.clicked = 'true';
    wrapper.dataset.judged = 'true';
    
    // アニメーション後に削除
    setTimeout(() => {
        wrapper.remove();
    }, 300);
}

// 判定処理
function judgePerfect() {
    gameState.perfect++;
    gameState.combo++;
    gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);
    const comboBonus = Math.max(0, (gameState.combo - 1) * SCORE_VALUES.comboBonus);
    gameState.score += SCORE_VALUES.perfect + comboBonus;
    updateScore();
    updateCombo();
    showJudgment('PERFECT!', 'perfect');
    
    // 心理バー増加（5-8%）
    updatePsychologyBar(7);
    
    // 被疑者シルエット共鳴アニメーション
    const silhouette = document.getElementById('personSilhouette');
    silhouette.classList.add('resonate');
    setTimeout(() => {
        silhouette.classList.remove('resonate');
    }, 500);
}

function judgeGood() {
    gameState.good++;
    gameState.combo++;
    gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);
    const comboBonus = Math.max(0, (gameState.combo - 1) * SCORE_VALUES.comboBonus);
    gameState.score += SCORE_VALUES.good + comboBonus;
    updateScore();
    updateCombo();
    showJudgment('GOOD', 'good');
    
    // 心理バー増加（2-3%）
    updatePsychologyBar(3);
}

function judgeMiss() {
    gameState.miss++;
    gameState.combo = 0;
    updateCombo();
    showJudgment('MISS', 'miss');
}

// UI更新
function updateScore() {
    document.getElementById('score').textContent = `スコア：${gameState.score.toString().padStart(6, '0')}`;
}

function updateCombo() {
    document.getElementById('combo').textContent = `コンボ：${gameState.combo}`;
}

// 心理バー更新
function updatePsychologyBar(increaseAmount = 0) {
    // バーを増加
    gameState.psychologyPercentage = Math.min(100, gameState.psychologyPercentage + increaseAmount);
    
    // DOM更新
    const bar = document.querySelector('.psychology-bar');
    const percentage = document.querySelector('.bar-percentage');
    
    bar.style.width = `${gameState.psychologyPercentage}%`;
    percentage.textContent = `${Math.round(gameState.psychologyPercentage)}%`;
    
    // パルスアニメーション
    if (increaseAmount > 0) {
        bar.classList.add('pulse');
        setTimeout(() => {
            bar.classList.remove('pulse');
        }, 300);
    }
    
    // 100%達成でゲームクリア
    if (gameState.psychologyPercentage >= 100 && gameState.isPlaying) {
        setTimeout(() => {
            endGame();
        }, 500);
    }
}

function showJudgment(text, type) {
    const judgmentDisplay = document.getElementById('judgmentDisplay');
    judgmentDisplay.textContent = text;
    judgmentDisplay.className = `judgment-display ${type}`;
    
    setTimeout(() => {
        judgmentDisplay.textContent = '';
        judgmentDisplay.className = 'judgment-display';
    }, 500);
}

// ゲーム終了
function endGame() {
    gameState.isPlaying = false;
    
    // 結果計算
    const totalCircles = gameState.perfect + gameState.good + gameState.miss;
    const accuracy = totalCircles > 0 ? (gameState.perfect + gameState.good * 0.5) / totalCircles : 0;
    
    // ランク決定
    let rank = 'D';
    for (const [r, threshold] of Object.entries(RANK_THRESHOLDS)) {
        if (accuracy >= threshold) {
            rank = r;
            break;
        }
    }
    
    // 結果表示
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('maxCombo').textContent = gameState.maxCombo;
    document.getElementById('perfectCount').textContent = gameState.perfect;
    document.getElementById('goodCount').textContent = gameState.good;
    document.getElementById('missCount').textContent = gameState.miss;
    document.getElementById('resultRank').textContent = rank;
    document.getElementById('resultComment').textContent = RANK_COMMENTS[rank];
    
    // 評価に応じた色変更
    const resultRank = document.getElementById('resultRank');
    const rankColors = {
        'S': 'linear-gradient(135deg, #FFD700, #FFA500)',
        'A': 'linear-gradient(135deg, #C0C0C0, #A9A9A9)',
        'B': 'linear-gradient(135deg, #CD7F32, #8B4513)',
        'C': 'linear-gradient(135deg, #87CEEB, #4682B4)',
        'D': 'linear-gradient(135deg, #D3D3D3, #808080)',
    };
    resultRank.style.background = rankColors[rank];
    resultRank.style.webkitBackgroundClip = 'text';
    resultRank.style.webkitTextFillColor = 'transparent';
    resultRank.style.backgroundClip = 'text';
    
    showScreen('resultScreen');
}

// リトライ
function retry() {
    startGame(currentDifficulty);
}
