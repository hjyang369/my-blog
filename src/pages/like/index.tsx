import Head from "next/head";
import style from "../../styles/main.module.css";

import React, { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { idState, savedPostState } from "../../store/savePostStore";
import Nav from "../../components/Nav/Nav";
import Item from "../../components/common/Item/Item";
import Filter from "../../components/Filter";
import { filterTitleState } from "../../store/filterStore";

export default function Like() {
  const [filterTitle, setFilterTitle] = useRecoilState(filterTitleState);
  const { dateTitle, tagTitle, contentTitle } = filterTitle;
  const savedPosts = useRecoilValue(savedPostState);
  const [filteredList, setFilteredList] = useState(savedPosts);

  // const convertUTCtoKST = (utcDate: string | Date) => {
  //   return new Date(
  //     new Date(utcDate).toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  //   );
  // };

  function convertUTCtoKST(utcDate: string | Date) {
    const kor = new Date(utcDate);

    kor.setHours(kor.getHours() + 9);

    return kor.toLocaleString();
  }

  //like
  useEffect(() => {
    let filteredContent = [...savedPosts];

    if (contentTitle) {
      const lowerCaseTitle = contentTitle.toLowerCase();
      filteredContent = filteredContent.filter((post) =>
        post.title.toLowerCase().includes(lowerCaseTitle)
      );
    }
    if (tagTitle.length > 0) {
      filteredContent = filteredContent.filter((post) =>
        post.hashTags.some((tagObj) =>
          tagTitle.includes(tagObj.name.replace("#", ""))
        )
      );
    }
    if (dateTitle.startDate) {
      filteredContent = filteredContent.filter((post) => {
        const postDate = new Date(post.createdAt).getTime();
        const startDate = new Date(dateTitle.startDate).getTime();
        const lastDate = new Date(dateTitle.lastDate).getTime();
        // const lastDate = convertUTCtoKST(dateTitle.lastDate);
        console.log(
          postDate >= startDate,
          postDate,
          ">>",
          startDate,
          typeof postDate
        );
        console.log(post.createdAt);
        return postDate >= startDate || postDate <= lastDate;
      });
    }
    console.log(filteredContent);
    setFilteredList(filteredContent);
  }, [savedPosts, filterTitle]);
  return (
    <>
      <Head>
        <title>my blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={style.main}>
        <Nav onclick={null} />
        <Filter />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filteredList.map((item, idx) => {
            return (
              <Item
                onFetchMore={() => console.log(1)}
                isLastItem={filteredList.length - 1 === idx}
                key={item.id}
                {...item}
              />
            );
          })}
        </div>

        {/* {!isLastItem && <div>loading</div>} */}
      </div>
    </>
  );
}
