import { FC, useContext } from "react";
import { faArrowLeft, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { getLayout, getPageDetail } from "../utils/fetchData";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { IPage } from "../types";
import LayoutContext from "../context/Context";
import Link from "next/link";
import Motion from "../components/Layout/Motion";
import PageImage from "../components/Layout/PageImage";
import PageLayout from "../components/Layout/PageLayout";

export const getServerSideProps: GetServerSideProps<Record<string, unknown>, { slug: string }> = async ({ params }) => {
  try {
    const [pageDetail, layout] = await Promise.all([getPageDetail(params?.slug), getLayout()]);
    return {
      props: {
        pageDetail,
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
  pageDetail: IPage;
}

const CustomPage: FC<Props> = ({ pageDetail: { title, meta_description, meta_keywords, image, content, icon } }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { name, favicon, secondary_color } = siteSettings || {};
  return (
    <Motion>
      <Head>
        <title>{`${title} - ${name}`}</title>
        <meta name="description" content={meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={meta_keywords} />
        <link rel="icon" href={favicon?.image} />
      </Head>
      <PageLayout title={title} icon={icon}>
        <div className="h-full w-full flex flex-col lg:grid lg:grid-cols-4 gap-8 ">
          <div
            className="col-span-3 overflow-y-auto page-content mt-8 lg:mt-0"
            dangerouslySetInnerHTML={content ? { __html: content } : undefined}
          >
            {!content ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-red-500 text-xl text-center">
                <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
                <p className="w-1/5">Oops, cette page n&apos;a pas encore été créée.</p>
                <Link href="/" className="text-blue-500 mt-8">
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="xs" />
                  Retour à l&apos;accueil
                </Link>
              </div>
            ) : undefined}
          </div>
          <PageImage image={image} secondary_color={secondary_color} />
        </div>
      </PageLayout>
    </Motion>
  );
};

export default CustomPage;
