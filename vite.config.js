import { defineConfig } from "vite";
import { resolve } from "node:path";

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

export default defineConfig({
  // 相対パスを使用するように変更
  base: "./",

  build: {
    // 本番データの出力先、デフォルトdist 納品先のディレクトリに合わせて修正
    // 例: outDir: "dist/lp/案件名/",
    outDir: "dist",

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

    // 必要に応じてコメントアウトを外してください。
    // disableModuleAndCrossOrigin(),
  ],
});
