import { GetServerSideProps, NextPage } from "next";
import { ICategory, INews } from "../../types";
import { getLayout, getNewsDetail, getNewsListByCategory, getNewsListByDate } from "../../utils/fetchData";

import ActualitesPageLayout from "../../components/Actualites/ActualitesPageLayout";
import Head from "next/head";
import LayoutContext from "../../context/Context";
import NewsDetail from "../../components/Actualites/NewsDetail";
import { useContext } from "react";
import Motion from "../../components/Layout/Motion";

export const getServerSideProps: GetServerSideProps<Record<string, unknown>, { slug: string }> = async ({ params }) => {
  try {
    const [newsDetail, newsByCategory, newsByDate, layout] = await Promise.all([
      getNewsDetail(params?.slug),
      getNewsListByCategory(),
      getNewsListByDate(),
      getLayout(),
    ]);
    return {
      props: {
        newsByCategory,
        newsByDate,
        newsDetail,
        layout,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
};

interface Props {
  newsByCategory: ICategory[];
  newsByDate: ICategory[];
  newsDetail: INews;
}

const Actualite: NextPage<Props> = ({ newsByCategory, newsByDate, newsDetail }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { name, description, favicon } = siteSettings || {};
  return (
    <Motion>
      <Head>
        <title>{`Actualités - ${name}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
      </Head>
      <ActualitesPageLayout newsByCategory={newsByCategory} newsByDate={newsByDate}>
        <NewsDetail newsDetail={newsDetail} />
      </ActualitesPageLayout>
    </Motion>
  );
};

export default Actualite;
