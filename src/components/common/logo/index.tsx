import useMoveToPage from "../../../hooks/useMovetoPage";

type logoProps = {
  text: string;
  subText?: string;
};

export default function Logo({ text, subText }: logoProps) {
  const { moveToPage } = useMoveToPage();
  const style =
    "text-main text-4xl font-black text-center border-0 bg-yellow200";
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => {
          moveToPage("/");
        }}
        className={style}
      >
        {text}
      </button>
      <span className={style}>{subText}</span>
    </div>
  );
}
