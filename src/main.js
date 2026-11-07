// =========================================================
// main.js  読み込む CSS / JS をここで管理する
// 使う機能はコメントを外す、使わない機能はコメントアウト。
// 各機能の使い方は features/〇〇/README.md を参照。
// =========================================================

// ===== 土台（毎回使う） =====
import "./base/reset.css";

// ===== 機能（使うものだけコメントを外す） =====

// スクロールアニメーション
import "./features/move/move.css";
import "./features/move/move.js";

// ページ内スムーススクロール（jQuery 必須）
import "./features/smooth-scroll/smooth.js";

// 画像ポップアップ
// import "./features/popup/popup.css";
// import "./features/popup/popup.js";

// トップに戻るボタン
// import "./features/page-top/page_top.js";

// 画面下の固定ナビ
// import "./features/bottom-nav/bottom_nav.css";

// サイドナビ
// import "./features/side-nav/side_nav.css";

// 紙吹雪（HTML に <canvas> が必要）
// import "./features/confetti/confetti.js";

// ===== ページ固有（機能の上書きができるよう最後に読む） =====
import "./style.css";
