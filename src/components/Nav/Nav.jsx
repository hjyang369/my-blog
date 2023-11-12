import style from "./nav.module.css";
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function Nav({ onclick }) {
  const router = useRouter();

  const moveToPage = (paths) => {
    router.push(paths);
  };

  return (
    <nav className={style.nav}>
      <button className={style.btn}>
        <FontAwesomeIcon className={style.imgIcon} icon={faUser} />
      </button>
      <button
        onClick={() => {
          moveToPage("/");
        }}
        className={style.logo}
      >
        MY BLOG
      </button>
      <div>
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
