import React from "react";

type tagProps = {
  removeTag?: (idx: number) => void;
  selectTags?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tag: string;
  tagId?: number;
  isSelect?: boolean;
  isWriting?: boolean;
};

export default function ClickTag({
  removeTag,
  selectTags,
  tag,
  tagId,
  isSelect,
  isWriting,
}: tagProps) {
  const addTag = (e) => {
    selectTags && selectTags(e);
  };

  const reactDelete = isWriting
    ? "hover:text-pink100 hover:border-pink100"
    : "";

  return (
    <button
      name={tag}
      onClick={(e) => addTag(e)}
      style={{
        backgroundColor: isSelect ? "#f0b31e" : "",
        color: isSelect ? "#fff" : "",
        borderColor: isSelect ? "#f0b31e" : "",
      }}
      className={`bg-yellow200 border border-solid border-bbb ${reactDelete} rounded-lg p-2 text-xl flex gap-2`}
    >
      {tag}
      {isWriting && (
        <p onClick={() => removeTag(tagId)} className="text-xl">
          x
        </p>
      )}
    </button>
  );
}
