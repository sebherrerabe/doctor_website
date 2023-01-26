import { Dispatch, FC, SetStateAction, useCallback, useRef, useState } from "react";

import { IActualites } from "../../types";
import NewsCard from "./NewsCard";
import { getNewsList } from "../../utils/fetchData";

interface Props {
  newsPagination: IActualites;
  setNewsPagination: Dispatch<SetStateAction<IActualites>>;
}

const NewsList: FC<Props> = ({ newsPagination, setNewsPagination }) => {
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef<IntersectionObserver>();
  const lastNewsElRef = useCallback(
    (node: HTMLAnchorElement) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && newsPagination.next) {
          setIsFetching(true);
          const newNews = await getNewsList({ page: newsPagination.page + 1, env: "client" });
          setNewsPagination((prev) => ({
            ...prev,
            results: [...prev.results, ...newNews.results],
            next: newNews.next,
            page: prev.page + 1,
          }));
          setIsFetching(false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, newsPagination.next, setNewsPagination, newsPagination.page]
  );
  return (
    <div className="col-span-4 lg:pr-4 overflow-y-scroll grid lg:auto-rows-[minmax(6rem,1fr)] grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
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
              ref={idx === newsPagination.results.length - 1 ? lastNewsElRef : undefined}
            />
          </div>
        )
      )}
    </div>
  );
};

export default NewsList;
