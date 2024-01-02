import style from "./nav.module.css";
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import IC_Search from "../../../public/icon/Search";
import { useState } from "react";
import Button from "../common/button";
import HoverButton from "../common/hoverButton";

export default function Nav({ onclick }) {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("이력서");

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
        <HoverButton
          text={currentTab}
          fontSize={"1.2rem"}
          onclick={handleCurrentTab}
          backgroundColor={"#f7f0d1"}
        />
        {/* <button className={style.btn}>
          <FontAwesomeIcon className={style.imgIcon} icon={faUser} />
        </button> */}
        <button className={style.iconBtn}>
          <IC_Search width="3rem" height="3rem" color="#f0b31e" />
        </button>
        <button className={style.btn}>
          <FontAwesomeIcon
            onClick={
              onclick !== null
                ? onclick
                : () => {
                    moveToPage("/writing");
                  }
            }
            className={style.imgIcon}
            icon={faPenToSquare}
          />
        </button>
      </div>
    </nav>
  );
}
