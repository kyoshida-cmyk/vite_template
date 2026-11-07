# vite-template

LP・キャンペーンページ制作用の Vite テンプレートです。
スクロールアニメーション（move.js）とページ内スムーススクロール（smooth.js）を最初から組み込んであります。

> ⚠️ このテンプレート自体では案件の作業をしないでください。必ずコピーしてから使います。

---

## 必要なもの

- Node.js（v20 以上推奨）
- npm

---

## 新しい案件の始め方

```bash
# 1. テンプレートをコピー（GitHub で管理している場合）
npx tiged ユーザー名/vite-template 案件名

# 2. フォルダに移動して必要なパッケージを入れる
cd 案件名
npm install

# 3. 開発サーバーを起動
npm run dev
```

ローカルでコピーする場合は、`node_modules` を除いてフォルダごと複製し、`npm install` してください。

### コピーしたら最初にやること

- [ ] `package.json` の `name` を案件名に変える
- [ ] `vite.config.js` の `outDir`（出力先）を納品先のパスに合わせる
- [ ] `index.html` の `<title>`・`description`・`keywords` を入れる
- [ ] 必要に応じて Google Tag Manager のコードを入れる

---

## コマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバーを起動（保存すると自動で反映） |
| `npm run build` | 納品用データを `dist/` に書き出す |
| `npm run preview` | 書き出したデータをブラウザで確認 |

---

## フォルダ構成

```
├── index.html              ページ本体
├── vite.config.js          ビルド設定
├── package.json
├── public/                 そのままコピーしたいファイル（favicon など）
└── src/
    ├── main.js             使う CSS / JS をここで選ぶ
    ├── style.css           共通スタイル＋ページ固有のスタイル
    ├── base/
    │   └── reset.css       リセット CSS（毎回使う）
    ├── features/           必要な時だけ読み込む機能（各フォルダに README.md あり）
    │   ├── move/           スクロールアニメーション
    │   ├── smooth-scroll/  ページ内スムーススクロール（jQuery 必須）
    │   ├── popup/          画像ポップアップ
    │   ├── page-top/       トップに戻るボタン
    │   ├── bottom-nav/     画面下の固定ナビ
    │   ├── side-nav/       サイドナビ
    │   └── confetti/       紙吹雪（canvas）
    └── assets/             画像を置く場所
```

---

## 機能の使い方

CSS・JS はすべて `src/main.js` で読み込みます（`index.html` に `<link>` は書きません）。
使いたい機能のコメントを外すだけで有効になります。

```js
// 画像ポップアップ
import "./features/popup/popup.css";
import "./features/popup/popup.js";
```

- 必要な HTML や注意点は、各機能フォルダの `README.md` に書いてあります。
- 読み込み順は「reset → 機能 → style.css」。`style.css` を最後に読むので、機能の見た目はページ側で上書きできます。
- 開発中（`npm run dev`）は CSS を JS で読み込むため、一瞬スタイルが当たっていない状態が見えることがあります。ビルド後は通常の CSS ファイルになるので問題ありません。

### 新しい機能を足すとき

1. `src/features/機能名/` フォルダを作り、CSS・JS を入れる
2. 使い方（必要な HTML・注意点）を `README.md` に書く
3. `main.js` にコメントアウトした状態で import を追記する

---

## ビルド設定（vite.config.js）

納品しやすいように、以下の調整をしてあります。

- **相対パスで出力**（`base: "./"`）…どの階層に置いても動く
- **出力先の振り分け**
  - JS → `assets/js/bundle.js`
  - CSS → `assets/style/`
  - 画像 → `assets/images/`
  - その他（フォントなど）→ `assets/`
- **`type="module"` と `crossorigin` を削除（初期状態はオフ）** … 普通の `defer` 付きスクリプトとして出力したい場合は、`vite.config.js` の `disableModuleAndCrossOrigin` のコメントアウトを外す
- **`lang="en"` → `lang="ja"` に自動変換**

### 出力先を変える

```js
// vite.config.js
outDir: "dist/lp/案件名/",
```

### ページを増やす

```js
input: {
  main: resolve(import.meta.dirname, "index.html"),
  about: resolve(import.meta.dirname, "about/index.html"), // 追加
},
```

---

## スクロールアニメーション（features/move）

要素に `data-move` を付けるだけで、画面に入ったときにアニメーションします。

```html
<img src="..." data-move="fadeUp">
```

### 使える動き

| 種類 | 名前 |
|---|---|
| フェード | `fadeIn` `fadeUp` `fadeDown` `fadeLeft` `fadeRight` |
| ズーム | `zoomIn` `zoomInSoft` `zoomOut` |
| 回転 | `rotateX` `rotateY` `rotateLeftZ` `rotateRightZ` |
| めくり | `flipDown` `flipLeft` `flipRight` `flipLeftTop` `flipRightTop` |
| 背景が流れる | `bgLR` `bgRL` `bgUD` `bgDU` |
| その他 | `blur` `smooth` `line` |

### オプション

| 属性 | 例 | 内容 |
|---|---|---|
| `data-delay` | `0.3` / `300ms` | 開始を遅らせる |
| `data-duration` | `1.2` | 再生時間（秒） |
| `data-distance` | `40px` | fade 系の移動量 |
| `data-offset` | `300` | 何 px 手前で発火させるか |
| `data-move-trigger` | `load` | スクロールを待たず読み込み時に再生 |
| `data-move-repeat` | `true` / `false` | 上に戻って再度スクロールしたとき再生し直すか |
| `data-move-stagger` | `0.15` | 親に付けると、中の要素を順番にずらして再生 |
| `data-move-class` | `xxx` | `.is-moved` の代わりに付けるクラス（独自アニメ用） |

```html
<!-- 例：リストの中身を 0.15 秒ずつずらして表示 -->
<ul data-move-stagger="0.15">
  <li data-move="fadeUp">...</li>
  <li data-move="fadeUp">...</li>
  <li data-move="fadeUp">...</li>
</ul>
```

- `data-move-repeat` は `<body>` に付いている値（初期値 `false` ＝一度きり）が全体に効きます。section や要素ごとに上書きできます。
- 全体のデフォルト（再生時間・イージングなど）は `move.css` の `:root` で変えられます。

### 動きを増やすとき

1. `move.css` に `@keyframes` を書く
2. `[data-move="名前"] { --move-name: キーフレーム名; }` を追加する

JS 側の変更は不要です。

---

## スムーススクロール（features/smooth-scroll）

`href="#..."` のリンクをクリックすると、対象の位置までなめらかにスクロールします。
`href="#"` はページの一番上に戻ります。

```html
<a href="#event">イベント情報へ</a>
...
<section id="event">...</section>
```

※ jQuery を使っているため、`index.html` で jQuery を読み込んでいます。

---

## 画像の置き場所

| 場所 | 使いどころ |
|---|---|
| `src/assets/` | HTML・CSS から読み込む画像。ビルド時に `assets/images/` にまとめて出力されます |
| `public/` | ファイル名を変えずにそのまま出したいもの（favicon、OGP 画像など） |

---

## 更新履歴

- 2026-11-07 作成
- 2026-11-07 機能ごとに `src/features/` へ整理。CSS・JS の読み込みを `main.js` に集約
