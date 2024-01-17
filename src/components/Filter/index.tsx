import { useState } from "react";
import FilterBar from "./filterBar";
import FilterModal from "./filterModal";
import { filterText } from "../../types/filter";
import { SetterOrUpdater } from "recoil";

type FilterProps = {
  filterTitle: filterText;
  changeText: SetterOrUpdater<filterText>;
  changeSort: SetterOrUpdater<string>;
};

export default function Filter({
  filterTitle,
  changeText,
  changeSort,
}: FilterProps) {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div className="relative flex flex-col gap-4">
      <FilterBar
        onclick={() => setIsSearch(!isSearch)}
        filterTitle={filterTitle}
        changeSort={changeSort}
      />
      {isSearch && (
        <FilterModal handelModal={setIsSearch} changeText={changeText} />
      )}
    </div>
  );
}
