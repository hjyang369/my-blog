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
        console.log(user.uid);
        return;
      }
      // 사용자 로그아웃 시 동작
      console.log("logout");
      logoutUser().then(() => {
        setUser({
          user_email: "",
          user_nickname: "",
          user_uid: "",
        });
      });

      const confirmation = window.confirm(
        "로그인 기간이 만료되었습니다. 다시 로그인 하시겠습니까?"
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
