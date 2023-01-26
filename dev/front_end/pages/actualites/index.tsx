import { GetServerSideProps, NextPage } from "next";
import { IActualites, ICategory, INews, IPage, IPagination } from "../../types";
import { getLayout, getNewsList, getNewsListByCategory, getNewsListByDate, getPageDetail } from "../../utils/fetchData";
import { useContext, useState } from "react";

import ActualitesPageLayout from "../../components/Actualites/ActualitesPageLayout";
import Head from "next/head";
import LayoutContext from "../../context/Context";
import Motion from "../../components/Layout/Motion";
import NewsList from "../../components/Actualites/NewsList";

export const getServerSideProps: GetServerSideProps = async () => {
  const [news, newsByCategory, newsByDate, layout, pageDetail] = await Promise.all([
    getNewsList({ env: "server" }),
    getNewsListByCategory(),
    getNewsListByDate(),
    getLayout(),
    getPageDetail("actualites"),
  ]);
  return {
    props: {
      news,
      newsByCategory,
      newsByDate,
      layout,
      pageDetail,
    },
  };
};

interface Props {
  news: IPagination<INews>;
  newsByCategory: ICategory[];
  newsByDate: ICategory[];
  pageDetail: IPage;
}

const Actualites: NextPage<Props> = ({ news, newsByCategory, newsByDate, pageDetail }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { name, description, favicon } = siteSettings || {};

  const [newsPagination, setNewsPagination] = useState<IActualites>({ ...news, page: 1 });

  return (
    <Motion>
      <Head>
        <title>{`Actualités - ${name}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon?.image} />
      </Head>
      <ActualitesPageLayout newsByCategory={newsByCategory} newsByDate={newsByDate} icon={pageDetail.icon}>
        <NewsList newsPagination={newsPagination} setNewsPagination={setNewsPagination} />
      </ActualitesPageLayout>
    </Motion>
  );
};

export default Actualites;
