import { FC, useContext } from "react";

import Image from "next/image";
import LayoutContext from "../../context/Context";
import Link from "next/link";
import Logo from "./Logo";
import PageLink from "./PageLink";

interface Props {
  className: string;
}

const Navbar: FC<Props> = ({ className }) => {
  const { pages, siteSettings } = useContext(LayoutContext) || {};
  const { name, brand_color } = siteSettings || {};
  return (
    <div className={className}>
      <Logo name={name} brand_color={brand_color} />
      <ul className="mt-10">
        {pages?.map((page) => (
          <PageLink page={page} key={page.slug} />
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
