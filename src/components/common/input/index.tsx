type inputProps = {
  handleInput: (e: any) => void;
  name: string;
  type: string;
  width?: string;
};
export default function Input({ handleInput, name, width, type }: inputProps) {
  const haveWidth = width ? width : "w-width60";
  return (
    <input
      onChange={handleInput}
      name={name}
      type={type}
      className={`${haveWidth} h-16 rounded-xl8 bg-yellow100 shadow-shadow100 pl-16 text-2xl focus:outline-none`}
    ></input>
  );
}
