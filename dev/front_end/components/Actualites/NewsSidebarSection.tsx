import { FC, useContext, useState } from "react";
import { IActiveState, ICategory } from "../../types";

import Accordeon from "./Accordeon";
import LayoutContext from "../../context/Context";

interface Props {
  title: string;
  elements: ICategory[];
}

const initiateState = (elements: ICategory[]): IActiveState =>
  elements.reduce((acc, curr) => ({ ...acc, [curr.name]: { isActive: false } }), {});

const NewsSidebarSection: FC<Props> = ({ title, elements }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { brand_color, primary_color } = siteSettings || {};

  const [activeState, setIsActive] = useState<IActiveState>(initiateState(elements));

  return (
    <div className="w-full overflow-y-auto">
      <div className="w-full flex items-center" style={{ backgroundColor: brand_color, color: primary_color }}>
        <h2 className="h-fit text-lg p-2 font-bold">{title}</h2>
      </div>
      {elements.map((element) => (
        <Accordeon
          key={element.name}
          title={element.name}
          isActive={activeState[element.name].isActive}
          setIsActive={setIsActive}
          name={element.name}
          news={element.news}
        />
      ))}
    </div>
  );
};

export default NewsSidebarSection;
