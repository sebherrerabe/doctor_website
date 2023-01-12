import { IActualites, ICategory, ILayout, INews, IPage, IPagination, ISiteSettings } from "../../types";

import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useContext, useState } from "react";
import PageLayout from "../../components/PageLayout";
import LayoutContext from "../../context/Context";
import News from "../../components/News";
import NewsSidebar from "../../components/NewsSidebar";
import NewsContext from "../../context/NewsContext";

export const getServerSideProps = async () => {
  const apiHost = process.env.API_HOST;
  const { data: siteSettings } = await axios.get<ISiteSettings>(`${apiHost}/api/site-settings`);
  const { data: pages } = await axios.get<IPage[]>(`${apiHost}/api/pages`);
  const { data: news } = await axios.get<IPagination<INews>>(`${apiHost}/api/news/`);
  const { data: newsByCategory } = await axios.get<ICategory[]>(`${apiHost}/api/news/category/`);
  const { data: newsByDate } = await axios.get<ICategory[]>(`${apiHost}/api/news/date/`);

  const layout: ILayout = {
    pages,
    siteSettings,
  };

  return {
    props: {
      news,
      newsByCategory,
      newsByDate,
      layout,
    },
  };
};

interface Props {
  news: IPagination<INews>;
  newsByCategory: ICategory[];
  newsByDate: ICategory[];
}

const Actualites: NextPage<Props> = ({ news, newsByCategory, newsByDate }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { name, description, favicon } = siteSettings || {};

  const [newsPagination, setNewsPagination] = useState<IActualites>({ ...news, page: 1 });

  return (
    <>
      <Head>
        <title>{`Actualités - ${name}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
      </Head>
      <NewsContext.Provider value={{ newsByCategory, newsByDate }}>
        <PageLayout title="Actualités">
          <div className="h-full w-full grid grid-cols-5">
            <News newsPagination={newsPagination} setNewsPagination={setNewsPagination} />
            <NewsSidebar />
          </div>
        </PageLayout>
      </NewsContext.Provider>
    </>
  );
};

export default Actualites;
