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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const getPostList = async () => {
    setLoading(true);
    const apiUrl = `${baseUrl}/posts?size=10`;
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
        <Nav />
        <Filter
          filterTitle={filterTitle}
          changeText={setFilterTitle}
          changeSort={setCurrentSort}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {itemListData.map((item, idx) => {
            return (
              <Item
                onFetchMore={() => setPage((prev) => prev + 1)}
                isLastItem={itemListData.length - 1 === idx}
                key={item.id}
                {...item}
              />
            );
          })}
        </div>

        {!isLastItem && <div>loading</div>}
      </div>
    </>
  );
}
