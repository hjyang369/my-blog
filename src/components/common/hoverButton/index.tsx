import style from "./style.module.css";

type buttonProps = {
  width?: string | number;
  height?: string | number;
  text: string;
  fontSize: string;
  onclick?: () => void;
  backgroundColor?: string;
  shadow?: string;
};

export default function HoverButton({
  width,
  height,
  text,
  fontSize,
  onclick,
  backgroundColor,
  shadow,
}: buttonProps) {
  return (
    <button
      className={style.button}
      onClick={onclick}
      style={{
        width: width,
        height: height,
        fontSize: fontSize,
        backgroundColor: `${backgroundColor && backgroundColor}`,
        boxShadow: `${shadow && shadow}`,
      }}
    >
      {text}
    </button>
  );
}
