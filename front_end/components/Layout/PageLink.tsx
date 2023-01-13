import * as icons from "@fortawesome/free-solid-svg-icons";

import { FC, useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IPage } from "../../types";
import LayoutContext from "../../context/Context";
import Link from "next/link";
import { useRouter } from "next/router";

const isPageActive = (pathname: string, page: IPage, query?: string) => {
  if (page.slug === "home" && pathname === "/") return true;
  if (pathname.includes(page.slug) || query?.includes(page.slug)) return true;
  return false;
};

interface Props {
  page: IPage;
}

const PageLink: FC<Props> = ({ page }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { siteSettings } = useContext(LayoutContext) || {};
  const { brand_color, primary_color } = siteSettings || {};
  const router = useRouter();

  const { pathname, query } = router;
  const isActive = isPageActive(pathname, page, query?.slug as string);

  return (
    <li
      className="mt-8 py-2 px-2 w-fit relative transition-all duration-500 ease-in-out cursor-pointer"
      style={{
        color: isActive || isHovering ? primary_color : brand_color,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="absolute h-full w-full top-0 left-0 transition-all duration-500 ease-in-out"
        style={{
          width: isActive || isHovering ? "100%" : "0",
          backgroundColor: brand_color,
        }}
      />
      <Link href={page.slug === "home" ? "/" : `/${page.slug}`} className="flex items-center relative">
        <FontAwesomeIcon icon={icons[page.icon]} className="mr-3 text-sm" />
        <span className="inline-block leading-[0.768em]">{page.title}</span>
      </Link>
    </li>
  );
};

export default PageLink;
