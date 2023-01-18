import { Dispatch, FC, SetStateAction, useContext, useState } from "react";

import { IPage } from "../../types";
import LayoutContext from "../../context/Context";
import Link from "next/link";
import { useRouter } from "next/router";

const apiHost = process.env.API_HOST;

const isPageActive = (pathname: string, page: IPage, query?: string) => {
  if (page.slug === "home" && pathname === "/") return true;
  if (pathname.includes(page.slug) || query?.includes(page.slug)) return true;
  return false;
};

interface Props {
  page: IPage;
  setIsNavbarOpen: Dispatch<SetStateAction<boolean>>;
}

const PageLink: FC<Props> = ({ page, setIsNavbarOpen }) => {
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
      <Link
        href={page.slug === "home" ? "/" : `/${page.slug}`}
        className="flex items-center relative"
        onClick={() => setIsNavbarOpen(false)}
      >
        <div className="h-5 w-5 svg-con" dangerouslySetInnerHTML={{ __html: page.icon?.icon || "" }} />
        <span className="inline-block leading-[0.768em] ml-2">{page.title}</span>
      </Link>
    </li>
  );
};

export default PageLink;
