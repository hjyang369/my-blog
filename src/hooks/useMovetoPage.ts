import { useRouter } from "next/router";

const useMoveToPage = () => {
  const router = useRouter();

  const moveToPage = (paths) => {
    router.push(paths);
  };

  return { moveToPage };
};

export default useMoveToPage;
