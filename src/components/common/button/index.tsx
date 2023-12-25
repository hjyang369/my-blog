import style from "./button.module.css";

type buttonProps = {
  width?: string | number;
  text: string;
  fontSize: string;
  color?: string;
};

export default function Button({ width, text, fontSize, color }: buttonProps) {
  return (
    <button
      className={style.button}
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
