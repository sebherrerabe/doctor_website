import React, { FC, useContext } from "react";
import LayoutContext from "../context/Context";

interface Props {
  title: string;
}

const PageHeader: FC<Props> = ({ title }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { brand_color, primary_color } = siteSettings || {};
  return (
    <div className="h-full w-full flex items-center" style={{ color: primary_color, backgroundColor: brand_color }}>
      <h2 className="h-fit text-3xl p-4 font-semibold">{title}</h2>
    </div>
  );
};

export default PageHeader;
