import { GetServerSideProps, NextPage } from "next";
import { IActualites, ICategory, INews, IPagination } from "../../types";
import { getLayout, getNewsList, getNewsListByCategory, getNewsListByDate } from "../../utils/fetchData";
import { useContext, useState } from "react";

import ActualitesPageLayout from "../../components/Actualites/ActualitesPageLayout";
import Head from "next/head";
import LayoutContext from "../../context/Context";
import NewsList from "../../components/Actualites/NewsList";
import Motion from "../../components/Layout/Motion";

export const getServerSideProps: GetServerSideProps = async () => {
  const [news, newsByCategory, newsByDate, layout] = await Promise.all([
    getNewsList(),
    getNewsListByCategory(),
    getNewsListByDate(),
    getLayout(),
  ]);
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
    <Motion>
      <Head>
        <title>{`Actualités - ${name}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
      </Head>
      <ActualitesPageLayout newsByCategory={newsByCategory} newsByDate={newsByDate}>
        <NewsList newsPagination={newsPagination} setNewsPagination={setNewsPagination} />
      </ActualitesPageLayout>
    </Motion>
  );
};

export default Actualites;
