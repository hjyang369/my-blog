import ClickButton from "../../../components/common/clickButton";
import { getReady } from "../../../modules/function";
import style from "./comment.module.css";

// type commentProps = {
//   comment: {
//     id: number;
//     name: string;
//     text: string;
//     time: string;
//   };
// };
export default function Comment({ comment }) {
  return (
    <div className={style.container}>
      <div className={style.topContainer}>
        <div className={style.buttons}>
          <p className={style.name}>{comment?.comment_author}</p>
          <p>{comment?.createdAt}</p>
        </div>
        <div className={style.buttons}>
          <ClickButton text={"수정"} fontSize={"1.2rem"} onclick={getReady} />
          <ClickButton text={"삭제"} fontSize={"1.2rem"} onclick={getReady} />
        </div>
      </div>
      <p className={style.text}>{comment?.comment_contents}</p>
    </div>
  );
}
