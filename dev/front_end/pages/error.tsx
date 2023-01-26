import { faArrowLeft, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Motion from "../components/Layout/Motion";
import { getLayout } from "../utils/fetchData";

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    layout: await getLayout(),
  },
});

const ErrorPage = () => (
  <Motion>
    <div className="w-full h-full flex flex-col items-center justify-center text-red-500 text-xl text-center">
      <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
      <p className="w-1/5">Oops, une erreur est survenue. Contactez l&apos;administrateur.</p>
      <Link href="/" className="text-blue-500 mt-8">
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="xs" />
        Retour à l&apos;accueil
      </Link>
    </div>
  </Motion>
);

export default ErrorPage;
