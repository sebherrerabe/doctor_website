import { Dispatch, FC, SetStateAction } from "react";

import { IActualites } from "../../types";
import NewsCard from "./NewsCard";
import { getNewsList } from "../../utils/fetchData";

interface Props {
  newsPagination: IActualites;
  setNewsPagination: Dispatch<SetStateAction<IActualites>>;
}

const NewsList: FC<Props> = ({ newsPagination, setNewsPagination }) => {
  const handleScroll = async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight && newsPagination.next) {
      const newNews = await getNewsList({ page: newsPagination.page + 1 });
      setNewsPagination((prev) => ({
        ...prev,
        results: [...prev.results, ...newNews.results],
        next: newNews.next,
        page: prev.page + 1,
      }));
    }
  };

  return (
    <div
      className="col-span-4 pr-4 overflow-y-scroll grid auto-rows-[minmax(6rem,1fr)] grid-cols-3 gap-8"
      onScroll={handleScroll}
    >
      {newsPagination.results.map((newsEl, idx) =>
        idx === 0 ? (
          <div className="w-full row-span-4 col-span-3 flex overflow-hidden" key={newsEl.slug}>
            <NewsCard
              news={newsEl}
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              titleClassName="p-2 text-2xl font-bold w-fit"
              dateClassName="p-2 text-base w-fit mt-2"
              titleMaxLength={120}
              descriptionMaxLength={500}
              infoContainerClassName="h-1/2 w-full p-4 flex flex-col justify-end"
            />
          </div>
        ) : (
          <div className="row-span-2 flex overflow-hidden" key={newsEl.slug}>
            <NewsCard
              news={newsEl}
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              titleClassName="p-2 text-base font-bold w-fit"
              dateClassName="p-2 text-sm w-fit mt-2"
            />
          </div>
        )
      )}
    </div>
  );
};

export default NewsList;
