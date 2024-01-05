import { useRecoilState, useSetRecoilState } from "recoil";
import { TAG_DATA } from "../../../modules/constants";
import Tag from "../../common/Tag";
import Button from "../../common/button";
import SearchBar from "../searchBar";
import { filterTitleState } from "../../../store/filterStore";
import useInputValue from "../../../hooks/useInputValue";
import { Dispatch, useState } from "react";
import { SetStateAction } from "jotai";

type selectedDateData = {
  startDate: string;
  lastDate: string;
};

type FilterModalProps = {
  handelModal?: Dispatch<SetStateAction<boolean>>;
};

const initDate = {
  startDate: "",
  lastDate: "",
};

const initInputValue = {
  searchWord: "",
};

export default function FilterModal({ handelModal }: FilterModalProps) {
  const setFilterTitle = useSetRecoilState(filterTitleState);
  const [selectedDate, setSelectedDate] = useState<selectedDateData>(initDate);
  const [selectedTag, setSelectedTag] = useState([]);
  const { inputValue, setInputValue, handleInput } =
    useInputValue(initInputValue);

  const selectDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = value.replace(/-/g, "");
    setSelectedDate({
      ...selectedDate,
      [name]: newValue,
    });
  };

  const selectTags = (e) => {
    const tagValue = e.target.name;
    if (selectedTag.includes(tagValue)) {
      setSelectedTag(selectedTag.filter((ele) => ele !== tagValue));
    } else {
      setSelectedTag([...selectedTag, tagValue]);
    }
  };

  const getFilteredData = () => {
    const hasDate = selectedDate.startDate && selectedDate.lastDate;
    const newDateTitle =
      hasDate && `${selectedDate.startDate} ~ ${selectedDate.lastDate}`;

    const hasTag = selectedTag.length > 0;
    const multipleTags = selectedTag.length >= 2;
    const newTagTitle =
      hasTag &&
      selectedTag[0] + `${multipleTags && `외 ${selectedTag.length - 1}개`}`;

    const hasContent = inputValue.searchWord;
    const newContentTitle = hasContent && inputValue.searchWord;

    handelModal(false);
    setFilterTitle({
      dateTitle: newDateTitle,
      tagTitle: newTagTitle,
      contentTitle: newContentTitle,
    });
  };

  return (
    <div className="relative flex flex-col gap-4">
      <SearchBar name={"searchWord"} handleInput={handleInput} />
      <div className="w-full flex justify-between gap-4 h-16 rounded-xl8  ">
        <input
          onChange={selectDate}
          name="startDate"
          type="date"
          className="w-96 bg-yellow100 rounded-xl8 shadow-shadow100 p-4 text-xl"
        ></input>
        <p className="p-4 text-2xl">~</p>
        <input
          onChange={selectDate}
          name="lastDate"
          type="date"
          className="w-96 bg-yellow100 rounded-xl8 shadow-shadow100 p-4 text-xl"
        ></input>
      </div>
      <div className="flex flex-wrap gap-4 w-width60 ">
        {TAG_DATA.map((tag) => {
          return (
            <Tag
              key={tag.id}
              tag={tag.tag}
              tagId={tag.id}
              selectTags={selectTags}
              isSelect={selectedTag.includes(tag.tag)}
            />
          );
        })}
      </div>
      <Button
        text={"필터 적용하기"}
        height={"4rem"}
        fontSize={"1.5rem"}
        backgroundColor={"#F7F5EA"}
        shadow={"rgba(0, 0, 0, 0.1) 0px 4px 12px"}
        onclick={getFilteredData}
      />
    </div>
  );
}
