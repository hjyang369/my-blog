type inputProps = {
  handleInput: any;
  name: string;
  width?: string;
};
export default function Input({ handleInput, name, width }: inputProps) {
  const haveWidth = width ? width : "w-width60";
  return (
    <input
      onChange={handleInput}
      name={name}
      className={`${haveWidth} h-16 rounded-xl8 bg-yellow100 shadow-shadow100 pl-16 text-2xl`}
    ></input>
  );
}
