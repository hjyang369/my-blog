import Head from "next/head";
import style from "./detail.module.css";
import axios from "axios";
import Nav from "../../components/Nav/Nav";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Tag from "../../components/common/Tag";
import CommentsList from "./commentsList";
import Button from "../../components/common/button";
import IC_Like from "../../../public/icon/Like";
import { useRecoilState } from "recoil";
import { idState } from "../../store/savePost";
import { PostDataType } from "../../types/post";
import useHandleLike from "../../hooks/useHandleLike";

const initialPostingData: PostDataType = {
  id: 0,
  title: "",
  content: "",
  author: "",
  hashTags: [{ id: 0, name: "" }],
  createdAt: "",
  like: false,
};

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const idList = useRecoilState(idState);

  const [postingData, setPostingData] =
    useState<PostDataType>(initialPostingData);
  const { title, content, author, hashTags, createdAt, like } = postingData;
  const { isSaved, setIsSaved, handleSavePost } = useHandleLike(postingData);

  useEffect(() => {
    if (id) {
      axios
        .get(
          `${baseUrl}/post/${id}`

          // {
          //   Authorization: `Bearer ${"토큰"}`,
          // }
        )
        .then((data) => {
          if (data.status === 200) {
            const newData = data.data;
            const isScraped = idList[0].includes(newData.id);
            const addLike = { ...newData, like: isScraped };
            setPostingData(addLike);
            setIsSaved(isScraped);
          } else if (data.status === 400) {
            alert("다시 확인해주세요.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const deletePost = () => {
    axios
      .delete(
        `${baseUrl}/post/${id}`

        // {
        //   Authorization: `Bearer ${"토큰"}`,
        // }
      )
      .then((data) => {
        if (data.status === 200) {
          alert("삭제되었습니다.");
          router.push("/");
        } else if (data.status === 400) {
          alert("다시 확인해주세요.");
        }
      })
      .catch((error) => {
        if (error.response) {
          // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
          console.log(">", error.response.data);
          console.log(">>", error.response.status);
          console.log(">>>", error.response.headers);
        } else if (error.request) {
          // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
          // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
          // node.js에서는 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <>
      <Head>
        <title>my blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={style.container}>
        <Nav onclick={null} />
        <div className={style.all}>
          <header className={style.titleContainer}>
            <h1 className={style.header}>{title}</h1>
            <div className={style.postData}>
              <p className={style.text}>@ {author}</p>
              <p className={style.text}>{createdAt.slice(0, 10)}</p>
            </div>
          </header>
          <main className={style.main}>
            <div className={style.buttons}>
              <div className={style.tagContainer}>
                {hashTags.length > 0 &&
                  hashTags.map((tag) => {
                    return <Tag key={tag.id} tag={tag.name} id={tag.id} />;
                  })}
              </div>
              <div className={style.tagContainer}>
                <Button width="5rem" text={"수정"} fontSize={"1.4rem"} />
                <Button
                  width="5rem"
                  text={"삭제"}
                  fontSize={"1.4rem"}
                  onclick={deletePost}
                />
                <button onClick={() => handleSavePost(Number(id))}>
                  <IC_Like width="2rem" height="2rem" isFill={isSaved} />
                </button>
              </div>
            </div>
            <article className={style.article}>{content}</article>
          </main>
        </div>
        <CommentsList />
      </div>
    </>
  );
}
