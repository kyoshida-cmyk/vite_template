# confetti（紙吹雪）

`<canvas>` に紙吹雪を降らせ続けます。
色・量・大きさは confetti.js 内のコメント部分で調整できます。

## 読み込み（main.js）

```js
import "./features/confetti/confetti.js";
```

## HTML

```html
<canvas></canvas>
```

## 注意

- ページ内で**最初の `<canvas>`** が使われます。ないとエラーになります。
- **CSS は含まれていません。** 背景として全画面に敷く場合は style.css に書いてください。例:

```css
canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
```
