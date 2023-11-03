import Head from "next/head";
import { Inter } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import style from "./writing.module.css";
import useInputValue from "@/hooks/useInputValue";
import { useRouter } from "next/router";
import {
  faAlignJustify,
  faBold,
  faItalic,
  faPalette,
  faTextHeight,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
//

const inter = Inter({ subsets: ["latin"] });

const Writing = () => {
  const initInputValue = {
    title: "",
    texts: "",
    tag: "",
    author: "",
  };

  const { inputValue, handleInput } = useInputValue(initInputValue);
  const router = useRouter();

  const postWriting = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/post`,
        {
          title: inputValue.title,
          texts: inputValue.texts,
          author: inputValue.author,
          tags: a,
        }
        // {
        //   Authorization: `Bearer ${"토큰"}`,
        // }
      )
      .then((data) => {
        if (data.status === 200) {
          alert("글 작성 완료");
          router.push("/");
        } else if (data.status === 400) {
          // alert("아이디 또는 비밀번호 다시 확인해주세요.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>my blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={style.main}>
        <div className={style.mainContainer}>
          <input
            name="title"
            placeholder="제목"
            className={style.inputs}
            onChange={handleInput}
          ></input>
          <textarea
            name="texts"
            className={style.texts}
            placeholder="내용을 입력해주세요."
            onChange={handleInput}
          ></textarea>
          <input
            name="tag"
            className={style.inputs}
            placeholder="태그를 입력해보세요."
            onChange={handleInput}
          ></input>
          <input
            name="author"
            className={style.inputs}
            placeholder="작성자이름"
            onChange={handleInput}
          ></input>
        </div>

        <div className={style.IconContainer}>
          <label htmlFor="file" className={style.textsIconBox}>
            <FontAwesomeIcon className={style.textsIcon} icon={faImage} />
          </label>
          <input id="file" type="file" className={style.file}></input>
          <label className={style.textsIconBox}>
            <FontAwesomeIcon className={style.textsIcon} icon={faTextHeight} />
          </label>
          <label className={style.textsIconBox}>
            <FontAwesomeIcon className={style.textsIcon} icon={faUnderline} />
          </label>

          <label className={style.textsIconBox}>
            <FontAwesomeIcon className={style.textsIcon} icon={faItalic} />
          </label>
          <label className={style.textsIconBox}>
            <FontAwesomeIcon className={style.textsIcon} icon={faBold} />
          </label>
          <label className={style.textsIconBox}>
            <FontAwesomeIcon
              className={style.textsIcon}
              icon={faAlignJustify}
            />
          </label>
          <label className={style.textsIconBox}>
            <FontAwesomeIcon className={style.textsIcon} icon={faPalette} />
          </label>
        </div>
      </main>
    </>
  );
};

export default Writing;
