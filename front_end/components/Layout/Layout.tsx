import { FC, useContext } from "react";

import LayoutContext from "../../context/Context";
import { convertHexToRGBColor } from "../../utils/general";
import Navbar from "./Navbar";

interface Props {
  children: JSX.Element;
}

const Layout: FC<Props> = ({ children }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { background_image, primary_color, text_color } = siteSettings || {};
  return (
    <div
      className="h-full w-full flex bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${background_image})`, color: text_color }}
    >
      <div
        className="h-screen w-screen bg-white/80 flex"
        style={{ backgroundColor: convertHexToRGBColor(primary_color, "0.97") }}
      >
        <Navbar className="h-full p-8 flex flex-col overflow-y-auto text-xl font-semibold" />
        <main className="h-full w-full p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
