import Head from "next/head";
import style from "../styles/main.module.css";
import Item from "../components/common/Item/Item";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav/Nav";
import React from "react";

export default function Main() {
  const [itemListData, setItemListData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const getPostList = async () => {
    setLoading(true);
    await axios
      .get(`${baseUrl}/posts?page=${page}&size=10`)
      .then((data) => {
        setItemListData((prevData) => [...prevData, ...data.data]);
        // setPage((prev) => prev + 1);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isLastItem = itemListData.length === 100;

  useEffect(() => {
    !isLastItem && getPostList();
  }, [page]);

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
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {itemListData.map((item, idx) => {
            return (
              <Item
                onFetchMore={() => setPage((prev) => prev + 1)}
                isLastItem={itemListData.length - 1 === idx}
                key={item.id}
                // id={item.id}
                // img={item.img}
                // title={item.title}
                // content={item.content}
                // author={item.author}
                // heartNum={item.heartNum}
                {...item}
              />
            );
          })}
        </div>

        {/* {itemListData.length > 0 && loading ? (
          <div ref={ref}>스크롤 loading ...</div>
        ) : (
          <div>loading</div>
        )} */}
      </div>
    </>
  );
}
