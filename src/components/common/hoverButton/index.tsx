import style from "./style.module.css";

type buttonProps = {
  width: string | number;
  text: string;
  fontSize: string;
};

export default function HoverButton({ width, text, fontSize }: buttonProps) {
  return (
    <button
      className={style.button}
      style={{
        width: width,
        fontSize: fontSize,
      }}
    >
      {text}
    </button>
  );
}
