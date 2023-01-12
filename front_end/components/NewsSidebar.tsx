import { useContext } from "react";
import LayoutContext from "../context/Context";
import NewsContext from "../context/NewsContext";
import NewsSidebarSection from "./NewsSidebarSection";

const NewsSidebar = () => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { newsByCategory, newsByDate } = useContext(NewsContext) || {};
  const { primary_color } = siteSettings || {};
  return (
    <div className="h-full grid grid-rows-2 overflow-auto" style={{ backgroundColor: primary_color }}>
      <NewsSidebarSection title="Par date" elements={newsByDate || []} />
      <NewsSidebarSection title="Par catégorie" elements={newsByCategory || []} />
    </div>
  );
};

export default NewsSidebar;
