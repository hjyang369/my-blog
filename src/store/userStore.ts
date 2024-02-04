import { RecoilEnv, atom } from "recoil";
import { userType } from "../types/user";
import { recoilPersist } from "recoil-persist";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const localStorage =
  typeof window !== "undefined" ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
  converter: JSON,
});

export const userState = atom<userType>({
  key: "userData",
  default: {
    user_email: "",
    user_nickname: "",
    user_resume: "",
    user_uid: "",
  },
  effects_UNSTABLE: [persistAtom],
});
