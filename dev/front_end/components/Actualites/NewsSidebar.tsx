import { useContext, useState } from "react";

import LayoutContext from "../../context/Context";
import NewsContext from "../../context/NewsContext";
import NewsSidebarSection from "./NewsSidebarSection";
import ToolButton from "../Layout/ToolButton";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const NewsSidebar = () => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { newsByCategory, newsByDate } = useContext(NewsContext) || {};
  const { primary_color } = siteSettings || {};

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <>
      <ToolButton
        className="fixed p-2 flex items-center text-lg z-50 shadow-2xl mb-4 bottom-0 right-4 font-semibold lg:hidden"
        iconClassName="mr-2"
        style={{ backgroundColor: primary_color }}
        icon={faFilter}
        text={`${isFiltersOpen ? "Fermer" : "Filtrer"}`}
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
      />
      <div
        className={`h-full grid grid-rows-2 overflow-auto fixed top-0 right-0 py-4 lg:py-0 lg:static shadow-xl lg:shadow-none transition-transform
        duration-300 ease-in-out z-40 ${isFiltersOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0`}
        style={{ backgroundColor: primary_color }}
      >
        <NewsSidebarSection title="Par date" elements={newsByDate || []} />
        <NewsSidebarSection title="Par catégorie" elements={newsByCategory || []} />
      </div>
    </>
  );
};

export default NewsSidebar;
