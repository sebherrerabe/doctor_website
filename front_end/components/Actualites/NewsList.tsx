import { Dispatch, FC, SetStateAction, UIEventHandler, useCallback, useEffect } from "react";

import { IActualites } from "../../types";
import NewsCard from "./NewsCard";
import { getNewsList } from "../../utils/fetchData";
import useScreenSize from "../../hooks/useScreenSize";

interface Props {
  newsPagination: IActualites;
  setNewsPagination: Dispatch<SetStateAction<IActualites>>;
}

const NewsList: FC<Props> = ({ newsPagination, setNewsPagination }) => {
  const screenSize = useScreenSize();
  const handleScroll = useCallback(
    async ({ scrollTop, scrollHeight, clientHeight }: { scrollTop: number; scrollHeight: number; clientHeight: number }) => {
      if (scrollTop + clientHeight >= scrollHeight && newsPagination.next) {
        const newNews = await getNewsList({ page: newsPagination.page + 1 });
        setNewsPagination((prev) => ({
          ...prev,
          results: [...prev.results, ...newNews.results],
          next: newNews.next,
          page: prev.page + 1,
        }));
      }
    },
    [newsPagination, setNewsPagination]
  );

  useEffect(() => {
    const handleWindowScroll = () => handleScroll(document.documentElement);
    if (screenSize < 1024) window.addEventListener("scroll", handleWindowScroll);
    return () => (screenSize < 1024 ? window.removeEventListener("scroll", handleWindowScroll) : undefined);
  }, [screenSize, newsPagination, setNewsPagination, handleScroll]);
  return (
    <div
      className="col-span-4 lg:pr-4 overflow-y-scroll grid lg:auto-rows-[minmax(6rem,1fr)] grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8"
      onScroll={screenSize >= 1024 ? (e) => handleScroll(e.currentTarget) : undefined}
    >
      {newsPagination.results.map((newsEl, idx) =>
        idx === 0 ? (
          <div
            className="aspect-square md:aspect-video lg:aspect-auto lg:row-span-4 lg:col-span-3 col-span-2 flex overflow-hidden"
            key={newsEl.slug}
          >
            <NewsCard
              news={newsEl}
              className="h-full w-full relative"
              titleClassName="text-xl md:text-2xl font-bold w-fit"
              dateClassName="p-2 text-sm md:text-base w-fit mt-2"
              titleMaxLength={120}
              descriptionMaxLength={500}
              infoContainerClassName="h-1/2 w-full p-4 flex flex-col justify-end"
            />
          </div>
        ) : (
          <div className="aspect-square md:aspect-video lg:aspect-auto lg:row-span-2 flex overflow-hidden" key={newsEl.slug}>
            <NewsCard
              news={newsEl}
              className="h-full w-full relative"
              titleClassName="text-sm md:text-base font-bold w-fit"
              dateClassName="p-2 text-xs md:text-sm w-fit mt-2"
            />
          </div>
        )
      )}
    </div>
  );
};

export default NewsList;
