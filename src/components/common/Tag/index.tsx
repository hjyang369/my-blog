import React from "react";
import style from "./tag.module.css";

type tagProps = {
  onclick?: (idx: number) => void;
  tag: string;
  id?: number;
  totalNumber?: number;
};

export default function Tag({ isWriting, tag, id, totalNumber }: tagProps) {
  return (
    <div className={style.tags} onClick={() => isWriting(id)}>
      <p className={style.tagContent}># {tag}</p>
      {isWriting && <p>x</p>}
      {totalNumber && <p>( {totalNumber} )</p>}
    </div>
  );
}
