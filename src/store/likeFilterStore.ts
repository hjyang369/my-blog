import { atom } from "recoil";
import { filterText } from "../types/filter";

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
