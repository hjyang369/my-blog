import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Image from "next/image";
import style from "./item.module.css";

export default function Item({ img, title, content, author, heartNum }) {
  return (
    <div className={style.item}>
      <img alt="대표이미지" src={img} className={style.mainImg} />
      <div className={style.mainBox}>
        <div className={style.textBox}>
          <h1 className={style.title}>{title}</h1>
          <p className={style.texts}>{content}</p>
        </div>

        <div className={style.authorData}>
          <p className={style.author}>{author}</p>
          <div className={style.heartBox}>
            <FontAwesomeIcon icon={faHeart} className={style.icon} />
            <p className={style.heartNum}>{heartNum}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
