import { Dispatch, FC, SetStateAction, useContext } from "react";
import { IActiveState, INews } from "../types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutContext from "../context/Context";
import Link from "next/link";
import capitalize from "../utils/capitalize";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import truncateString from "../utils/truncateString";

interface Props {
  name: string;
  title: string;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<IActiveState>>;
  news: INews[];
}

const Accordeon: FC<Props> = ({ name, title, isActive, setIsActive, news }) => {
  const { siteSettings } = useContext(LayoutContext) || {};
  const { brand_color } = siteSettings || {};

  const onClick = () =>
    setIsActive((prevState) => ({ ...prevState, [name]: { ...prevState[name], isActive: !prevState[name].isActive } }));

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between p-2 cursor-pointer" onClick={onClick}>
        <span className="font-semibold">{capitalize(title)}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-sm transition-transform duration-300 ease-in-out ${isActive ? "rotate-180" : ""}`}
        />
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-h-screen" : "max-h-0"}`}>
        <ul>
          {news.map((news) => (
            <li className="py-2 px-4 flex w-full" key={news.id}>
              <Link href={`/news/${news.id}`} style={{ color: brand_color }}>
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
