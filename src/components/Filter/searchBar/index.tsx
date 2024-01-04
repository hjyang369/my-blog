import IC_Search from "../../../../public/icon/Search";
import useInputValue from "../../../hooks/useInputValue";
import Input from "../../common/input";

type SearchBarProps = {
  handleInput: () => void;
  name: string;
};

export default function SearchBar({ handleInput, name }) {
  return (
    <div className="relative flex flex-col gap-4">
      <Input handleInput={handleInput} name={name} />
      <div className="absolute top-2 left-2">
        <IC_Search width="3rem" height="3rem" color="#f0b31e" />
      </div>
    </div>
  );
}
