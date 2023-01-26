import { FC } from "react";
import { IImage } from "../../types";
import Image from "next/image";
import { handleImageUrl } from "../../utils/general";

interface Props {
  image: IImage | null;
  secondary_color?: string;
}

const PageImage: FC<Props> = ({ image, secondary_color }) => (
  <div>
    <div
      className="w-full md:w-1/2 lg:w-full h-[28rem] relative md:mx-auto"
      style={{ border: `0.5rem solid ${secondary_color || ""}` }}
    >
      <Image src={handleImageUrl(image?.image)} alt={image?.alt || ""} fill className="-z-10 object-cover" />
    </div>
  </div>
);

export default PageImage;
