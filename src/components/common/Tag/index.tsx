import React from "react";
import style from "./tag.module.css";

type tagProps = {
  isWriting?: boolean;
  removeTag?: (idx: number) => void;
  selectTags?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  tag: string;
  tagId: number;
};

export default function Tag({
  isWriting,
  removeTag,
  selectTags,
  tag,
  tagId,
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
    >
      {tag}
      {isWriting && <p>x</p>}
    </button>
  );
}
