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
//

type postingDataType = {
  id: number;
  title: string;
  content: string;
  author: string;
  hashTags: [{ id: number; name: string }];
  createdAt: string;
};

const initialPostingData: postingDataType = {
  id: 0,
  title: "",
  content: "",
  author: "",
  hashTags: [{ id: 0, name: "" }],
  createdAt: "",
};

export default function Detail() {
  // const router = useRouter();
  // const { id } = router.query;
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // const [postingData, setPostingData] =
  //   useState<postingDataType>(initialPostingData);
  // // const { title, content, author, hashTags, createdAt } = postingData;
  const { title, content, author, hashTags, createdAt } = MOCK_DATA;

  // useEffect(() => {
  //   if (id) {
  //     axios
  //       .get(
  //         `${baseUrl}/post/${id}`

  //         // {
  //         //   Authorization: `Bearer ${"토큰"}`,
  //         // }
  //       )
  //       .then((data) => {
  //         if (data.status === 200) {
  //           setPostingData(data.data);
  //         } else if (data.status === 400) {
  //           alert("다시 확인해주세요.");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [id]);

  //지우기
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
                <Button width="5rem" text={"삭제"} fontSize={"1.4rem"} />
                <button>
                  <IC_Like width="2rem" height="2rem" isFill={false} />
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

const MOCK_DATA = {
  id: 102,
  img: "images/IMG_7631.jpg",
  title: "일이삼사오육칠팔구십일이삼사오육칠팔구십일",
  content:
    "훈장등의 영전은 이를 받은 자에게만 효력이 있고, 어떠한 특권도 이에 따르지 아니한다. 국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다. 모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다. 의원을 제명하려면 국회재적의원 3분의 2 이상의 찬성이 있어야 한다. 각급 선거관리위원회는 선거인명부의 작성등 선거사무와 국민투표사무에 관하여 관계 행정기관에 필요한 지시를 할 수 있다. 국토와 자원은 국가의 보호를 받으며, 국가는 그 균형있는 개발과 이용을 위하여 필요한 계획을 수립한다. 국무총리 또는 행정각부의 장은 소관사무에 관하여 법률이나 대통령령의 위임 또는 직권으로 총리령 또는 부령을 발할 수 있다.훈장등의 영전은 이를 받은 자에게만 효력이 있고, 어떠한 특권도 이에 따르지 아니한다. 국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다. 모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다. 의원을 제명하려면 국회재적의원 3분의 2 이상의 찬성이 있어야 한다. 각급 선거관리위원회는 선거인명부의 작성등 선거사무와 국민투표사무에 관하여 관계 행정기관에 필요한 지시를 할 수 있다. 국토와 자원은 국가의 보호를 받으며, 국가는 그 균형있는 개발과 이용을 위하여 필요한 계획을 수립한다. 국무총리 또는 행정각부의 장은 소관사무에 관하여 법률이나 대통령령의 위임 또는 직권으로 총리령 또는 부령을 발할 수 있다.",
  author: "일이삼사오",
  heartNum: 27,
  hashTags: [
    {
      id: 1,
      name: "해시",
    },
    {
      id: 2,
      name: "태그",
    },
    {
      id: 3,
      name: "입니다",
    },
  ],
  createdAt: "2023-12-25",
};
