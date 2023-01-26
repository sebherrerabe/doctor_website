import { ICategory, IIcon } from "../../types";

import { FC } from "react";
import NewsContext from "../../context/NewsContext";
import NewsSidebar from "./NewsSidebar";
import PageLayout from "../Layout/PageLayout";

interface Props {
  newsByCategory: ICategory[];
  newsByDate: ICategory[];
  children: JSX.Element;
  icon: IIcon | null;
}

const ActualitesPageLayout: FC<Props> = ({ newsByCategory, newsByDate, children, icon }) => {
  return (
    <NewsContext.Provider value={{ newsByCategory, newsByDate }}>
      <PageLayout title="Actualités" icon={icon}>
        <div className="lg:h-full w-full flex flex-col mt-8 lg:mt-0 lg:grid grid-cols-5">
          {children}
          <NewsSidebar />
        </div>
      </PageLayout>
    </NewsContext.Provider>
  );
};

export default ActualitesPageLayout;
