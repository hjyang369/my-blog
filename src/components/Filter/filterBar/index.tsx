import { useRecoilState, useRecoilValue } from "recoil";
import IC_Search from "../../../../public/icon/Search";
import Tag from "../../common/Tag";
import Button from "../../common/button";
import Input from "../../common/input";
import { filterTitleState } from "../../../store/filterStore";
import { MouseEventHandler } from "react";

type FilterBarProps = {
  onclick: () => void;
};

export default function FilterBar({ onclick }: FilterBarProps) {
  const filterText = useRecoilValue(filterTitleState);
  console.log(filterText);

  const FILTER_BUTTON_DATA = [
    {
      id: 1,
      text: filterText.dateTitle ? filterText.dateTitle : "전체 기간",
      hasValue: filterText.dateTitle,
    },
    {
      id: 2,
      text: filterText.tagTitle ? filterText.tagTitle : "전체 태그",
      hasValue: filterText.tagTitle,
    },
    {
      id: 3,
      text: filterText.contentTitle ? filterText.contentTitle : "전체 내용",
      hasValue: filterText.contentTitle,
    },
  ];

  return (
    <div
      onClick={onclick}
      className="relative w-width60 flex justify-between gap-4"
    >
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
            color={data.hasValue ? "" : "#65717b"}
            // onclick={(e) => changeFilterTitle(e)}
          />
        );
      })}
    </div>
  );
}
