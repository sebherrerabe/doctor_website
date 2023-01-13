import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import { getLayout } from "../utils/fetchData";
import { faExclamationTriangle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    layout: await getLayout(),
  },
});

const ErrorPage = () => (
  <div className="w-full h-full flex flex-col items-center justify-center text-red-500 text-xl text-center">
    <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
    <p className="w-1/5">Oops, une erreur est survenue. Contactez l'administrateur.</p>
    <Link href="/" className="text-blue-500 mt-8">
      <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
      Retour à l'accueil
    </Link>
  </div>
);

export default ErrorPage;
