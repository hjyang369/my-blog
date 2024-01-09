import { SetterOrUpdater, useRecoilValue } from "recoil";
import { TAG_DATA } from "../../../modules/constants";
import Tag from "../../common/Tag";
import Button from "../../common/button";
import SearchBar from "../searchBar";
// import { likeFilterTitleState } from "../../../store/likeFilterStore";
import useInputValue from "../../../hooks/useInputValue";
import { Dispatch, useState } from "react";
import { SetStateAction } from "jotai";
import { savedPostState } from "../../../store/savePostStore";
import { filterText } from "../../../types/filter";

type selectedDateData = {
  startDate: string;
  lastDate: string;
};

type FilterModalProps = {
  handelModal?: Dispatch<SetStateAction<boolean>>;
  changeText: SetterOrUpdater<filterText>;
};

const initDate = {
  startDate: "",
  lastDate: "",
};

const initInputValue = {
  searchWord: "",
};

export default function FilterModal({
  handelModal,
  changeText,
}: FilterModalProps) {
  // const [filterTitle, setFilterTitle] = useRecoilState(likeFilterTitleState);
  const savedPosts = useRecoilValue(savedPostState);
  // const [filteredList, setFilteredList] = useState(savedPosts);
  const [selectedDate, setSelectedDate] = useState<selectedDateData>(initDate);
  const [selectedTag, setSelectedTag] = useState([]);
  const { inputValue, handleInput } = useInputValue(initInputValue);

  const selectDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSelectedDate({
      ...selectedDate,
      [name]: value,
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
    handelModal(false);
    changeText({
      dateTitle: {
        startDate: selectedDate.startDate,
        lastDate: selectedDate.lastDate,
      },
      tagTitle: selectedTag,
      contentTitle: inputValue.searchWord,
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
