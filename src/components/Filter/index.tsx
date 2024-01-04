import { TAG_DATA } from "../../modules/constants";
import Tag from "../common/Tag";
import Button from "../common/button";
import HoverButton from "../common/hoverButton";
import SearchBar from "./searchBar";

export default function FilterModal() {
  return (
    <div className="relative flex flex-col gap-4">
      <SearchBar />
      <div className="w-full flex justify-between gap-4 h-16 rounded-xl8  ">
        <input
          type="date"
          className="w-96 bg-yellow100 rounded-xl8 shadow-shadow100 p-4 text-xl"
        ></input>
        <p className="p-4 text-2xl">~</p>
        <input
          type="date"
          className="w-96  bg-yellow100 rounded-xl8 shadow-shadow100 p-4 text-xl"
        ></input>
      </div>
      <div className="flex flex-wrap gap-4 w-width60 ">
        {TAG_DATA.map((tag) => {
          return <Tag key={tag.id} tag={tag.tag} />;
        })}
      </div>
      <Button
        text={"필터 적용하기"}
        height={"4rem"}
        fontSize={"1.5rem"}
        backgroundColor={"#F7F5EA"}
        shadow={"rgba(0, 0, 0, 0.1) 0px 4px 12px"}
      />
    </div>
  );
}
