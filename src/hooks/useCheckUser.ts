import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logoutUser } from "../pages/api/auth";
import useMoveToPage from "./useMovetoPage";

const useCheckUser = () => {
  const { moveToPage } = useMoveToPage();

  const auth = getAuth();
  const user = auth.currentUser;

  const isLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자 로그인 시 동작
        console.log(user.uid);
        return;
      }
      // 사용자 로그아웃 시 동작
      console.log("logout");
      logoutUser();
      moveToPage("/login");
    });
  };

  return { isLoggedIn };
};

export default useCheckUser;
