import { useRecoilState } from "recoil";
import IC_Search from "../../../../public/icon/Search";
import Tag from "../../common/Tag";
import Button from "../../common/button";
import Input from "../../common/input";
import { filterTitleState } from "../../../store/filterStore";

export default function FilterBar() {
  const [filterText, setFilterText] = useRecoilState(filterTitleState);
  const changeFilterTitle = (e) => {
    setFilterText;
  };

  return (
    <div className="relative w-width60 flex justify-between gap-4">
      <select className="w-1/4 rounded-lg p-4 text-xl">
        <option>최신순</option>
        <option>옛날순</option>
      </select>
      {FILTER_BUTTON_DATA.map((data) => {
        return (
          <Button
            key={data.id}
            text={data.text}
            fontSize={"1.25rem"}
            width={"25%"}
            height={"4rem"}
            // onclick={(e) => changeFilterTitle(e)}
          />
        );
      })}
    </div>
  );
}

const FILTER_BUTTON_DATA = [
  { id: 1, text: "전체 기간" },
  { id: 2, text: "전체 태그" },
  { id: 3, text: "전체 내용" },
];
