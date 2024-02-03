export default function BlackButton({ text, onclick }) {
  return (
    <button onClick={onclick} className="bg-yellow200 text-lg">
      {text}
    </button>
  );
}
