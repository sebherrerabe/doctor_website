import { GetServerSideProps, NextPage } from "next";
import { getHighlights, getLayout } from "../utils/fetchData";

import Head from "next/head";
import { INews } from "../types";
import LayoutContext from "../context/Context";
import NewsCard from "../components/Actualites/NewsCard";
import { useContext } from "react";
import Motion from "../components/Layout/Motion";

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    highlights: await getHighlights(),
    layout: await getLayout(),
  },
});

interface Props {
  highlights: INews[];
}

const Home: NextPage<Props> = ({ highlights }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { name, description, favicon, brand_color, position, primary_color, main_image } = siteSettings || {};

  return (
    <Motion>
      <Head>
        <title>{`Accueil - ${name}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
      </Head>
      <div className="grid grid-rows-6 h-full w-full gap-8">
        <div
          className="w-full p-8 flex flex-col justify-end bg-cover bg-center row-span-4"
          style={{ backgroundImage: `url(${main_image})` }}
        >
          <h1 className="text-5xl w-fit p-2 font-medium" style={{ backgroundColor: brand_color, color: primary_color }}>
            {name}
          </h1>
          <p className="text-3xl w-fit p-1 mt-4" style={{ backgroundColor: primary_color, color: brand_color }}>
            {position}
          </p>
        </div>
        <div className="w-full grid grid-rows-4 gap-8 row-span-2">
          <div className="flex items-center w-full" style={{ backgroundColor: brand_color, color: primary_color }}>
            <h2 className="text-2xl py-1 px-2 font-semibold">Dérnieres actualités</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full row-span-3">
            {highlights.slice(0, 4).map((highlight) => (
              <NewsCard news={highlight} key={highlight.slug} />
            ))}
          </div>
        </div>
      </div>
    </Motion>
  );
};

export default Home;
