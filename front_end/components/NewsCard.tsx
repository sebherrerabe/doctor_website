import { FC, useContext, useState } from "react";

import Link from "next/link";
import LayoutContext from "../context/Context";
import { INews } from "../types";
import convertHexToRGBColor from "../utils/convertHexToRGBColor";
import formatDjangoDate from "../utils/formatDjangoDate";
import truncateString from "../utils/truncateString";

interface Props {
  news: INews;
  className: string;
}

const NewsCard: FC<Props> = ({ news, className }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { brand_color, primary_color } = siteSettings || {};
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      href={`/news/${news.id}`}
      className={className}
      style={{ backgroundImage: `url(${news.image})` }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="h-[200%] w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(${isHovering ? "-48%" : "0"})` }}
      >
        <div className="h-1/2 w-full p-2 flex flex-col justify-end">
          <h3 className="p-1 text-sm font-bold w-fit" style={{ backgroundColor: brand_color, color: primary_color }}>
            {truncateString(news.title, 45)}
          </h3>
          <p className="p-1 text-xs w-fit mt-1" style={{ backgroundColor: primary_color, color: brand_color }}>
            {formatDjangoDate(news.date_published)}
          </p>
        </div>
        <div
          className="h-1/2 w-full p-2 text-center flex items-center"
          style={{ backgroundColor: convertHexToRGBColor(primary_color, "0.7") }}
        >
          {truncateString(news.description, 250)}
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
