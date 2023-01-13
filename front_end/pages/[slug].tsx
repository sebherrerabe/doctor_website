import { faArrowLeft, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";

import Head from "next/head";
import Link from "next/link";
import { FC, useContext } from "react";
import Motion from "../components/Layout/Motion";
import PageLayout from "../components/Layout/PageLayout";
import LayoutContext from "../context/Context";
import { IPage } from "../types";
import { getLayout, getPageDetail } from "../utils/fetchData";

const apiHost = process.env.API_HOST;

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

const CustomPage: FC<Props> = ({ pageDetail: { title, meta_description, meta_keywords, image, content } }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { name, favicon, secondary_color } = siteSettings || {};
  return (
    <Motion>
      <Head>
        <title>{`${title} - ${name}`}</title>
        <meta name="description" content={meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={meta_keywords} />
        <link rel="icon" href={favicon} />
      </Head>
      <PageLayout title={title}>
        <div className="h-full w-full grid grid-cols-4 gap-8">
          <div
            className="col-span-3 overflow-y-auto page-content"
            dangerouslySetInnerHTML={content ? { __html: content } : undefined}
          >
            {!content ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-red-500 text-xl text-center">
                <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
                <p className="w-1/5">Oops, cette page n'a pas encore été créée.</p>
                <Link href="/" className="text-blue-500 mt-8">
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Retour à l'accueil
                </Link>
              </div>
            ) : undefined}
          </div>
          <div>
            <div
              className="w-full h-[28rem] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${apiHost}${image})`, border: `0.5rem solid ${secondary_color}` }}
            ></div>
          </div>
        </div>
      </PageLayout>
    </Motion>
  );
};

export default CustomPage;
