// トップに戻るボタン　表示タイミング調整
document.addEventListener("DOMContentLoaded", () => {
  const pageTop = document.getElementById("page-top");
  const SHOW_AFTER = 300; // 何pxスクロールしたら表示するか。

  const toggleShow = () => {
    if (window.scrollY > SHOW_AFTER) {
      pageTop.classList.add("is-show");
    } else {
      pageTop.classList.remove("is-show");
    }
  };

  window.addEventListener("scroll", toggleShow, { passive: true });
  toggleShow(); // 初期表示時にも一度チェック
});
