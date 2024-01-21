import React from "react";

type tagProps = {
  tag: string;
  isSelect?: boolean;
};

export default function Tag({ tag, isSelect }: tagProps) {
  return (
    <button
      name={tag}
      className={`bg-yellow200 border border-solid border-bbb rounded-lg p-2 text-lg cursor-default`}
      style={{
        backgroundColor: isSelect ? "#f0b31e" : "",
        color: isSelect ? "#fff" : "",
        borderColor: isSelect ? "#f0b31e" : "",
      }}
    >
      {tag}
    </button>
  );
}
