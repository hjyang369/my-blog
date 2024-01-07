export default function Input({ handleInput, name }) {
  return (
    <input
      onChange={handleInput}
      name={name}
      className="w-width60 h-16 rounded-xl8 bg-yellow100 shadow-shadow100 pl-16 text-2xl"
    ></input>
  );
}
