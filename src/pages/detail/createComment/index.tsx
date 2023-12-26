import HoverButton from "../../../components/common/hoverButton";
import style from "./style.module.css";

export default function CreateComment() {
  return (
    <div className={style.container}>
      <div className={style.userContainer}>
        <input className={style.input} placeholder="이름"></input>
        <input className={style.input} placeholder="비밀번호"></input>
      </div>
      <textarea
        className={style.textarea}
        placeholder="소중한 의견 감사합니다~!!"
      ></textarea>
      <div className={style.buttonContainer}>
        <HoverButton width="10rem" text={"등록"} fontSize={"1.5rem"} />
      </div>
    </div>
  );
}
