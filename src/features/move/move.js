/* =========================================================
   move.js  スクロール連動アニメーション

   [data-move] が付いた要素が画面に入ったら .is-moved を付与する。
   動きの中身は move.css、タイミングは HTML の data-* で管理。

   data-move="fadeUp"        動きの種類（move.css 参照）
   data-delay="0.3"          ディレイ（秒。"300ms" も可）
   data-duration="1.2"       再生時間（秒）
   data-distance="40px"      fade系の移動量
   data-offset="300"         何px手前で発火させるか
   data-move-trigger="load"  スクロールを待たず読み込み時に再生
   data-move-repeat="false"  下に戻ったときに再生し直すか（true / false）
                             省略時は CONFIG.repeat に従う。
                             親（section など）に付けると中の要素すべてに効き、
                             子に付けた値がいちばん優先される。
   data-move-class="xxx"     .is-moved の代わりに付けるクラス
                             （style.css 側で定義した独自アニメ用）
                             例: data-move="custom" data-move-class="zoomIndelay_bound"
   data-move-stagger="0.15"  親に付けると子の [data-move] を順番にずらす
   ========================================================= */

/* ---------------------------------------------------------
   全体設定
--------------------------------------------------------- */
const CONFIG = {
  activeClass: "is-moved",
  // 再生し直すかのデフォルト値（data-move-repeat があればそちらが優先）
  // true: 画面の下へ戻ったらリセットして再度再生 / false: 一度きり
  repeat: true,
};

/* ---------------------------------------------------------
   ここから下は基本さわらなくてOK
--------------------------------------------------------- */

/** "0.3" → "0.3s" / "300ms" はそのまま */
const toTime = (v) => (/^-?[\d.]+$/.test(String(v).trim()) ? `${v}s` : String(v));
/** "40" → "40px" / "2rem" はそのまま */
const toLength = (v) => (/^-?[\d.]+$/.test(String(v).trim()) ? `${v}px` : String(v));

/** data-move-stagger: 親の中の [data-move] に順番にディレイを振る */
function applyStagger() {
  document.querySelectorAll("[data-move-stagger]").forEach((parent) => {
    const step = parseFloat(parent.dataset.moveStagger) || 0;
    const base = parseFloat(parent.dataset.delay) || 0;
    parent.querySelectorAll("[data-move]").forEach((el, i) => {
      if (el.dataset.delay == null) el.dataset.delay = +(base + step * i).toFixed(3);
    });
  });
}

/** data-* を CSS 変数に反映 */
function applyVars(el) {
  const d = el.dataset;
  if (d.delay != null) el.style.setProperty("--move-delay", toTime(d.delay));
  if (d.duration != null) el.style.setProperty("--move-duration", toTime(d.duration));
  if (d.distance != null) el.style.setProperty("--move-distance", toLength(d.distance));
  if (d.ease != null) el.style.setProperty("--move-ease", d.ease);
}

const activeClassOf = (el) => el.dataset.moveClass || CONFIG.activeClass;
const play = (el) => el.classList.add(activeClassOf(el));
const reset = (el) => el.classList.remove(activeClassOf(el));

/** 再生し直すか：自分 → 親 → CONFIG.repeat の順で、いちばん近い指定を使う */
function shouldRepeat(el) {
  const holder = el.closest("[data-move-repeat]");
  if (!holder) return CONFIG.repeat;
  return holder.dataset.moveRepeat !== "false"; // 値なし or "true" は true
}

/** offset ごとに IntersectionObserver を使い回す */
const observers = new Map();
function getObserver(offset) {
  if (observers.has(offset)) return observers.get(offset);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting, boundingClientRect, rootBounds }) => {
        const viewBottom = rootBounds ? rootBounds.bottom : window.innerHeight + offset;
        const isBelow = boundingClientRect.top > viewBottom;
        const repeat = shouldRepeat(target);

        if (isIntersecting || !isBelow) {
          // 画面内 or すでに通り過ぎた（上にある）要素は表示
          play(target);
          if (!repeat) io.unobserve(target); // 一度きりなら監視をやめる
        } else if (repeat) {
          // 画面の下に戻ったらリセット → 次に入ったとき再生
          reset(target);
        }
      });
    },
    { rootMargin: `0px 0px ${offset}px 0px` },
  );
  observers.set(offset, io);
  return io;
}

function init() {
  applyStagger();

  document.querySelectorAll("[data-move]").forEach((el) => {
    applyVars(el);

    if (el.dataset.moveTrigger === "load") {
      play(el);
      return;
    }
    const offset = parseInt(el.dataset.offset, 10) || 0;
    getObserver(offset).observe(el);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
