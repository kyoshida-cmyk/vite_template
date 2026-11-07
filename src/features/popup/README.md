# popup（画像ポップアップ）

`.popup-trigger` をクリックすると、`data-image` に指定した画像をポップアップで表示します。
表示中はページのスクロールを止めます（`body.is-locked`）。

## 読み込み（main.js）

```js
import "./features/popup/popup.css";
import "./features/popup/popup.js";
```

## HTML

ポップアップ本体（ページに 1 つ。`</main>` の後ろなどに置く）

```html
<div id="popup-overlay" class="overlay">
  <div class="popup-content">
    <img id="popup-image" src="" alt="" />
    <img src="閉じるボタンの画像" alt="close" class="popup-close" />
  </div>
</div>
```

クリックで開く要素

```html
<div class="popup-trigger" data-image="ポップアップで出す画像">
  <img src="サムネイル画像" alt="" loading="lazy" />
</div>
```

## 注意

- `#popup-overlay`・`#popup-image`・`.popup-close` がページにないとエラーになります。
- popup.css 後半の「任意」部分（`.shop-list`）は店舗一覧用のレイアウトです。不要なら使わなくて OK です。
