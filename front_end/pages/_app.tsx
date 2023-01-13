import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import LayoutContext from "../context/Context";

const App = ({ Component, pageProps }: AppProps) => (
  <LayoutContext.Provider value={pageProps.layout}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </LayoutContext.Provider>
);

export default App;
