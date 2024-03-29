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
  const changeBackgroundColor = backgroundColor ? backgroundColor : "bg-white";
  return (
    <button
      className={`text-3xl p-2 ${changeBackgroundColor} rounded-lg text-main font-bold transition-colors duration-300 ease-in hover:bg-main hover:text-white`}
      onClick={onclick}
      style={{
        width: width,
        height: height,
        fontSize: fontSize,
        boxShadow: `${shadow && shadow}`,
      }}
    >
      {text}
    </button>
  );
}
