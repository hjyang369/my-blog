import style from "./nav.module.css";
//
import { useRouter } from "next/router";
import Button from "../common/button";
import IC_User from "../../../public/icon/User";
import useMoveToPage from "../../hooks/useMovetoPage";
import IC_AddPost from "../../../public/icon/AddPost";
import IC_Like from "../../../public/icon/Like";

type NaveProps = {
  postWriting?: () => void;
  isWriting?: boolean;
};

export default function Nav({ postWriting, isWriting }: NaveProps) {
  const router = useRouter();

  const isResume = router.pathname === "/resume";
  const currentTab = isResume ? "블로그" : "이력서";
  const { moveToPage } = useMoveToPage();

  const handleCurrentTab = () => {
    if (isResume) {
      moveToPage("/");
    } else {
      moveToPage("/resume");
    }
  };

  return (
    <nav className="flex justify-between items-center h-16 w-width60">
      <button
        onClick={() => {
          moveToPage("/");
        }}
        className={style.logo}
      >
        MY BLOG
      </button>

      <div className="flex items-center gap-2">
        {isWriting ? (
          <Button
            text={"작성"}
            fontSize={"1.2rem"}
            onclick={postWriting}
            backgroundColor={"#f7f0d1"}
          />
        ) : (
          <Button
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
      </div>
    </nav>
  );
}
