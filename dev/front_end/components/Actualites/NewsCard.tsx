import { FC, useContext, useState } from "react";
import { formatDjangoDate, handleImageUrl, truncateString } from "../../utils/general";

import { INews } from "../../types";
import Image from "next/image";
import LayoutContext from "../../context/Context";
import Link from "next/link";
import { Ref } from "react";
import { forwardRef } from "react";

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

const NewsCard = forwardRef<HTMLAnchorElement | undefined, Props>(
  (
    {
      news,
      className = "h-full w-full relative",
      transformPorcentage = "-100%",
      titleClassName = "text-sm md:text-base font-bold w-fit",
      dateClassName = "p-2 text-xs md:text-sm w-fit mt-2",
      titleMaxLength = 80,
      descriptionMaxLength = 200,
      infoContainerClassName = "h-1/2 w-full p-4 flex flex-col justify-end",
      imageSizes = "(max-width: 640px) 100vw, 640px",
    },
    ref
  ) => {
    const { siteSettings } = useContext(LayoutContext) || {};
    const { brand_color, primary_color } = siteSettings || {};
    const [isHovering, setIsHovering] = useState(false);

    return (
      <Link
        href={`/actualites/${news.slug}`}
        className={className}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        ref={ref as Ref<HTMLAnchorElement> | undefined}
      >
        <Image
          src={handleImageUrl(news.image.image)}
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
            <h4>
              <span className="box-decoration-clone p-1" style={{ backgroundColor: primary_color }}>
                {truncateString(news.description, descriptionMaxLength)}
              </span>
            </h4>
          </div>
        </div>
      </Link>
    );
  }
);

NewsCard.displayName = "NewsCard";
export default NewsCard;
