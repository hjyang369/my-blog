type buttonProps = {
  width?: string | number;
  height?: string | number;
  text: string;
  fontSize: string;
  color?: string;
  onclick?: () => void;
  backgroundColor?: string;
  shadow?: string;
};

export default function Button({
  width,
  height,
  text,
  fontSize,
  color,
  onclick,
  backgroundColor,
  shadow,
}: buttonProps) {
  return (
    <button
      className="text-3xl  p-2 bg-white rounded-lg text-main font-bold"
      onClick={onclick}
      style={{
        width: width,
        height: height,
        fontSize: fontSize,
        color: color,
        backgroundColor: `${backgroundColor && backgroundColor}`,
        boxShadow: `${shadow && shadow}`,
      }}
    >
      {text}
    </button>
  );
}
