import { GetServerSideProps, NextPage } from "next";
import { ICategory, INews, IPage } from "../../types";
import { getLayout, getNewsDetail, getNewsListByCategory, getNewsListByDate, getPageDetail } from "../../utils/fetchData";

import ActualitesPageLayout from "../../components/Actualites/ActualitesPageLayout";
import Head from "next/head";
import LayoutContext from "../../context/Context";
import Motion from "../../components/Layout/Motion";
import NewsDetail from "../../components/Actualites/NewsDetail";
import { useContext } from "react";

export const getServerSideProps: GetServerSideProps<Record<string, unknown>, { slug: string }> = async ({ params }) => {
  try {
    const [newsDetail, newsByCategory, newsByDate, layout, pageDetail] = await Promise.all([
      getNewsDetail(params?.slug),
      getNewsListByCategory(),
      getNewsListByDate(),
      getLayout(),
      getPageDetail("actualites"),
    ]);
    return {
      props: {
        newsByCategory,
        newsByDate,
        newsDetail,
        layout,
        pageDetail,
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
  pageDetail: IPage;
}

const Actualite: NextPage<Props> = ({ newsByCategory, newsByDate, newsDetail, pageDetail }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { name, favicon } = siteSettings || {};
  return (
    <Motion>
      <Head>
        <title>{`${newsDetail.title} - ${name}`}</title>
        <meta name="description" content={newsDetail.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon?.image} />
        <meta property="og:title" content={newsDetail.title} />
        <meta property="og:description" content={newsDetail.description} />
        <meta property="og:image" content={newsDetail.image?.image} />
        <meta property="og:url" content={newsDetail.url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={newsDetail.title} />
        <meta name="twitter:description" content={newsDetail.description} />
        <meta name="twitter:image" content={newsDetail.image?.image} />
      </Head>
      <ActualitesPageLayout newsByCategory={newsByCategory} newsByDate={newsByDate} icon={pageDetail.icon}>
        <NewsDetail newsDetail={newsDetail} />
      </ActualitesPageLayout>
    </Motion>
  );
};

export default Actualite;
