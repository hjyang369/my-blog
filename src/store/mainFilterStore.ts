import { atom } from "recoil";
import { filterText } from "../types/filter";

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
