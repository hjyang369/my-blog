import { RecoilEnv, atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { PostDataType } from "../types/post";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

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
