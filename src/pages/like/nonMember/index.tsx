import style from "../../../styles/main.module.css";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { savedPostState } from "../../../store/savePostStore";
import Item from "../../../components/common/Item/Item";
import {
  likeFilterTitleState,
  likeSortState,
} from "../../../store/likeFilterStore";
import useMoveToPage from "../../../hooks/useMovetoPage";
import ClickButton from "../../../components/common/clickButton";
import { getReady } from "../../../modules/function";
import Filter from "../../../components/Filter";

export default function NonMemberLike() {
  const [filterTitle, setFilterTitle] = useRecoilState(likeFilterTitleState);
  const { dateTitle, tagTitle, contentTitle } = filterTitle;
  const savedPosts = useRecoilValue(savedPostState);
  const [filteredList, setFilteredList] = useState(savedPosts);
  const [posts, setPosts] = useState(filteredList);
  const [page, setPage] = useState(10);
  const { moveToPage } = useMoveToPage();
  const [currentSort, setCurrentSort] = useRecoilState(likeSortState);

  function convertUTCtoKST(dateString) {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 9);
    return date;
  }

  useEffect(() => {
    setPosts(filteredList.slice(0, page));
  }, [filteredList, page]);

  useEffect(() => {
    const arr = [...savedPosts];
    let filteredContent = arr.reverse();
    if (currentSort === "asc") {
      filteredContent.reverse();
    }
    if (contentTitle) {
      const lowerCaseTitle = contentTitle.toLowerCase();
      filteredContent = filteredContent.filter((post) =>
        post.post_title.toLowerCase().includes(lowerCaseTitle)
      );
    }
    if (tagTitle.length > 0) {
      filteredContent = filteredContent.filter((post) =>
        post.hashTagsName?.includes(`#${tagTitle[0]}`)
      );
    }
    if (dateTitle.startDate && !dateTitle.lastDate) {
      const startDate = new Date(dateTitle.startDate + "T00:00:00+09:00");

      filteredContent = filteredContent.filter((post) => {
        const postDate = convertUTCtoKST(post.createdAt);
        return postDate >= startDate;
      });
    } else if (dateTitle.startDate && dateTitle.lastDate) {
      const startDate = new Date(dateTitle.startDate + "T00:00:00+09:00");
      const lastDate = new Date(dateTitle.lastDate + "T23:59:59+09:00");

      filteredContent = filteredContent.filter((post) => {
        const postDate = convertUTCtoKST(post.createdAt);
        return postDate >= startDate && postDate <= lastDate;
      });
    }

    setFilteredList(filteredContent);
  }, [savedPosts, filterTitle, currentSort]);

  return (
    <>
      <div className={style.main}>
        <Filter
          filterTitle={filterTitle}
          changeText={setFilterTitle}
          changeSort={setCurrentSort}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {savedPosts.length > 0 ? (
            posts.map((item, idx) => {
              return (
                <Item
                  key={item.post_id}
                  onFetchMore={() => setPage((prev) => prev + 10)}
                  isLastItem={posts.length - 1 === idx}
                  // moveToUserMain={() => moveToPage(`/${"username"}`)}
                  moveToUserMain={getReady}
                  item={item}
                />
              );
            })
          ) : (
            <div className="m-40 flex flex-col gap-10">
              <p className="text-4xl text-gray200">좋아요한 글이 없습니다.</p>
              <ClickButton
                text={"좋아요하러 가기"}
                fontSize={"1.5rem"}
                onclick={() => moveToPage("/")}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
