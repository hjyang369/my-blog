import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import style from "./writing.module.css";
import useInputValue from "../../hooks/useInputValue";
import { useRouter } from "next/router";
import {
  faAlignJustify,
  faBold,
  faItalic,
  faPalette,
  faTextHeight,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Nav from "../../components/Nav/Nav";
import { useState } from "react";
import React from "react";
import Tag from "../../components/common/Tag";
//

type inputValueType = {
  title: string;
  texts: string;
  tag: string;
  author: string;
};

export default function Writing() {
  const initInputValue: inputValueType = {
    title: "",
    texts: "",
    tag: "",
    author: "",
  };

  const { inputValue, setInputValue, handleInput } =
    useInputValue(initInputValue);
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();

  const postWriting = () => {
    axios
      .post(
        // `${process.env.NEXT_PUBLIC_BASE_URL}/post`,
        "http://falsystack.jp:8080/post",
        {
          title: inputValue.title,
          content: inputValue.texts,
          author: inputValue.author,
          hashTags: tags.join(""),
        }
        // {
        //   Authorization: `Bearer ${"토큰"}`,
        // }
      )
      .then((data) => {
        if (data.status === 200) {
          router.push("/");
        } else if (data.status === 400) {
          alert("다시 확인해주세요.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const titleValid =
    inputValue.title.length > 0 && inputValue.title.length <= 20;
  const textsValid = inputValue.texts.length > 10;
  const authorValid = inputValue.author.length > 0;
  const postValid = titleValid && textsValid && authorValid;

  const makeTag = (e) => {
    if (e.key === "Enter" && inputValue.tag !== "") {
      if (tags.length < 3 && !tags.includes(inputValue.tag)) {
        setTags([...tags, "#" + inputValue.tag]);
        setInputValue({ ...inputValue, tag: "" });
      } else if (tags.length >= 3) {
        alert("태그는 최대 3개만 작성할 수 있어요.");
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const removeTag = (idx) => {
    const updatedTags = tags.filter((_, i) => i !== idx);
    setTags(updatedTags);
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
        <Nav onclick={postWriting} />
        <div className={style.mainContainer}>
          <input
            name="title"
            placeholder="제목"
            maxLength={20}
            minLength={0}
            required
            className={style.inputs}
            onChange={handleInput}
          ></input>
          <textarea
            name="texts"
            className={style.texts}
            minLength={10}
            required
            placeholder="내용을 입력해주세요."
            onChange={handleInput}
          ></textarea>
          <form
            className={style.formInputs}
            typeof="submit"
            onSubmit={handleFormSubmit}
          >
            {tags.map((tag, idx) => {
              return <Tag key={idx} isWriting={removeTag} tag={tag} id={idx} />;
            })}

            <input
              type="text"
              className={style.tagInput}
              name="tag"
              placeholder={tags.length < 3 ? "태그를 입력해보세요." : ""}
              required
              onChange={(e) => handleInput(e)}
              onKeyUp={(e) => makeTag(e)}
              value={inputValue.tag}
            ></input>
          </form>
          <input
            name="author"
            className={style.inputs}
            placeholder="작성자이름"
            required
            minLength={1}
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
}
