import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { PostDataType } from "../types/post";
// import { useEffect, useState } from "react";

interface SavePostStore {
  articleList: PostDataType[];
  idList: number[];
  // addArticle: (val: PostDataType) => void;
  // removeArticle: (id: number) => void;
}
const localStorage =
  typeof window !== "undefined" ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
  converter: JSON,
});

export const idState = atom({
  key: "savedId",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const savedPostState = atom<PostDataType[]>({
  key: "savedPost",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

//ssr시 추가해야할 코드
// export function useSSR() {
//   const [isInitial, setIsInitial] = useState(true);
//   const [value, setValue] = useRecoilState(savedPostState);

//   useEffect(() => {
//     setIsInitial(false);
//   }, []);

//   return [isInitial ? defaultValue : value, setValue] as const;
// }
