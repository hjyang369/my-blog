import { RecoilEnv, atom } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export interface IContentTypes {
  name: string;
  status: boolean;
  message: string;
}

export const contentState = atom<IContentTypes>({
  key: "navModal",
  default: {
    name: "test",
    status: false,
    message: "",
  },
});
