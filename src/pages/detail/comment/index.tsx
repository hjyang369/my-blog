import Button from "../../../components/common/button";
import style from "./comment.module.css";

type commentProps = {
  comment: {
    id: number;
    name: string;
    text: string;
    time: string;
  };
};
export default function Comment({ comment }: commentProps) {
  return (
    <div className={style.container}>
      <div className={style.topContainer}>
        <div className={style.buttons}>
          <p className={style.name}>{comment?.name}</p>
          <p>{comment.time}</p>
        </div>
        <div className={style.buttons}>
          <Button text={"수정"} fontSize={"1.2rem"} />
          <Button text={"삭제"} fontSize={"1.2rem"} />
        </div>
      </div>
      <p className={style.text}>{comment.text}</p>
    </div>
  );
}
