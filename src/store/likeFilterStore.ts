import { RecoilEnv, atom } from "recoil";
import { filterText } from "../types/filter";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const likeFilterTitleState = atom<filterText>({
  key: "likeFilterTitles",
  default: {
    dateTitle: {
      startDate: "",
      lastDate: "",
    },
    tagTitle: [],
    contentTitle: "",
  },
});

export const likeSortState = atom({
  key: "likeSort",
  default: "desc",
});
