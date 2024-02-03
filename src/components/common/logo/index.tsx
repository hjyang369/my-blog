import useMoveToPage from "../../../hooks/useMovetoPage";

export default function Logo({ text }) {
  const { moveToPage } = useMoveToPage();
  return (
    <button
      onClick={() => {
        moveToPage("/");
      }}
      className="text-main text-4xl font-black text-center border-0 bg-yellow200"
    >
      {text}
    </button>
  );
}
