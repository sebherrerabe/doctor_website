import { GetServerSideProps, NextPage } from "next";
import { IContactDetails, IPage } from "../types";
import { getContactDetails, getLayout, getPageDetail } from "../utils/fetchData";

import ContactDetails from "../components/Contact/ContactDetails";
import ContactForm from "../components/Contact/ContactForm";
import Head from "next/head";
import LayoutContext from "../context/Context";
import Motion from "../components/Layout/Motion";
import PageImage from "../components/Layout/PageImage";
import PageLayout from "../components/Layout/PageLayout";
import { useContext } from "react";

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    contactDetails: await getContactDetails(),
    layout: await getLayout(),
    pageDetail: await getPageDetail("contact"),
  },
});

interface Props {
  contactDetails: IContactDetails;
  pageDetail: IPage;
}

const Contact: NextPage<Props> = ({
  contactDetails: { name: contactName, address, email, phone, embedded_map, show_contact_form, image },
  pageDetail: { icon },
}) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { name, description, favicon, secondary_color } = siteSettings || {};
  return (
    <Motion>
      <Head>
        <title>{`Contact - ${name}`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon?.image} />
      </Head>
      <PageLayout title="Contact" icon={icon}>
        <div className="h-full w-full flex flex-col lg:grid lg:grid-cols-4 gap-8 mt-8 lg:mt-0">
          <ContactDetails address={address} contactName={contactName} email={email} embedded_map={embedded_map} phone={phone} />
          {show_contact_form && <ContactForm />}
          {!show_contact_form && image && (
            <>
              <div />
              <PageImage image={image} secondary_color={secondary_color} />
            </>
          )}
        </div>
      </PageLayout>
    </Motion>
  );
};

export default Contact;
