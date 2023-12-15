import React from "react";
import style from "./tag.module.css";

type tagProps = {
  isWriting?: (idx: number) => void;
  tag: string;
  id: number;
};

export default function Tag({ isWriting, tag, id }: tagProps) {
  return (
    <div className={style.tags} onClick={() => isWriting(id)}>
      <p className={style.tagContent}>{tag}</p>
      {isWriting && <p>x</p>}
    </div>
  );
}
