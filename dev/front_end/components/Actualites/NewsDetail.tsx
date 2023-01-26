import { EmailShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { faFacebook, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { formatDjangoDate, handleImageUrl } from "../../utils/general";

import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { INews } from "../../types";
import Image from "next/image";
import NewsTag from "./NewsTag";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface Props {
  newsDetail: INews;
}

const NewsDetail: FC<Props> = ({
  newsDetail: { categories, author, content, date_published, description, image, title, url },
}) => (
  <div className="col-span-4 lg:pr-4 overflow-y-auto">
    {categories?.length > 0 && (
      <div className="w-full flex">
        {categories.map((category, idx) => (
          <NewsTag tag={category as string} key={idx} />
        ))}
      </div>
    )}
    <div className="w-full flex flex-col mt-2 lg:mt-4">
      <h1 className="text-2xl lg:text-3xl font-semibold mt-4">{title}</h1>
      <p className="text-lg lg:text-xl mt-4">{description}</p>
      <div className="w-full mt-4 flex justify-between">
        <p className="text-base lg:text-lg ">
          Par <span className="font-bold">{author}</span>, le {formatDjangoDate(date_published)}
        </p>
        <div>
          <span className="mr-2">Partager sur :</span>
          <FacebookShareButton url={url} className="mr-2">
            <FontAwesomeIcon icon={faFacebook} size="lg" className="text-blue-600" />
          </FacebookShareButton>
          <TwitterShareButton url={url} className="mr-2">
            <FontAwesomeIcon icon={faTwitter} size="lg" className="text-blue-400" />
          </TwitterShareButton>
          <WhatsappShareButton url={url} className="mr-2">
            <FontAwesomeIcon icon={faWhatsapp} size="lg" className="text-green-500" />
          </WhatsappShareButton>
          <EmailShareButton url={url} className="mr-2">
            <FontAwesomeIcon icon={faEnvelope} size="lg" className="text-red-500" />
          </EmailShareButton>
        </div>
      </div>

      <div role="img" aria-label="image" className="w-full h-96 lg:h-[34rem] mt-6 lg:mt-8 relative">
        <Image src={handleImageUrl(image.image)} alt={image.alt || ""} fill className="-z-10 object-cover" />
      </div>
      <div className="text-base lg:text-lg mt-6 lg:mt-8" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  </div>
);
export default NewsDetail;
