import style from "./button.module.css";

type buttonProps = {
  width?: string | number;
  text: string;
  fontSize: string;
  color?: string;
  onclick?: () => void;
};

export default function Button({
  width,
  text,
  fontSize,
  color,
  onclick,
}: buttonProps) {
  return (
    <button
      className={style.button}
      onClick={onclick}
      style={{
        width: width,
        fontSize: fontSize,
        color: color,
      }}
    >
      {text}
    </button>
  );
}
