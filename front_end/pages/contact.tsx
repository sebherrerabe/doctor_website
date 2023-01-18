import { GetServerSideProps, NextPage } from "next";
import { getContactDetails, getLayout } from "../utils/fetchData";

import ContactDetails from "../components/Contact/ContactDetails";
import ContactForm from "../components/Contact/ContactForm";
import Head from "next/head";
import { IContactDetails } from "../types";
import LayoutContext from "../context/Context";
import Motion from "../components/Layout/Motion";
import PageLayout from "../components/Layout/PageLayout";
import { useContext } from "react";

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    contactDetails: await getContactDetails(),
    layout: await getLayout(),
  },
});

interface Props {
  contactDetails: IContactDetails;
}

const Contact: NextPage<Props> = ({ contactDetails: { name: contactName, address, email, phone, embedded_map } }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { name, description, favicon, brand_color, primary_color } = siteSettings || {};
  return (
    <Motion>
      <Head>
        <title>{`Contact - ${name}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon?.image} />
      </Head>
      <PageLayout title="Contact">
        <div className="h-full w-full flex flex-col lg:grid lg:grid-cols-2 gap-8 mt-8 lg:mt-0">
          <ContactDetails address={address} contactName={contactName} email={email} embedded_map={embedded_map} phone={phone} />
          <ContactForm />
        </div>
      </PageLayout>
    </Motion>
  );
};

export default Contact;
