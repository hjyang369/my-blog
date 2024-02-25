import Head from "next/head";
import style from "../styles/main.module.css";
import Item from "../components/common/Item/Item";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav/Nav";
import React from "react";
import { PostDataType } from "../types/post";
import { idState } from "../store/savePostStore";
import { useRecoilState, useRecoilValue } from "recoil";
import Filter from "../components/Filter";
import { mainFilterTitleState, mainSortState } from "../store/mainFilterStore";
import { getReady } from "../modules/function";
import { userState } from "../store/userStore";
import {
  dateFilterPost,
  getPostListFirebase,
  hashTagFilterPost,
  titleFilterPost,
} from "./api/post"; // FIREBASE
import { useQuery } from "@tanstack/react-query";

export default function Main() {
  const [itemListData, setItemListData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastItem, setIsLastItem] = useState(false);
  const [loading, setLoading] = useState(false);
  const idList = useRecoilState(idState);
  const [filterTitle, setFilterTitle] = useRecoilState(mainFilterTitleState);
  const { dateTitle, tagTitle, contentTitle } = filterTitle;
  const { startDate, lastDate } = dateTitle;
  const [currentSort, setCurrentSort] = useRecoilState(mainSortState);
  const user = useRecoilValue(userState); // 새로고침하더라고 지속적으로 user 정보가 저장되어있어야함

  const changeSort = (value: string) => {
    setItemListData([]);
    setCurrentSort(value);
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // const getPostList = async () => {
  //   setLoading(true);
  //   const apiUrl = `${baseUrl}/posts?size=10`;
  //   const haveTagTitle = tagTitle.length > 0;
  //   const onlyStartDate = startDate && !lastDate;
  //   const allDateFUll = startDate && lastDate;

  //   await axios
  //     .get(
  //       `${apiUrl}&page=${page}&sort=${currentSort}${
  //         contentTitle ? `&title=${contentTitle}` : ""
  //       }${onlyStartDate ? `&startDate=${startDate}` : ""}${
  //         allDateFUll ? `&startDate=${startDate}&endDate=${lastDate}` : ""
  //       }${haveTagTitle ? `&hashTags=${tagTitle}` : ""}
  //     `
  //     )
  //     .then((data) => {
  //       const newData: PostDataType[] = data.data.postResponses || [];
  //       if (newData.length === 0) {
  //         setLoading(false);
  //       } else {
  //         const UpdateData = newData.map((item) => {
  //           const isScraped = idList[0].includes(item?.id);
  //           return { ...item, like: isScraped };
  //         });
  //         return UpdateData;
  //         setItemListData((prevData) => [...prevData, ...UpdateData]);
  //         setLoading(false);
  //         data.data.isLast === true && setIsLastItem(true);
  //       }
  //     })

  //     .catch((error) => {
  //       if (error.response) {
  //         // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
  //         console.log(">", error.response.data);
  //         console.log(">>", error.response.status);
  //         console.log(">>>", error.response.headers);
  //       } else if (error.request) {
  //         // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
  //         // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
  //         // node.js에서는 http.ClientRequest 인스턴스입니다.
  //         console.log(error.request);
  //       } else {
  //         // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
  //         console.log("Error", error.message);
  //       }
  //       console.log(error.config);
  //     });
  // };

  // FIREBASE
  const getPostList = async () => {
    const data = await getPostListFirebase();
    setItemListData(data);
  };

  // const { data, isLoading, isError, isFetching } = useQuery({
  //   queryKey: [
  //     "posts",
  //     page,
  //     startDate,
  //     lastDate,
  //     tagTitle,
  //     contentTitle,
  //     currentSort,
  //   ],
  //   queryFn: () => getPostListFirebase(),
  //   staleTime: 6000,
  //   gcTime: 30000,
  // });
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error fetching data</div>;

  useEffect(() => {
    if (!startDate && !lastDate && tagTitle.length === 0 && !contentTitle) {
      !isLastItem && getPostList();
    }
  }, [page, currentSort]);

  const getFilteredPostList = async () => {
    let result;
    const start = startDate ? startDate : null;
    const end = lastDate ? lastDate : null;

    if (tagTitle[0]) {
      const hashTagFiltered: PostDataType[] = (await hashTagFilterPost(
        tagTitle[0],
        start,
        end
      )) as PostDataType[];
      result = hashTagFiltered;

      if (contentTitle) {
        result = hashTagFiltered.filter((post) =>
          post.post_title.toLowerCase().includes(contentTitle.toLowerCase())
        );
      }
    }
    if (!tagTitle[0] && contentTitle) {
      result = await titleFilterPost(contentTitle, start, end);
    }
    if (!tagTitle[0] && !contentTitle) {
      result = await dateFilterPost(start, end);
    }
    setItemListData(result);
  };

  useEffect(() => {
    if (startDate || lastDate || tagTitle.length > 0 || contentTitle) {
      getFilteredPostList();
    }
  }, [startDate, lastDate, tagTitle, contentTitle]);

  return (
    <>
      <Head>
        <title>my blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={style.main}>
        <Nav />
        <Filter
          filterTitle={filterTitle}
          changeText={setFilterTitle}
          changeSort={changeSort}
          resetData={setItemListData}
        />
        {!loading && itemListData.length === 0 ? (
          <div className="my-60 flex flex-col items-center gap-4 text-gray300">
            <div className="text-3xl">검색된 데이터가 없습니다.</div>
            <div className="text-3xl">다시 검색해주세요.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {itemListData.map((item, idx) => {
              return (
                <Item
                  key={item.post_id}
                  onFetchMore={() => setPage((prev) => prev + 1)}
                  isLastItem={itemListData.length - 1 === idx}
                  // moveToUserMain={() => moveToPage(`/${"username"}`)}
                  moveToUserMain={getReady}
                  item={item}
                />
              );
            })}
          </div>
        )}

        {!isLastItem && itemListData.length !== 0 && <div>loading</div>}
      </div>
    </>
  );
}
