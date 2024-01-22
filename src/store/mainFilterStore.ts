import { RecoilEnv, atom } from "recoil";
import { filterText } from "../types/filter";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const mainFilterTitleState = atom<filterText>({
  key: "mainFilterTitles",
  default: {
    dateTitle: {
      startDate: "",
      lastDate: "",
    },
    tagTitle: [],
    contentTitle: "",
  },
});

export const mainSortState = atom({
  key: "mainSort",
  default: "desc",
});
