import { FC, useContext } from "react";

import Image from "next/image";
import LayoutContext from "../context/Context";
import Link from "next/link";
import PageLink from "./PageLink";

interface Props {
  className: string;
}

const apiHost = process.env.API_HOST;

const Navbar: FC<Props> = ({ className }) => {
  const { pages, siteSettings } = useContext(LayoutContext) || {};
  const { logo } = siteSettings || {};
  return (
    <div className={className}>
      <Link href="/">
        <Image src={`${apiHost}${logo}`} width={300} height={200} alt="logo" />
      </Link>
      <ul className="mt-10">
        {pages?.map((page) => (
          <PageLink page={page} key={page.slug} />
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
