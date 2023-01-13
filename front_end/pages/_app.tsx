import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";

import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import LayoutContext from "../context/Context";

const App = ({ Component, pageProps }: AppProps) => (
  <LayoutContext.Provider value={pageProps.layout}>
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} />
      </AnimatePresence>
    </Layout>
  </LayoutContext.Provider>
);

export default App;
