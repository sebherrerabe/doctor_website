import { FC, useContext, useState } from "react";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutContext from "../../context/Context";
import Logo from "./Logo";
import PageLink from "./PageLink";
import ToolButton from "./ToolButton";

const Navbar: FC = () => {
  const { pages, siteSettings } = useContext(LayoutContext) || {};
  const { name, brand_color, primary_color } = siteSettings || {};
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <>
      <ToolButton
        style={{ backgroundColor: primary_color, color: brand_color }}
        onClick={() => setIsNavbarOpen(true)}
        icon={faBars}
      />
      <div
        className={`p-4 lg:p-8 flex flex-col items-center md:items-start overflow-y-auto text-xl font-semibold fixed lg:static z-50 w-screen lg:w-fit lg:h-full transition-all duration-300 ease-in-out shadow-xl lg:shadow-none lg:translate-y-0 ${
          isNavbarOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          backgroundColor: !isNavbarOpen ? undefined : primary_color,
        }}
      >
        <Logo name={name} brand_color={brand_color} />
        <ul className="mt-4 lg:mt-10 w-full">
          {pages?.map((page) => (
            <PageLink page={page} key={page.slug} setIsNavbarOpen={setIsNavbarOpen} />
          ))}
        </ul>
        <FontAwesomeIcon icon={faXmark} className="ml-auto lg:hidden" onClick={() => setIsNavbarOpen(false)} />
      </div>
    </>
  );
};

export default Navbar;
