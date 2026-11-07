# bottom-nav（画面下の固定ナビ）

画面下に固定されるナビゲーションです。CSS のみ。
色・ボタンの数・高さは bottom_nav.css 冒頭の `:root` の変数で変えられます。

## 読み込み（main.js）

```js
import "./features/bottom-nav/bottom_nav.css";
```

## HTML

```html
<div class="global-nav">
  <nav>
    <ul class="global-nav__list">
      <li class="global-nav__list__item"><a href="#"><img src="..." alt="" /></a></li>
      <li class="global-nav__list__item"><a href="#"><img src="..." alt="" /></a></li>
      <li class="global-nav__list__item"><a href="#"><img src="..." alt="" /></a></li>
    </ul>
  </nav>
</div>

<!-- ナビでフッターが隠れないよう、フッターに .l-footer を付けると下に余白が入る -->
<footer class="l-footer">...</footer>
```

## 注意

- ボタンの数を変えたら `--bottom-nav-NoB` も合わせて変えてください。
