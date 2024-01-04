import IC_Search from "../../../../public/icon/Search";
import Tag from "../../common/Tag";
import Input from "../../common/input";

export default function SearchBar() {
  return (
    <div className="relative flex flex-col gap-4">
      <Input />
      <div className="absolute top-2 left-2">
        <IC_Search width="3rem" height="3rem" color="#f0b31e" />
      </div>
    </div>
  );
}
