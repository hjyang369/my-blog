import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./item.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { savedPostState } from "../../../store/savePost";
import IC_Like from "../../../../public/icon/Like";
import { useRecoilState } from "recoil";

export default function Item({ isLastItem, onFetchMore, ...props }) {
  const [isSaved, setIsSaved] = useState(false);
  const [posts, setPosts] = useRecoilState(savedPostState);

  const router = useRouter();
  const { id, img, title, content, author, hashTags, createdAt } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    isLastItem && isIntersecting && onFetchMore();
  }, [isLastItem, isIntersecting]);

  const handleSavePost = (id: number) => {
    isSaved === true ? removePost(id) : savePost();
  };

  const savePost = () => {
    const newSavedPost = {
      id,
      // img,
      title,
      content,
      author,
      hashTags,
      createdAt,
      like: true,
    };

    setIsSaved(true);
    setPosts([...posts, newSavedPost]);
  };

  const removePost = (id: number) => {
    const updatedPosts = posts.filter((e: any) => e.id !== id);
    setPosts(updatedPosts);
    setIsSaved(false);
  };

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
          <p className={style.texts}>{content}</p>
        </div>

        <div className={style.authorData}>
          <p className={style.author}>{author}</p>
          <div className={style.heartBox} onClick={() => handleSavePost(id)}>
            <IC_Like width="2rem" height="2rem" isFill={isSaved} />

            {/* <p className={style.heartNum}>{heartNum}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
