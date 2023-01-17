import "../styles/globals.css";

import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { Lato } from "@next/font/google";
import Layout from "../components/Layout/Layout";
import LayoutContext from "../context/Context";

const lato = Lato({ subsets: ["latin"], variable: "--font-lato", weight: ["100", "300", "400", "700", "900"] });

const App = ({ Component, pageProps }: AppProps) => (
  <main className={`${lato.variable} font-sans`}>
    <LayoutContext.Provider value={pageProps.layout}>
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
    </LayoutContext.Provider>
  </main>
);

export default App;
