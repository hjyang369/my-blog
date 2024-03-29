import { useRouter } from "next/router";
import IC_User from "../../../public/icon/User";
import useMoveToPage from "../../hooks/useMovetoPage";
import IC_AddPost from "../../../public/icon/AddPost";
import IC_Like from "../../../public/icon/Like";
import ClickButton from "../common/clickButton";
import Logo from "../common/logo";
import { logoutUser } from "../../pages/api/auth";
import { useRecoilState } from "recoil";
import { userState } from "../../store/userStore";
import { useState } from "react";

type NaveProps = {
  postWriting?: () => void;
  isWriting?: boolean;
};

export default function Nav({ postWriting, isWriting }: NaveProps) {
  const router = useRouter();
  const isResume = router.pathname === "/resume";
  const currentTab = isResume ? "블로그" : "이력서";
  const { moveToPage } = useMoveToPage();
  const [user, setUser] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useState(user.user_uid !== "");

  const handleCurrentTab = () => {
    if (isResume) {
      moveToPage("/");
    } else {
      moveToPage("/resume");
    }
  };

  const handleLogin = () => {
    if (isLogin) {
      //로그인 상태
      setIsLogin(false);
      logout();
    } else {
      //로그아웃 상태
      setIsLogin(true);
      moveToPage("/login");
    }
  };

  const logout = () => {
    const confirmation = window.confirm("로그아웃 하시겠습니까?");
    if (confirmation) {
      logoutUser().then(() => {
        setUser({
          user_email: "",
          user_nickname: "",
          user_uid: "",
        });
        moveToPage("/");
      });
    }
  };

  return (
    <nav className="flex justify-between items-center h-16 w-width60">
      {/* TODO user 생기면 user name 으로 로고 변경 */}
      <Logo text={"MY BLOG"} />

      <div className="flex items-center gap-2">
        {isWriting ? (
          <ClickButton
            text={"작성"}
            fontSize={"1.2rem"}
            onclick={postWriting}
            backgroundColor={"#f7f0d1"}
          />
        ) : (
          <ClickButton
            text={currentTab}
            fontSize={"1.2rem"}
            onclick={handleCurrentTab}
            backgroundColor={"#f7f0d1"}
          />
        )}

        <button
          onClick={() => moveToPage("/like")}
          className="bg-yellow200 p-2"
        >
          <IC_Like width="2.5rem" height="2.5rem" isFill={true} />
        </button>
        <button
          onClick={() => moveToPage("/writing")}
          className="bg-yellow200 p-2"
        >
          <IC_AddPost />
        </button>
        <button
          onClick={() => alert("서비스를 준비 중 입니다.")}
          className="bg-yellow200 p-2"
        >
          <IC_User />
        </button>
        <button
          onClick={handleLogin}
          suppressHydrationWarning={true}
          className="bg-yellow200 text-xl text-main font-bold"
        >
          {isLogin ? "logout" : "login"}
        </button>
      </div>
    </nav>
  );
}
