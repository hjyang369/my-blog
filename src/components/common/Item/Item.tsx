import style from "./item.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import IC_Like from "../../../../public/icon/Like";
import useHandleLike from "../../../hooks/useHandleLike";
import { PostDataType } from "../../../types/post";

type itemProps = {
  isLastItem: boolean;
  onFetchMore: () => void;
  moveToUserMain?: () => void;
  item: PostDataType;
};

export default function Item({
  isLastItem,
  onFetchMore,
  moveToUserMain,
  item,
}: itemProps) {
  const { id, title, content, author, hashTags, createdAt, like } = item;
  const data = {
    id,
    title,
    content,
    author,
    hashTags,
    createdAt,
    like,
  };

  const { isSaved, handleSavePost } = useHandleLike(data);

  const router = useRouter();

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;
  const plainText = content.replace(
    /(?<!\*)\*{2}(?!\*)|(?<!~)~{2}(?!~)|[_*\[\]#\(\)>-`]/g,
    ""
  );

  useEffect(() => {
    isLastItem && isIntersecting && onFetchMore();
  }, [isLastItem, isIntersecting]);

  return (
    <div ref={ref} className={style.item}>
      <img
        alt="임시대표이미지"
        src="./images/IMG_7631.jpg"
        className={style.mainImg}
      />
      {/* <img alt="대표이미지" src={img} className={style.mainImg} /> */}
      <div className={style.mainBox}>
        <div
          className={style.textBox}
          onClick={() => router.push(`/detail/${id}`)}
        >
          <h1 className={style.title}>{title}</h1>
          <p className={style.texts}>{plainText}</p>
        </div>

        <div className={style.authorData}>
          <button
            onClick={moveToUserMain}
            className="font-xl text-gray200 bg-yellow100"
          >
            {author}
          </button>
          <div className={style.heartBox} onClick={() => handleSavePost(id)}>
            <IC_Like width="2rem" height="2rem" isFill={isSaved} />

            {/* TODO 좋아요 db로 옮기면 추가 예정
            <p className={style.heartNum}>{heartNum}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
