# move（スクロールアニメーション）

要素に `data-move` を付けると、画面に入ったときにアニメーションします。

## 読み込み（main.js）

```js
import "./features/move/move.css";
import "./features/move/move.js";
```

## HTML

```html
<img src="..." data-move="fadeUp">
<img src="..." data-move="zoomIn" data-delay="0.3">

<!-- 子の要素を 0.15 秒ずつずらして再生 -->
<ul data-move-stagger="0.15">
  <li data-move="fadeUp">...</li>
  <li data-move="fadeUp">...</li>
</ul>
```

使える動きとオプションの一覧は、ルートの README.md と move.css 冒頭のコメントを参照してください。
