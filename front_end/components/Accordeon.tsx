import { Dispatch, FC, SetStateAction, useContext } from "react";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import LayoutContext from "../context/Context";
import { IActiveState, INews } from "../types";
import truncateString from "../utils/truncateString";

interface Props {
  slug: string;
  title: string;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<IActiveState>>;
  news: INews[];
}

const Accordeon: FC<Props> = ({ slug, title, isActive, setIsActive, news }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { brand_color } = siteSettings || {};
  
  const onClick = () =>
    setIsActive((prevState) => ({ ...prevState, [slug]: { ...prevState[slug], isActive: !prevState[slug].isActive } }));

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between p-2 cursor-pointer" onClick={onClick}>
        <span className="font-semibold">{title}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-sm transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
        />
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${isActive ? "max-h-screen" : "max-h-0"}`}>
        <ul>
          {news.map((news) => (
            <li className="py-2 px-4 flex w-full">
              <Link href={`/news/${news.id}`} key={news.id} style={{ color: brand_color }}>
                {truncateString(news.title, 35)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accordeon;
