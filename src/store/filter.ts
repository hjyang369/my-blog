import { atom } from "recoil";
import { filterText } from "../types/filter";

export const filterTitleState = atom<filterText>({
  key: "filterTitle",
  default: {
    sortTitle: "최신순",
    dateTitle: "",
    tagTitle: "",
    contentTitle: "",
  },
});
