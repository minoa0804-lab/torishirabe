// ゲームデータ - 円の出現パターン
const GAME_PATTERNS = {
    easy: {
        duration: 60, // ゲーム時間（秒）
        maxSimultaneous: 1, // 最大同時表示数
        initialPsychology: 50, // 初期心理バー（%）
        targetPsychology: 100, // クリア目標
        circles: [
            { time: 2, x: 30, y: 40, targetSize: 60, shrinkDuration: 2.5, type: 1 },
            { time: 5.5, x: 70, y: 30, targetSize: 50, shrinkDuration: 2.3, type: 2 },
            { time: 9, x: 50, y: 60, targetSize: 70, shrinkDuration: 2.0, type: 3 },
            { time: 12, x: 40, y: 25, targetSize: 55, shrinkDuration: 2.4, type: 1 },
            { time: 15.5, x: 65, y: 55, targetSize: 65, shrinkDuration: 2.2, type: 4 },
            { time: 19, x: 35, y: 45, targetSize: 60, shrinkDuration: 2.6, type: 2 },
            { time: 22.5, x: 60, y: 35, targetSize: 50, shrinkDuration: 2.1, type: 5 },
            { time: 26, x: 45, y: 50, targetSize: 70, shrinkDuration: 2.5, type: 3 },
            { time: 29, x: 55, y: 40, targetSize: 55, shrinkDuration: 2.3, type: 1 },
            { time: 32.5, x: 40, y: 55, targetSize: 65, shrinkDuration: 2.0, type: 4 },
            { time: 36, x: 70, y: 45, targetSize: 60, shrinkDuration: 2.4, type: 2 },
            { time: 39, x: 50, y: 30, targetSize: 50, shrinkDuration: 2.2, type: 5 },
            { time: 42.5, x: 35, y: 60, targetSize: 70, shrinkDuration: 2.6, type: 3 },
            { time: 46, x: 65, y: 25, targetSize: 55, shrinkDuration: 2.1, type: 1 },
            { time: 49, x: 45, y: 45, targetSize: 65, shrinkDuration: 2.5, type: 4 },
            { time: 52.5, x: 60, y: 55, targetSize: 60, shrinkDuration: 2.3, type: 2 },
            { time: 56, x: 40, y: 35, targetSize: 50, shrinkDuration: 2.0, type: 5 },
        ]
    },
    normal: {
        duration: 60,
        maxSimultaneous: 3, // 最大3つ同時表示
        initialPsychology: 30, // 初期心理バー（%）
        targetPsychology: 100,
        circles: [
            // 序盤：1つ
            { time: 2, x: 30, y: 40, targetSize: 60, shrinkDuration: 1.8, type: 1 },
            { time: 5, x: 70, y: 30, targetSize: 50, shrinkDuration: 2.0, type: 2 },
            
            // 2つ同時出現開始（タイミングをずらす）
            { time: 8, x: 35, y: 50, targetSize: 65, shrinkDuration: 1.5, type: 3 },
            { time: 9, x: 65, y: 35, targetSize: 55, shrinkDuration: 1.9, type: 1 },
            
            { time: 11.5, x: 45, y: 30, targetSize: 70, shrinkDuration: 1.6, type: 4 },
            { time: 12.8, x: 55, y: 55, targetSize: 50, shrinkDuration: 1.4, type: 2 },
            
            { time: 15, x: 40, y: 45, targetSize: 60, shrinkDuration: 1.7, type: 5 },
            { time: 16.2, x: 70, y: 40, targetSize: 65, shrinkDuration: 1.3, type: 3 },
            
            // 3つ同時出現開始（タイミングを大きくずらす）
            { time: 19, x: 30, y: 30, targetSize: 55, shrinkDuration: 1.8, type: 1 },
            { time: 20, x: 50, y: 50, targetSize: 70, shrinkDuration: 1.2, type: 4 },
            { time: 21.2, x: 70, y: 35, targetSize: 50, shrinkDuration: 1.6, type: 2 },
            
            { time: 23.5, x: 35, y: 55, targetSize: 65, shrinkDuration: 1.4, type: 5 },
            { time: 24.5, x: 65, y: 30, targetSize: 55, shrinkDuration: 1.9, type: 3 },
            { time: 25.8, x: 45, y: 40, targetSize: 60, shrinkDuration: 1.3, type: 1 },
            
            { time: 28, x: 55, y: 45, targetSize: 70, shrinkDuration: 1.7, type: 4 },
            { time: 29.2, x: 40, y: 35, targetSize: 50, shrinkDuration: 1.5, type: 2 },
            { time: 30.5, x: 70, y: 55, targetSize: 65, shrinkDuration: 1.8, type: 5 },
            
            { time: 32.5, x: 50, y: 30, targetSize: 55, shrinkDuration: 1.6, type: 3 },
            { time: 33.8, x: 35, y: 50, targetSize: 60, shrinkDuration: 1.4, type: 1 },
            { time: 35, x: 65, y: 40, targetSize: 70, shrinkDuration: 1.9, type: 4 },
            
            { time: 37, x: 45, y: 55, targetSize: 50, shrinkDuration: 1.3, type: 2 },
            { time: 38.3, x: 60, y: 30, targetSize: 65, shrinkDuration: 1.7, type: 5 },
            { time: 39.5, x: 40, y: 40, targetSize: 55, shrinkDuration: 1.5, type: 3 },
            
            { time: 41.5, x: 70, y: 45, targetSize: 70, shrinkDuration: 1.8, type: 1 },
            { time: 42.8, x: 30, y: 35, targetSize: 60, shrinkDuration: 1.2, type: 4 },
            { time: 44, x: 55, y: 50, targetSize: 50, shrinkDuration: 1.6, type: 2 },
            
            { time: 46, x: 50, y: 40, targetSize: 65, shrinkDuration: 1.4, type: 5 },
            { time: 47.5, x: 35, y: 45, targetSize: 55, shrinkDuration: 1.9, type: 3 },
            { time: 48.8, x: 65, y: 50, targetSize: 70, shrinkDuration: 1.3, type: 1 },
            
            { time: 51, x: 45, y: 30, targetSize: 60, shrinkDuration: 1.7, type: 4 },
            { time: 52.3, x: 60, y: 55, targetSize: 50, shrinkDuration: 1.5, type: 2 },
            { time: 53.5, x: 40, y: 50, targetSize: 65, shrinkDuration: 1.8, type: 5 },
            
            { time: 55.5, x: 70, y: 35, targetSize: 55, shrinkDuration: 1.6, type: 3 },
            { time: 56.8, x: 50, y: 45, targetSize: 70, shrinkDuration: 1.4, type: 1 },
        ]
    },
    hard: {
        duration: 60,
        maxSimultaneous: 5, // 最大5つ同時表示
        initialPsychology: 10, // 初期心理バー（%）
        targetPsychology: 100,
        circles: [
            // 序盤：1-2個
            { time: 1.5, x: 30, y: 40, targetSize: 60, shrinkDuration: 1.2, type: 1 },
            { time: 3, x: 70, y: 30, targetSize: 50, shrinkDuration: 1.4, type: 2 },
            
            // 2-3個同時
            { time: 5, x: 45, y: 50, targetSize: 65, shrinkDuration: 0.9, type: 3 },
            { time: 5.4, x: 65, y: 35, targetSize: 55, shrinkDuration: 1.1, type: 1 },
            { time: 5.8, x: 35, y: 30, targetSize: 70, shrinkDuration: 1.3, type: 4 },
            
            { time: 8, x: 55, y: 45, targetSize: 50, shrinkDuration: 1.0, type: 2 },
            { time: 8.5, x: 40, y: 55, targetSize: 60, shrinkDuration: 0.85, type: 5 },
            { time: 9, x: 70, y: 40, targetSize: 65, shrinkDuration: 1.2, type: 3 },
            
            // 4個同時
            { time: 11, x: 30, y: 35, targetSize: 55, shrinkDuration: 0.95, type: 1 },
            { time: 11.4, x: 50, y: 50, targetSize: 70, shrinkDuration: 1.1, type: 4 },
            { time: 11.7, x: 65, y: 30, targetSize: 50, shrinkDuration: 0.8, type: 2 },
            { time: 12.1, x: 45, y: 40, targetSize: 60, shrinkDuration: 1.3, type: 5 },
            
            // 5個同時出現開始
            { time: 14, x: 35, y: 55, targetSize: 65, shrinkDuration: 1.0, type: 3 },
            { time: 14.3, x: 60, y: 35, targetSize: 55, shrinkDuration: 0.9, type: 1 },
            { time: 14.6, x: 40, y: 30, targetSize: 70, shrinkDuration: 1.2, type: 4 },
            { time: 14.9, x: 70, y: 50, targetSize: 50, shrinkDuration: 0.85, type: 2 },
            { time: 15.2, x: 50, y: 45, targetSize: 60, shrinkDuration: 1.1, type: 5 },
            
            { time: 17, x: 55, y: 30, targetSize: 65, shrinkDuration: 0.95, type: 3 },
            { time: 17.4, x: 30, y: 45, targetSize: 55, shrinkDuration: 1.3, type: 1 },
            { time: 17.7, x: 65, y: 55, targetSize: 70, shrinkDuration: 0.8, type: 4 },
            { time: 18, x: 45, y: 35, targetSize: 50, shrinkDuration: 1.0, type: 2 },
            { time: 18.3, x: 40, y: 50, targetSize: 60, shrinkDuration: 1.2, type: 5 },
            
            { time: 20, x: 70, y: 40, targetSize: 65, shrinkDuration: 0.9, type: 3 },
            { time: 20.4, x: 50, y: 55, targetSize: 55, shrinkDuration: 1.1, type: 1 },
            { time: 20.7, x: 35, y: 30, targetSize: 70, shrinkDuration: 0.85, type: 4 },
            { time: 21, x: 60, y: 45, targetSize: 50, shrinkDuration: 1.3, type: 2 },
            { time: 21.3, x: 45, y: 40, targetSize: 60, shrinkDuration: 0.95, type: 5 },
            
            { time: 23, x: 30, y: 50, targetSize: 65, shrinkDuration: 1.0, type: 3 },
            { time: 23.4, x: 65, y: 35, targetSize: 55, shrinkDuration: 1.2, type: 1 },
            { time: 23.7, x: 50, y: 30, targetSize: 70, shrinkDuration: 0.8, type: 4 },
            { time: 24, x: 40, y: 55, targetSize: 50, shrinkDuration: 1.1, type: 2 },
            { time: 24.3, x: 70, y: 45, targetSize: 60, shrinkDuration: 0.9, type: 5 },
            
            { time: 26, x: 55, y: 40, targetSize: 65, shrinkDuration: 1.3, type: 3 },
            { time: 26.4, x: 35, y: 35, targetSize: 55, shrinkDuration: 0.85, type: 1 },
            { time: 26.7, x: 60, y: 50, targetSize: 70, shrinkDuration: 1.0, type: 4 },
            { time: 27, x: 45, y: 30, targetSize: 50, shrinkDuration: 1.2, type: 2 },
            { time: 27.3, x: 50, y: 55, targetSize: 60, shrinkDuration: 0.95, type: 5 },
            
            { time: 29, x: 70, y: 35, targetSize: 65, shrinkDuration: 0.9, type: 3 },
            { time: 29.4, x: 40, y: 45, targetSize: 55, shrinkDuration: 1.1, type: 1 },
            { time: 29.7, x: 65, y: 50, targetSize: 70, shrinkDuration: 0.8, type: 4 },
            { time: 30, x: 30, y: 30, targetSize: 50, shrinkDuration: 1.3, type: 2 },
            { time: 30.3, x: 55, y: 40, targetSize: 60, shrinkDuration: 1.0, type: 5 },
            
            // 後半も5個同時を維持
            { time: 32, x: 45, y: 55, targetSize: 65, shrinkDuration: 1.2, type: 3 },
            { time: 32.4, x: 50, y: 30, targetSize: 55, shrinkDuration: 0.85, type: 1 },
            { time: 32.7, x: 35, y: 40, targetSize: 70, shrinkDuration: 0.95, type: 4 },
            { time: 33, x: 70, y: 50, targetSize: 50, shrinkDuration: 1.1, type: 2 },
            { time: 33.3, x: 60, y: 35, targetSize: 60, shrinkDuration: 0.9, type: 5 },
            
            { time: 35, x: 40, y: 50, targetSize: 65, shrinkDuration: 1.0, type: 3 },
            { time: 35.4, x: 65, y: 30, targetSize: 55, shrinkDuration: 1.3, type: 1 },
            { time: 35.7, x: 50, y: 45, targetSize: 70, shrinkDuration: 0.8, type: 4 },
            { time: 36, x: 30, y: 35, targetSize: 50, shrinkDuration: 1.2, type: 2 },
            { time: 36.3, x: 55, y: 55, targetSize: 60, shrinkDuration: 0.95, type: 5 },
            
            { time: 38, x: 70, y: 45, targetSize: 65, shrinkDuration: 0.9, type: 3 },
            { time: 38.4, x: 45, y: 30, targetSize: 55, shrinkDuration: 1.1, type: 1 },
            { time: 38.7, x: 60, y: 50, targetSize: 70, shrinkDuration: 0.85, type: 4 },
            { time: 39, x: 35, y: 40, targetSize: 50, shrinkDuration: 1.3, type: 2 },
            { time: 39.3, x: 50, y: 35, targetSize: 60, shrinkDuration: 1.0, type: 5 },
            
            { time: 41, x: 65, y: 55, targetSize: 65, shrinkDuration: 1.2, type: 3 },
            { time: 41.4, x: 40, y: 30, targetSize: 55, shrinkDuration: 0.8, type: 1 },
            { time: 41.7, x: 55, y: 45, targetSize: 70, shrinkDuration: 0.95, type: 4 },
            { time: 42, x: 30, y: 50, targetSize: 50, shrinkDuration: 1.1, type: 2 },
            { time: 42.3, x: 70, y: 35, targetSize: 60, shrinkDuration: 0.9, type: 5 },
            
            { time: 44, x: 45, y: 40, targetSize: 65, shrinkDuration: 1.0, type: 3 },
            { time: 44.4, x: 60, y: 55, targetSize: 55, shrinkDuration: 1.3, type: 1 },
            { time: 44.7, x: 35, y: 30, targetSize: 70, shrinkDuration: 0.85, type: 4 },
            { time: 45, x: 50, y: 50, targetSize: 50, shrinkDuration: 1.2, type: 2 },
            { time: 45.3, x: 65, y: 40, targetSize: 60, shrinkDuration: 0.95, type: 5 },
            
            { time: 47, x: 40, y: 35, targetSize: 65, shrinkDuration: 0.9, type: 3 },
            { time: 47.4, x: 70, y: 50, targetSize: 55, shrinkDuration: 1.1, type: 1 },
            { time: 47.7, x: 50, y: 30, targetSize: 70, shrinkDuration: 0.8, type: 4 },
            { time: 48, x: 30, y: 45, targetSize: 50, shrinkDuration: 1.3, type: 2 },
            { time: 48.3, x: 55, y: 55, targetSize: 60, shrinkDuration: 1.0, type: 5 },
            
            { time: 50, x: 65, y: 35, targetSize: 65, shrinkDuration: 1.2, type: 3 },
            { time: 50.4, x: 45, y: 50, targetSize: 55, shrinkDuration: 0.85, type: 1 },
            { time: 50.7, x: 60, y: 40, targetSize: 70, shrinkDuration: 0.95, type: 4 },
            { time: 51, x: 35, y: 30, targetSize: 50, shrinkDuration: 1.1, type: 2 },
            { time: 51.3, x: 50, y: 55, targetSize: 60, shrinkDuration: 0.9, type: 5 },
            
            { time: 53, x: 70, y: 45, targetSize: 65, shrinkDuration: 1.0, type: 3 },
            { time: 53.4, x: 40, y: 35, targetSize: 55, shrinkDuration: 1.3, type: 1 },
            { time: 53.7, x: 55, y: 50, targetSize: 70, shrinkDuration: 0.8, type: 4 },
            { time: 54, x: 30, y: 40, targetSize: 50, shrinkDuration: 1.2, type: 2 },
            { time: 54.3, x: 65, y: 30, targetSize: 60, shrinkDuration: 0.95, type: 5 },
            
            { time: 56, x: 50, y: 45, targetSize: 65, shrinkDuration: 0.9, type: 3 },
            { time: 56.4, x: 45, y: 55, targetSize: 55, shrinkDuration: 1.1, type: 1 },
            { time: 56.7, x: 60, y: 35, targetSize: 70, shrinkDuration: 0.85, type: 4 },
            { time: 57, x: 35, y: 50, targetSize: 50, shrinkDuration: 1.3, type: 2 },
            { time: 57.3, x: 70, y: 40, targetSize: 60, shrinkDuration: 1.0, type: 5 },
        ]
    }
};

// 判定基準
const JUDGMENT_TIMING = {
    perfect: 0.1,  // ±100ms以内
    good: 0.2,     // ±200ms以内
};

// スコア設定
const SCORE_VALUES = {
    perfect: 1000,
    good: 500,
    miss: 0,
    comboBonus: 100,
};

// ランク評価基準
const RANK_THRESHOLDS = {
    S: 0.95,  // 95%以上
    A: 0.85,  // 85%以上
    B: 0.70,  // 70%以上
    C: 0.50,  // 50%以上
    D: 0,     // 50%未満
};

// 評価コメント
const RANK_COMMENTS = {
    S: "完璧なコミュニケーション！被疑者の心を完全に開くことができました。",
    A: "素晴らしい対話力です。相手の心にしっかり言葉が届いています。",
    B: "良い傾聴姿勢が見られます。もう少し相手のタイミングを意識すればさらに良くなります。",
    C: "まずまずのコミュニケーションです。相手の心の動きをもっと観察してみましょう。",
    D: "もう少し相手に伝える努力が必要です。焦らず、相手のペースに合わせましょう。",
};
