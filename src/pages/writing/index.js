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
  faHouse,
  faItalic,
  faPalette,
  faTextHeight,
  faUnderline,
  faUser,
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

  //연락해서 스웨거 여는법 다시 물어보기
  //태그 혹시 지금부터 넣으시냐고 물어보기
  //바뀐 유아이 다시 보여주기
  //css 수정
  //그리드 및 아이콘 적용ㅜ

  const postWriting = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/apis/signup`,
        {
          title: inputValue.title,
          texts: inputValue.texts,
          author: inputValue.author,
        }
        // {
        //   Authorization: `Bearer ${"토큰"}`,
        // }
      )
      .then((data) => {
        if (data.status === 200) {
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
      <div className={style.main}>
        <nav className={style.nav}>
          <button className={style.btn}>
            <FontAwesomeIcon className={style.imgIcon} icon={faHouse} />
          </button>

          <div>
            <button onClick={postWriting} className={style.btn}>
              완료
            </button>
            <button className={style.btn}>
              <FontAwesomeIcon className={style.imgIcon} icon={faUser} />
            </button>
          </div>
        </nav>
        <main className={style.mainContainer}>
          <input
            name="title"
            placeholder="제목"
            className={style.title}
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
            className={style.title}
            placeholder="태그를 입력해보세요."
            onChange={handleInput}
          ></input>
          <input
            name="author"
            className={style.title}
            placeholder="작성자이름"
            onChange={handleInput}
          ></input>
          <div className={style.navCenter}>
            <select className={style.select}>
              <option defaultValue>카테고리</option>
              <option>여행</option>
              <option>개발</option>
              <option>요리</option>
            </select>
            <label htmlFor="file">
              <FontAwesomeIcon className={style.imgIcon} icon={faImage} />
            </label>
            <input id="file" type="file" className={style.file}></input>
            <FontAwesomeIcon className={style.imgIcon} icon={faTextHeight} />
            <FontAwesomeIcon className={style.imgIcon} icon={faUnderline} />
            <FontAwesomeIcon className={style.imgIcon} icon={faItalic} />
            <FontAwesomeIcon className={style.imgIcon} icon={faBold} />
            <FontAwesomeIcon className={style.imgIcon} icon={faAlignJustify} />
            <FontAwesomeIcon className={style.imgIcon} icon={faPalette} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Writing;
