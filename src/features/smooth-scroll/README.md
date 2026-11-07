# smooth-scroll（ページ内スムーススクロール）

`href="#..."` のリンクをクリックすると、対象の位置までなめらかにスクロールします。
`href="#"` はページの一番上に戻ります。

## 必要なもの

- **jQuery**（index.html の `<head>` で読み込み済み）

## 読み込み（main.js）

```js
import "./features/smooth-scroll/smooth.js";
```

## HTML

```html
<a href="#event">イベント情報へ</a>
...
<section id="event">...</section>
```
