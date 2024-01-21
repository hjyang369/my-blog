import Head from "next/head";
import style from "../styles/main.module.css";
import Item from "../components/common/Item/Item";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav/Nav";
import React from "react";
import { PostDataType } from "../types/post";
import { idState } from "../store/savePostStore";
import { useRecoilState } from "recoil";
import Filter from "../components/Filter";
import { mainFilterTitleState, mainSortState } from "../store/mainFilterStore";
import useMoveToPage from "../hooks/useMovetoPage";
import { getReady } from "../modules/function";

export default function UserMain() {
  const [itemListData, setItemListData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastItem, setIsLastItem] = useState(false);
  const [loading, setLoading] = useState(false);
  const idList = useRecoilState(idState);
  const [filterTitle, setFilterTitle] = useRecoilState(mainFilterTitleState);
  const { dateTitle, tagTitle, contentTitle } = filterTitle;
  const { startDate, lastDate } = dateTitle;
  const [currentSort, setCurrentSort] = useRecoilState(mainSortState);
  const { moveToPage } = useMoveToPage();

  const changeSort = (value: string) => {
    setItemListData([]);
    setCurrentSort(value);
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const getPostList = async () => {
    setLoading(true);
    const apiUrl = `${baseUrl}/posts/${"userName"}?size=10`;
    const haveTagTitle = tagTitle.length > 0;
    const onlyStartDate = startDate && !lastDate;
    const allDateFUll = startDate && lastDate;

    await axios
      .get(
        `${apiUrl}&page=${page}&sort=${currentSort}${
          contentTitle ? `&title=${contentTitle}` : ""
        }${
          onlyStartDate ? `&startDate=${startDate}&endDate=${startDate}` : ""
        }${allDateFUll ? `&startDate=${startDate}&endDate=${lastDate}` : ""}${
          haveTagTitle ? `&hashTags=${tagTitle}` : ""
        }
      `
      )
      .then((data) => {
        const newData: PostDataType[] = data.data.postResponses || [];
        const UpdateData = newData.map((item) => {
          const isScraped = idList[0].includes(item?.id);
          return { ...item, like: isScraped };
        });

        setItemListData((prevData) => [...prevData, ...UpdateData]);
        setLoading(false);
        data.data.isLast === true && setIsLastItem(true);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    !isLastItem && getPostList();
  }, [page, filterTitle, currentSort]);

  return (
    <>
      <Head>
        <title>my blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={style.main}>
        {/* TODO user 생기면 user name 으로 로고 변경 */}
        <Nav />
        <Filter
          filterTitle={filterTitle}
          changeText={setFilterTitle}
          changeSort={changeSort}
          resetData={setItemListData}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {itemListData.map((item, idx) => {
            return (
              <Item
                key={item.id}
                onFetchMore={() => setPage((prev) => prev + 1)}
                isLastItem={itemListData.length - 1 === idx}
                // moveToUserMain={() => moveToPage(`/${"username"}`)}
                moveToUserMain={getReady}
                item={item}
              />
            );
          })}
        </div>

        {!isLastItem && <div>loading</div>}
      </div>
    </>
  );
}
