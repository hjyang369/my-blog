import style from "./writing.module.css";
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <nav className={style.nav}>
      <button className={style.btn}>
        <FontAwesomeIcon className={style.imgIcon} icon={faHouse} />
      </button>

      <div>
        <button onClick={postWriting} className={style.btn}>
          완료
        </button>
        <button className={style.btn}>
          <FontAwesomeIcon className={style.imgIcon} icon={faUser} />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
