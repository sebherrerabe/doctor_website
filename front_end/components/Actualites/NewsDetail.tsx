import { FC } from "react";
import { INews } from "../../types";
import NewsTag from "./NewsTag";
import { formatDjangoDate } from "../../utils/general";

const apiHost = process.env.API_HOST;

interface Props {
  newsDetail: INews;
}

const NewsDetail: FC<Props> = ({ newsDetail: { categories, author, content, date_published, description, image, title } }) => (
  <div className="col-span-4 pr-4 overflow-y-auto">
    {categories?.length > 0 && (
      <div className="w-full flex">
        {categories.map((category) => (
          <NewsTag tag={category as string} />
        ))}
      </div>
    )}
    <div className="w-full flex flex-col mt-4">
      <h1 className="text-3xl font-semibold mt-4">{title}</h1>
      <p className="text-xl mt-4">{description}</p>
      <p className="text-lg mt-4">
        Par <span className="font-bold">{author}</span>, le {formatDjangoDate(date_published)}
      </p>
      <div
        role="img"
        aria-label="image"
        className="w-full h-[34rem] mt-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${apiHost}${image})` }}
      />
      <div className="text-lg mt-8" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  </div>
);

export default NewsDetail;
