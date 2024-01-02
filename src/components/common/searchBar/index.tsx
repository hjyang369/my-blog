import IC_Search from "../../../../public/icon/Search";
import Tag from "../Tag";
import Input from "../input";

export default function SearchBar() {
  return (
    <div className="relative flex flex-col gap-4">
      <Input />
      <div className="absolute top-2 left-2">
        <IC_Search width="3rem" height="3rem" color="#f0b31e" />
      </div>
      <div className="flex flex-wrap gap-4 w-width60 ">
        {TAG_DATA.map((tag) => {
          return <Tag key={tag.id} tag={tag.tag} totalNumber={tag.totalNum} />;
        })}
      </div>
    </div>
  );
}

const TAG_DATA = [
  { id: 1, tag: "spring", totalNum: 26 },
  { id: 2, tag: "자바스크립트", totalNum: 20 },
  { id: 3, tag: "타입스크립트", totalNum: 16 },
  { id: 4, tag: "리액트", totalNum: 96 },
  { id: 5, tag: "넥스트", totalNum: 6 },
  { id: 6, tag: "tailwind", totalNum: 21 },
  { id: 7, tag: "sql", totalNum: 36 },
  { id: 8, tag: "firebase", totalNum: 40 },
  { id: 9, tag: "java", totalNum: 26 },
  { id: 10, tag: "scss", totalNum: 216 },
];
