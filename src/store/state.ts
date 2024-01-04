import { atom } from "recoil";

//예시!!
export interface IContentTypes {
  name: string;
  status: boolean;
  message: string;
}

//recoil state 생성
export const contentState = atom<IContentTypes>({
  key: "content",
  default: {
    name: "test",
    status: false,
    message: "",
  },
});
