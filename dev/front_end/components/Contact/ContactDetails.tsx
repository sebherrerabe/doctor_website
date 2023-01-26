import React, { FC } from "react";
import { faMailBulk, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  contactName: string;
  address: string;
  email: string;
  phone: string;
  embedded_map: string;
}

const ContactDetails: FC<Props> = ({ address, contactName, email, embedded_map, phone }) => (
  <div className="col-span-2 h-full flex flex-col justify-center">
    <h2 className="text-2xl font-bold">{contactName}</h2>
    <div className="w-full grid grid-cols-2 gap-8 py-6 lg:py-8 mt-4">
      <div className="font-semibold flex">
        <div className="w-10">
          <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" className="mr-2" />
        </div>
        Address
      </div>
      <span>{address}</span>
    </div>
    <div className="w-full grid grid-cols-2 gap-8 py-6 lg:py-8">
      <div className="font-semibold flex">
        <div className="w-10">
          <FontAwesomeIcon icon={faMailBulk} size="lg" className="mr-2" />
        </div>
        Email
      </div>
      <span>{email}</span>
    </div>
    <div className="w-full grid grid-cols-2 gap-8 py-6 lg:py-8">
      <div className="font-semibold flex">
        <div className="w-10">
          <FontAwesomeIcon icon={faPhone} size="lg" className="mr-2" />
        </div>
        Téléphone
      </div>
      <span>{phone}</span>
    </div>
    <div className="w-full h-96 lg:h-[28rem] mt-4 lg:mt-0" dangerouslySetInnerHTML={{ __html: embedded_map }}></div>
  </div>
);

export default ContactDetails;
