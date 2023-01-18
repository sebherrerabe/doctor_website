import { CSSProperties, FC, MouseEventHandler, ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  onClick: MouseEventHandler<HTMLDivElement>;
  className?: string;
  iconClassName?: string;
  style: CSSProperties;
  icon: IconProp;
  text?: string;
}

const ToolButton: FC<Props> = ({
  onClick,
  className = "fixed h-14 w-14 flex items-center justify-center text-3xl z-40 shadow-2xl mt-4 lg:hidden",
  iconClassName,
  style,
  icon,
  text,
}) => {
  return (
    <div className={className} style={style} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className={iconClassName} /> {text}
    </div>
  );
};

export default ToolButton;
