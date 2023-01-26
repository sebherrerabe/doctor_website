import React, { FC, useContext } from "react";

import LayoutContext from "../../context/Context";
import { capitalize } from "../../utils/general";

interface Props {
  tag: string;
}

const NewsTag: FC<Props> = ({ tag }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { brand_color, primary_color } = siteSettings || {};
  return (
    <div className="py-1 px-4 mr-8 text-sm" style={{ backgroundColor: primary_color, border: `1px solid ${brand_color}` }}>
      {capitalize(tag)}
    </div>
  );
};

export default NewsTag;
