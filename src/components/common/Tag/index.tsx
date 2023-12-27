import React from "react";
import style from "./tag.module.css";

type tagProps = {
  onclick?: (idx: number) => void;
  tag: string;
  id: number;
};

export default function Tag({ onclick, tag, id }: tagProps) {
  return (
    <div className={style.tags} onClick={() => onclick(id)}>
      <p className={style.tagContent}>{tag}</p>
      {onclick !== undefined && <p className={style.tagContent}>x</p>}
    </div>
  );
}
