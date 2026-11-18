import { defineConfig } from "vite";
import { resolve } from "node:path";

// =========================================================
// 環境ごとの設定
//   npm run build      → 本番（production）
//   npm run build:stg  → テスト環境（staging）
//   npm run dev        → 開発中はテスト環境と同じ扱い（GTM を読まない）
// =========================================================
const ENVIRONMENTS = {
  production: {
    // 本番データの出力先。納品先のディレクトリに合わせて修正
    // 例: outDir: "dist/lp/案件名/",
    outDir: "dist",
    noindex: false, // true で検索エンジンに載らないようにする
    removeGTM: false, // true で Google Tag Manager のコードを消す
  },
  staging: {
    outDir: "dist-stg",
    noindex: true,
    removeGTM: true,
  },
};

// JSの type="module" と crossorigin を完全に剥ぎ取るプラグイン　必要に応じてコメントアウトを外してください。
// const disableModuleAndCrossOrigin = () => {
//   return {
//     name: "disable-module-and-crossorigin",
//     transformIndexHtml(html) {
//       return (
//         html
//           // scriptタグの type="module" を消す、または普通の defer に置換
//           .replace(/type="module"/g, "defer")
//           // すべての crossorigin 属性を削除
//           .replace(/\s?crossorigin(=['"]?anonymous['"]?)?/g, "")
//       );
//     },
//   };
// };

export default defineConfig(({ mode }) => {
  const env = ENVIRONMENTS[mode] ?? ENVIRONMENTS.staging;

  return {
    // 相対パスを使用するように変更
    base: "./",

    build: {
      outDir: env.outDir,

      rolldownOptions: {
        input: {
          main: resolve(import.meta.dirname, "index.html"),
          // 必要に応じてページを追加すること。
        },

        output: {
          // JS（メイン）の出力先
          entryFileNames: "assets/js/bundle.js",

          // JS（分割されたコード）の出力先
          chunkFileNames: "assets/js/[name].js",

          // CSSや画像などの出力先を拡張子で自動振り分け
          assetFileNames: (assetInfo) => {
            // ファイル名（無ければ空文字）を取得
            const name = assetInfo.name || "";

            // 1. CSSファイルの振り分け
            if (name.endsWith(".css")) {
              return "assets/style/[name].[ext]";
            }

            // 2. 画像ファイルの振り分け（主要な画像拡張子を指定）
            if (/\.(gif|jpe?g|png|svg|webp|ico|avif)$/i.test(name)) {
              return "assets/images/[name].[ext]";
            }

            // 3. フォントなど、その他のアセット
            return "assets/[name].[ext]";
          },
        },
      },
    },

    plugins: [
      {
        // htmlを英語から日本語対応に変換
        name: "html-lang-transformer",
        transformIndexHtml(html) {
          return html.replace('lang="en"', 'lang="ja"');
        },
      },

      {
        // 環境ごとの HTML の出し分け（noindex / GTM 削除）
        name: "html-environment",
        transformIndexHtml(html) {
          if (env.removeGTM) {
            // <!-- Google Tag Manager --> 〜 <!-- End Google Tag Manager --> を中身ごと削除
            // （noscript 側の <!-- Google Tag Manager (noscript) --> も対象）
            html = html.replace(
              /[ \t]*<!-- Google Tag Manager[^>]*-->[\s\S]*?<!-- End Google Tag Manager[^>]*-->\n?/g,
              "",
            );
          }
          if (env.noindex) {
            html = html.replace(
              "</head>",
              '  <meta name="robots" content="noindex, nofollow" />\n  </head>',
            );
          }
          return html;
        },
      },

      // 必要に応じてコメントアウトを外してください。
      // disableModuleAndCrossOrigin(),
    ],
  };
});
