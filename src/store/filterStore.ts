import { atom } from "recoil";
import { filterText } from "../types/filter";

export const filterTitleState = atom<filterText>({
  key: "filterTitles",
  default: {
    dateTitle: {
      startDate: "",
      lastDate: "",
    },
    tagTitle: [],
    contentTitle: "",
  },
});
