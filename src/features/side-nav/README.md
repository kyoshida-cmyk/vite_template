# side-nav（サイドナビ）

ナビボタンを縦に並べるレイアウトです。CSS のみ。

## 読み込み（main.js）

```js
import "./features/side-nav/side_nav.css";
```

## HTML

```html
<div class="side-nav">
  <ul class="side-nav-list">
    <li><a href="#section1"><img src="..." alt="" /></a></li>
    <li><a href="#section2"><img src="..." alt="" /></a></li>
  </ul>
</div>
```

## 注意

- 画面のどこに置くか（固定位置など）は style.css 側で指定してください。
