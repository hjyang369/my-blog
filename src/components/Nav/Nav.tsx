import style from "./nav.module.css";
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import IC_Search from "../../../public/icon/Search";
import { useState } from "react";
import Button from "../common/button";
import HoverButton from "../common/hoverButton";
import IC_Language from "../../../public/icon/Language";
import IC_User from "../../../public/icon/User";
import UserModal from "./userModal";

type NaveProps = {
  postWriting: () => void;
  isWriting?: boolean;
};

export default function Nav({ postWriting, isWriting }: NaveProps) {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("이력서");
  const [isOpen, setIsOpen] = useState(false);

  const moveToPage = (paths) => {
    router.push(paths);
  };

  const handleCurrentTab = () => {
    if (currentTab === "블로그") {
      setCurrentTab("이력서");
      moveToPage("/");
    } else {
      setCurrentTab("블로그");
      moveToPage("/resume");
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between align-middle h-16 w-width60">
      <button
        onClick={() => {
          moveToPage("/");
        }}
        className={style.logo}
      >
        MY BLOG
      </button>

      <div className="flex align-middle">
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

        <div className="relative flex flex-col align-middle w-14">
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
