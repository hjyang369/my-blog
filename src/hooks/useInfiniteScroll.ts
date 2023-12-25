import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = (data) => {
  // const [page, setPage] = useState(1);
  // const [noMoreData, setNoMoreData] = useState(false);
  const page = useRef(1);

  const loaderRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [loading, setLoading] = useState(false);

  const handleObserver = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      await setLoading(true);
      await setLoading(false);

      if (data.length > 0) {
        page.current += 1;
      }
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (loaderRef.current) {
      observer.current.observe(loaderRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [data, page.current]);

  return { page, loaderRef, loading, setLoading };
};

export default useInfiniteScroll;
