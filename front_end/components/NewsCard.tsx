import { FC, useContext, useState } from "react";

import Link from "next/link";
import LayoutContext from "../context/Context";
import { INews } from "../types";
import convertHexToRGBColor from "../utils/convertHexToRGBColor";
import formatDjangoDate from "../utils/formatDjangoDate";
import truncateString from "../utils/truncateString";

interface Props {
  news: INews;
  className?: string;
  transformPorcentage?: string;
  titleClassName?: string;
  dateClassName?: string;
  titleMaxLength?: number;
  descriptionMaxLength?: number;
  infoContainerClassName?: string;
}

const NewsCard: FC<Props> = ({
  news,
  className = "overflow-hidden",
  transformPorcentage = "-50%",
  titleClassName = "p-1 text-sm font-bold w-fit",
  dateClassName = "p-1 text-xs w-fit mt-1",
  titleMaxLength = 45,
  descriptionMaxLength = 250,
  infoContainerClassName = "h-1/2 w-full p-2 flex flex-col justify-end",
}) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { brand_color, primary_color } = siteSettings || {};
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      href={`/actualites/${news.id}`}
      className={className}
      style={{ backgroundImage: `url(${news.image})` }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="h-[200%] w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(${isHovering ? transformPorcentage : "0"})` }}
      >
        <div className={infoContainerClassName}>
          <h3 className={titleClassName} style={{ backgroundColor: brand_color, color: primary_color }}>
            {truncateString(news.title, titleMaxLength)}
          </h3>
          <p className={dateClassName} style={{ backgroundColor: primary_color, color: brand_color }}>
            {formatDjangoDate(news.date_published)}
          </p>
        </div>
        <div className="h-1/2 w-full p-2 text-center flex items-center">
          <span className="p-1 flex" style={{ backgroundColor: convertHexToRGBColor(primary_color, "0.7") }}>
            {truncateString(news.description, descriptionMaxLength)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
