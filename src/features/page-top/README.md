# page-top（トップに戻るボタン）

300px 以上スクロールすると、`#page-top` に `.is-show` クラスを付けます。
表示までの距離は page_top.js の `SHOW_AFTER` で変えられます。

## 読み込み（main.js）

```js
import "./features/page-top/page_top.js";
```

## HTML

```html
<a href="#" id="page-top"><img src="..." alt="ページトップへ" /></a>
```

smooth-scroll と一緒に使うと、`href="#"` でなめらかに一番上へ戻ります。

## 注意

- **CSS は含まれていません。** 見た目と表示切り替えは style.css に書いてください。例:

```css
#page-top {
  position: fixed;
  right: 16px;
  bottom: 16px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
#page-top.is-show {
  opacity: 1;
  pointer-events: auto;
}
```
