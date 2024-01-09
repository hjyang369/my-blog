import style from "./nav.module.css";
//
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../common/button";
import IC_Language from "../../../public/icon/Language";
import IC_User from "../../../public/icon/User";
import UserModal from "./userModal";
import useMoveToPage from "../../hooks/useMovetoPage";

type NaveProps = {
  postWriting?: () => void;
  isWriting?: boolean;
};

export default function Nav({ postWriting, isWriting }: NaveProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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

  const handleModal = () => {
    setIsOpen(!isOpen);
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

      <div className="flex items-center">
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

        <div className="relative flex flex-col items-center w-14">
          <button onClick={handleModal} className={style.iconBtn}>
            <IC_User />
          </button>
          {isOpen && <UserModal handleModal={setIsOpen} />}
        </div>
        <button className={style.iconBtn}>
          <IC_Language />
        </button>
      </div>
    </nav>
  );
}
