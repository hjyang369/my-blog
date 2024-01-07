import { useState } from "react";
import FilterBar from "./filterBar";
import FilterModal from "./filterModal";

export default function Filter({}) {
  const [isSearch, setIsSearch] = useState(false);
  return (
    <div className="relative flex flex-col gap-4">
      <FilterBar onclick={() => setIsSearch(!isSearch)} />
      {isSearch && <FilterModal handelModal={setIsSearch} />}
    </div>
  );
}
