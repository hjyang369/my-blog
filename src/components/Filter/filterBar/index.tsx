// import { useRecoilValue } from "recoil";
import Button from "../../common/button";
// import { likeFilterTitleState } from "../../../store/likeFilterStore";
import { filterText } from "../../../types/filter";

type FilterBarProps = {
  onclick: () => void;
  filterTitle: filterText;
};

export default function FilterBar({ onclick, filterTitle }: FilterBarProps) {
  // const filterTexts = useRecoilValue(likeFilterTitleState);

  const { dateTitle, tagTitle, contentTitle } = filterTitle;
  const { startDate, lastDate } = dateTitle;

  const newDateTitle = `${startDate ? `${startDate.replace(/-/g, "")} ~` : ""}${
    lastDate ? lastDate.replace(/-/g, "") : ""
  }`;

  const multipleTags = tagTitle.length >= 2;
  const newTagTitle = `${tagTitle[0] ? tagTitle[0] : "전체 태그"}${
    multipleTags ? `외 ${tagTitle.length - 1}개` : ""
  }`;

  const FILTER_BUTTON_DATA = [
    {
      id: 1,
      text: startDate ? newDateTitle : "전체 기간",
      hasValue: Boolean(startDate),
    },
    {
      id: 2,
      text: tagTitle.length > 0 ? newTagTitle : "전체 태그",
      hasValue: tagTitle.length > 0,
    },
    {
      id: 3,
      text: contentTitle ? contentTitle : "전체 내용",
      hasValue: Boolean(contentTitle),
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
