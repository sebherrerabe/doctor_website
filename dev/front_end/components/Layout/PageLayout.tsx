import React, { FC, ReactNode } from "react";

import { IIcon } from "../../types";
import PageHeader from "./PageHeader";

interface Props {
  title: string;
  icon: IIcon | null;
  children: ReactNode;
}

const PageLayout: FC<Props> = ({ title, icon, children }) => (
  <div className="lg:h-full w-full flex flex-col lg:grid lg:gap-8 " style={{ gridTemplateRows: "repeat(10, minmax(0, 1fr))" }}>
    <PageHeader title={title} icon={icon}/>
    <div className="w-full" style={{ gridRow: "span 9 / span 9" }}>
      {children}
    </div>
  </div>
);

export default PageLayout;
