import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logoutUser } from "../pages/api/auth";
import useMoveToPage from "./useMovetoPage";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/userStore";

const useCheckUser = () => {
  const setUser = useSetRecoilState(userState);
  const { moveToPage } = useMoveToPage();

  const auth = getAuth();
  const user = auth.currentUser;

  const isLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자 로그인 되어있을 시 동작
        return user.uid;
      }
      // 사용자 로그아웃 시 동작
      logoutUser().then(() => {
        setUser({
          user_email: "",
          user_nickname: "",
          user_uid: "",
        });
      });

      const confirmation = window.confirm(
        "로그인이 필요한 페이지입니다. 로그인을 해주세요."
      );

      if (confirmation) {
        moveToPage("/login");
      } else {
        moveToPage("/");
      }
    });
  };

  return { isLoggedIn };
};

export default useCheckUser;
