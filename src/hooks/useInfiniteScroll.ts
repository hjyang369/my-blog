import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = (data) => {
  const [page, setPage] = useState(0);
  // const [noMoreData, setNoMoreData] = useState(false);

  const loaderRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [loading, setLoading] = useState(false);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      setLoading(true);
      if (data.length > 0 && !loading) {
        setPage((prev) => prev + 1);
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
  }, [data]);

  return { page, loaderRef, loading, setLoading };
};

export default useInfiniteScroll;
