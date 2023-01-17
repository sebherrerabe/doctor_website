import { FC, useContext } from "react";

import LayoutContext from "../../context/Context";
import Navbar from "./Navbar";
import { convertHexToRGBColor } from "../../utils/general";

interface Props {
  children: JSX.Element;
}

const Layout: FC<Props> = ({ children }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { background_image, primary_color, text_color } = siteSettings || {};
  return (
    <div
      className="h-full w-full flex bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${background_image?.image})`, color: text_color }}
    >
      <div
        className="lg:h-screen w-screen bg-white/80 flex flex-col lg:flex-row"
        style={{ backgroundColor: convertHexToRGBColor(primary_color, "0.97") }}
      >
        <Navbar />
        <main className="lg:h-full w-full p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
