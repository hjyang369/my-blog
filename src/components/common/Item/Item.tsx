import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./item.module.css";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

export default function Item({ isLastItem, onFetchMore, ...props }) {
  const router = useRouter();
  const { id, img, title, content, author, heartNum } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    isLastItem && isIntersecting && onFetchMore();
  }, [isLastItem, isIntersecting]);

  return (
    <div
      ref={ref}
      className={style.item}
      onClick={() => router.push(`/detail/${id}`)}
    >
      <img
        alt="임시대표이미지"
        src="./images/IMG_7631.jpg"
        className={style.mainImg}
      />
      {/* <img alt="대표이미지" src={img} className={style.mainImg} /> */}
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
