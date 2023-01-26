import { Head, Html, Main, NextScript } from "next/document";
import { config, dom } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const Document = () => (
  <Html lang="fr">
    <Head>
      <style>{dom.css()}</style>
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
