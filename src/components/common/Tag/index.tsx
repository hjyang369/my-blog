import React from "react";
import style from "./tag.module.css";

type tagProps = {
  isWriting?: boolean;
  removeTag?: (idx: number) => void;
  selectTags?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  tag: string;
  tagId: number;
  isSelect?: boolean;
};

export default function Tag({
  isWriting,
  removeTag,
  selectTags,
  tag,
  tagId,
  isSelect,
}: tagProps) {
  const handleTag = (e, id) => {
    removeTag && removeTag(id);
    selectTags && selectTags(e);
    return;
  };

  return (
    <button
      name={tag}
      className={style.tags}
      onClick={(e) => handleTag(e, tagId)}
      style={{
        backgroundColor: isSelect ? "#f0b31e" : "",
        color: isSelect ? "#fff" : "",
        borderColor: isSelect ? "#f0b31e" : "",
      }}
    >
      {tag}
      {isWriting && <p>x</p>}
    </button>
  );
}
