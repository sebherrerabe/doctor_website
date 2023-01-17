import { FC } from "react";
import { ICategory } from "../../types";
import NewsContext from "../../context/NewsContext";
import NewsSidebar from "./NewsSidebar";
import PageLayout from "../Layout/PageLayout";

interface Props {
  newsByCategory: ICategory[];
  newsByDate: ICategory[];
  children: JSX.Element;
}

const ActualitesPageLayout: FC<Props> = ({ newsByCategory, newsByDate, children }) => {
  return (
    <NewsContext.Provider value={{ newsByCategory, newsByDate }}>
      <PageLayout title="Actualités">
        <div className="lg:h-full w-full flex flex-col mt-8 lg:mt-0 lg:grid grid-cols-5">
          {children}
          <NewsSidebar />
        </div>
      </PageLayout>
    </NewsContext.Provider>
  );
};

export default ActualitesPageLayout;
