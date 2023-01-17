import { FC } from "react";
import Link from "next/link";

interface Props {
  name?: string;
  brand_color?: string;
}

const getTextSize = (idx: number) => {
  switch (idx) {
    case 0:
      return "text-sm lg:text-base";
    case 1:
      return "text-lg lg:text-2xl";
    case 2:
      return "text-xl lg:text-3xl";
    default:
      return "";
  }
};

const Logo: FC<Props> = ({ name, brand_color }) => {
  const splittedName = name?.split(" ") || [];

  return (
    <Link href="/">
      <div className="flex items-center w-fit">
        <div className="h-16 w-16 lg:h-24 lg:w-24 mr-2 grid grid-rows-3">
          <div className="w-full grid grid-cols-3">
            <div />
            <div style={{ backgroundColor: brand_color }} />
            <div />
          </div>
          <div className="w-full grid grid-cols-3">
            <div className="col-span-3" style={{ backgroundColor: brand_color }} />
          </div>
          <div className="w-full grid grid-cols-3">
            <div />
            <div style={{ backgroundColor: brand_color }} />
            <div />
          </div>
        </div>
        <div className="flex flex-col h-full justify-between">
          {splittedName.map((word, idx) => (
            <span
              className={getTextSize(idx)}
              key={idx}
              style={{ color: idx === splittedName.length - 1 ? brand_color : undefined }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Logo;
