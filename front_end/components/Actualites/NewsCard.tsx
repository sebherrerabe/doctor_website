import { FC, useContext, useState } from "react";
import { convertHexToRGBColor, formatDjangoDate, truncateString } from "../../utils/general";

import { INews } from "../../types";
import Image from "next/image";
import LayoutContext from "../../context/Context";
import Link from "next/link";

const apiHost = process.env.API_HOST;

interface Props {
  news: INews;
  className?: string;
  transformPorcentage?: string;
  titleClassName?: string;
  dateClassName?: string;
  titleMaxLength?: number;
  descriptionMaxLength?: number;
  infoContainerClassName?: string;
  imageSizes?: string;
}

const NewsCard: FC<Props> = ({
  news,
  className = "overflow-hidden relative",
  transformPorcentage = "-50%",
  titleClassName = "text-sm font-bold w-fit",
  dateClassName = "p-1 text-xs w-fit mt-1",
  titleMaxLength = 45,
  descriptionMaxLength = 250,
  infoContainerClassName = "h-1/2 w-full p-2 flex flex-col justify-end",
  imageSizes,
}) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { brand_color, primary_color } = siteSettings || {};
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      href={`/actualites/${news.slug}`}
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        src={news.image.image}
        alt={news.image.alt || ""}
        fill
        className="-z-10 object-cover"
        sizes={imageSizes}
        
      />
      <div
        className="h-[200%] w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(${isHovering ? transformPorcentage : "0"})` }}
      >
        <div className={infoContainerClassName}>
          <h3 className={titleClassName}>
            <span className="box-decoration-clone p-1" style={{ backgroundColor: brand_color, color: primary_color }}>
              {truncateString(news.title, titleMaxLength)}
            </span>
          </h3>
          <p className={dateClassName} style={{ backgroundColor: primary_color, color: brand_color }}>
            {formatDjangoDate(news.date_published)}
          </p>
        </div>
        <div className="h-1/2 w-full p-2 text-center items-center hidden lg:flex">
          <span className="p-1 flex" style={{ backgroundColor: convertHexToRGBColor(primary_color, "0.7") }}>
            {truncateString(news.description, descriptionMaxLength)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
