import { AnimatePresence, motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import { getHighlights, getLayout } from "../utils/fetchData";
import { useContext, useEffect, useState } from "react";

import Head from "next/head";
import { INews } from "../types";
import Image from "next/image";
import LayoutContext from "../context/Context";
import Motion from "../components/Layout/Motion";
import NewsCard from "../components/Actualites/NewsCard";
import { handleImageUrl } from "../utils/general";

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
  const { name, description, favicon, brand_color, position, primary_color, hero_images } = siteSettings || {};
  const [imageIdx, setImageIdx] = useState(0);

  useEffect(() => {
    if (hero_images && hero_images.length > 1) {
      const intervalId = setInterval(
        () => setImageIdx((prevIndex) => (prevIndex === hero_images.length - 1 ? 0 : prevIndex + 1)),
        10000
      );
      return () => clearInterval(intervalId);
    }
  }, [hero_images]);

  return (
    <Motion>
      <Head>
        <title>{`Accueil - ${name}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon?.image} />
      </Head>
      <div className="flex flex-col lg:grid lg:grid-rows-6 lg:h-full w-full gap-8">
        <div className="h-[60vh] w-full p-4 lg:p-8 flex flex-col justify-end row-span-4 relative">
          <AnimatePresence mode="wait" initial={true}>
            <motion.div
              key={imageIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="-z-10 object-cover"
            >
              {hero_images?.map((image, idx) => (
                <Image
                  key={idx}
                  src={handleImageUrl(image.image)}
                  alt={image.alt || ""}
                  fill
                  className={`-z-10 object-cover ${idx !== imageIdx ? "hidden" : ""}`}
                  priority
                />
              ))}
            </motion.div>
          </AnimatePresence>
          <h1>
            <span
              className="box-decoration-clone p-1 text-4xl lg:text-5xl w-fit p-2 font-medium"
              style={{ backgroundColor: brand_color, color: primary_color }}
            >
              {name}
            </span>
          </h1>
          <p className="text-xl lg:text-3xl w-fit p-1 mt-4" style={{ backgroundColor: primary_color, color: brand_color }}>
            {position}
          </p>
        </div>
        <div className="w-full lg:grid lg:grid-rows-4 lg:gap-8 lg:row-span-2">
          <div className="flex items-center w-full" style={{ backgroundColor: brand_color, color: primary_color }}>
            <h2 className="text-xl lg:text-2xl py-1 px-2 font-semibold">D??rnieres actualit??s</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 w-full row-span-3 mt-4 lg:mt-0">
            {highlights.slice(0, 4).map((highlight, idx) => (
              <NewsCard
                news={highlight}
                titleClassName="text-xl lg:text-lg"
                className={`aspect-video lg:aspect-auto overflow-hidden relative ${idx > 2 ? "lg:hidden xl:block" : ""}`}
                imageSizes=""
                key={highlight.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </Motion>
  );
};

export default Home;
