import React, { FC, useContext } from "react";

import LayoutContext from "../../context/Context";

interface Props {
  title: string;
}

const PageHeader: FC<Props> = ({ title }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { brand_color, primary_color } = siteSettings || {};
  return (
    <div className="lg:h-full w-full flex items-center justify-center lg:justify-start" style={{ color: primary_color, backgroundColor: brand_color }}>
      <h2 className="h-fit text-2xl lg:text-3xl p-2 lg:p-4 font-semibold">{title}</h2>
    </div>
  );
};

export default PageHeader;
