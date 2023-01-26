import React, { FC, useContext } from "react";

import { IIcon } from "../../types";
import LayoutContext from "../../context/Context";

interface Props {
  title: string;
  icon: IIcon | null;
}

const PageHeader: FC<Props> = ({ title, icon }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { brand_color, primary_color } = siteSettings || {};
  return (
    <div
      className="lg:h-full w-full flex items-center justify-center lg:justify-start"
      style={{ color: primary_color, backgroundColor: brand_color }}
    >
      {icon && <div className="h-6 w-6 svg-con ml-2 lg:ml-4" dangerouslySetInnerHTML={{ __html: icon.icon || "" }} />}
      <h2 className="h-fit text-2xl lg:text-3xl p-2 lg:p-4 font-semibold">{title}</h2>
    </div>
  );
};

export default PageHeader;
