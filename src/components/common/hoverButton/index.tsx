import style from "./style.module.css";

type buttonProps = {
  width?: string | number;
  text: string;
  fontSize: string;
  onclick?: () => void;
  backgroundColor?: string;
};

export default function HoverButton({
  width,
  text,
  fontSize,
  onclick,
  backgroundColor,
}: buttonProps) {
  return (
    <button
      className={style.button}
      onClick={onclick}
      style={{
        width: width,
        fontSize: fontSize,
        backgroundColor: `${backgroundColor && backgroundColor}`,
      }}
    >
      {text}
    </button>
  );
}
