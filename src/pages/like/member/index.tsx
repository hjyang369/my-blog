import style from "../../../styles/main.module.css";
import React, { useState } from "react";
import Item from "../../../components/common/Item/Item";

import ClickButton from "../../../components/common/clickButton";
import { getReady } from "../../../modules/function";
import { useRouter } from "next/router";

export default function MemberLike() {
  const savedPosts = [];
  const router = useRouter();
  const [page, setPage] = useState(10);

  return (
    <>
      <div className={style.main}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {savedPosts.length > 0 ? (
            savedPosts.map((item, idx) => {
              return (
                <Item
                  key={item.id}
                  onFetchMore={() => setPage((prev) => prev + 10)}
                  isLastItem={savedPosts.length - 1 === idx}
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
                onclick={() => router.push("/")}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
