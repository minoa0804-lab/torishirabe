# 被疑者シルエット画像について

## 作成した画像ファイル

### 1. suspect-silhouette.svg (400×600px)
- シンプルな上半身シルエット
- 正面を向いた被疑者のイメージ

### 2. suspect-detailed.svg (512×768px) ⭐ 使用中
- より詳細な被疑者シルエット
- 椅子に座って正面を向いている
- 顔の輪郭、目、鼻、口の位置を暗示
- 服のシワなど細部まで表現
- グラデーションで立体感を演出

## キャンバスサイズの推奨

### スマホゲーム向け推奨サイズ：

1. **512×768px** (2:3比率) ⭐ 採用
   - 縦長で上半身を表現しやすい
   - 2のべき乗で効率的
   - レスポンシブ対応しやすい

2. **400×600px** (2:3比率)
   - やや小さめ
   - ファイルサイズが軽い

3. **600×900px** (2:3比率)
   - 高解像度向け
   - Retina対応

## SVGのメリット

✅ **拡大縮小しても綺麗**（ベクター形式）
✅ **ファイルサイズが小さい**（数KB）
✅ **CSSで色変更可能**
✅ **アニメーション対応**
✅ **レスポンシブに最適**

## PNG変換が必要な場合

SVGをPNGに変換する場合：

### オンラインツール
- https://cloudconvert.com/svg-to-png
- https://convertio.co/ja/svg-png/

### コマンドライン (ImageMagick)
```bash
magick suspect-detailed.svg -resize 512x768 suspect.png
```

### Inkscape
```bash
inkscape suspect-detailed.svg --export-type=png --export-width=512
```

## 使い方

### HTML
```html
<!-- SVGとして読み込み -->
<img src="suspect-detailed.svg" alt="被疑者" class="person-silhouette">

<!-- または直接埋め込み -->
<object data="suspect-detailed.svg" type="image/svg+xml"></object>
```

### CSS
```css
.person-silhouette {
    width: auto;
    height: 70%;
    max-height: 500px;
    opacity: 0.7;
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));
}
```

## カスタマイズ方法

SVGファイルをテキストエディタで開いて編集：

- `opacity="0.65"` → 透明度変更
- `fill="#1a1a1a"` → 色変更
- グラデーション変更で立体感調整

## ゲーム内での配置

現在、ゲーム画面中央に配置され、円が人物の周囲にランダムに出現します。
人物シルエットは `z-index: 1` で背景レイヤー、円は `z-index: 2` で前景レイヤーに配置されています。
