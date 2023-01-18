import { faFilter, faFilterCircleXmark, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutContext from "../../context/Context";
import NewsContext from "../../context/NewsContext";
import NewsSidebarSection from "./NewsSidebarSection";
import ToolButton from "../Layout/ToolButton";

const NewsSidebar = () => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { newsByCategory, newsByDate } = useContext(NewsContext) || {};
  const { primary_color } = siteSettings || {};

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <>
      <ToolButton
        className="fixed p-2 flex items-center text-lg z-40 shadow-2xl mb-4 lg:hidden bottom-0 right-0 font-semibold"
        iconClassName="mr-2"
        style={{ backgroundColor: primary_color }}
        icon={faFilter}
        text="Filtrer"
        onClick={() => setIsFiltersOpen(true)}
      />
      <div
        className={`h-full grid grid-rows-2 overflow-auto fixed top-0 right-0 py-4 lg:py-0 lg:static shadow-xl lg:shadow-none transition-transform
        duration-300 ease-in-out z-50 ${isFiltersOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0`}
        style={{ backgroundColor: primary_color }}
      >
        <NewsSidebarSection title="Par date" elements={newsByDate || []} />
        <NewsSidebarSection title="Par catégorie" elements={newsByCategory || []} />
        <FontAwesomeIcon icon={faXmark} className="ml-auto mr-2 lg:hidden" onClick={() => setIsFiltersOpen(false)} />
      </div>
    </>
  );
};

export default NewsSidebar;
