import Head from "next/head";
import useInputValue from "../../hooks/useInputValue";
import { useRouter } from "next/router";
import axios from "axios";
import Nav from "../../components/Nav/Nav";
import { useEffect, useState } from "react";
import React from "react";
import Tag from "../../components/common/Tag";
import { PostDataType, WritingInputValueType } from "../../types/post";
//

const initInputValue: WritingInputValueType = {
  title: "",
  texts: "",
  tag: "",
  author: "",
};
const initialPostingData: PostDataType = {
  id: 0,
  title: "",
  content: "",
  author: "",
  hashTags: [{ id: 0, name: "" }],
  createdAt: "",
  like: false,
};

export default function Writing() {
  const { inputValue, setInputValue, handleInput } =
    useInputValue(initInputValue);
  const [postingData, setPostingData] =
    useState<PostDataType>(initialPostingData);
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (id) {
      axios
        .get(
          `${baseUrl}/post/${id}`

          // {
          //   Authorization: `Bearer ${"토큰"}`,
          // }
        )
        .then((data) => {
          if (data.status === 200) {
            setPostingData(data.data);
          } else if (data.status === 400) {
            alert("다시 확인해주세요.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const editPost = () => {
    axios
      .post(
        `${baseUrl}/post`,
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
    const completedTag = "#" + inputValue.tag;

    if (e.key === "Enter" && inputValue.tag !== "") {
      if (tags.length < 3) {
        if (!tags.includes(completedTag)) {
          setTags([...tags, completedTag]);
          setInputValue({ ...inputValue, tag: "" });
        } else {
          alert("중복된 태그입니다.");
          setInputValue({ ...inputValue, tag: "" });
        }
      } else if (tags.length >= 3) {
        alert("태그는 최대 3개만 작성할 수 있어요.");
        setInputValue({ ...inputValue, tag: "" });
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const removeTag = (idx) => {
    const confirmation = window.confirm("태그를 삭제하시겠습니까?");

    if (confirmation) {
      const updatedTags = tags.filter((_, i) => i !== idx);
      setTags(updatedTags);
    }
  };

  return (
    <>
      <Head>
        <title>my blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid place-items-center gap-4 p-4">
        <Nav postWriting={editPost} isWriting />
        <div className="grid w-width60">
          <input
            name="title"
            placeholder="제목"
            maxLength={20}
            minLength={0}
            required
            onChange={handleInput}
            className="p-8 my-4 mx-0 h-8 border border-solid border-white rounded-lg text-2xl shadow-shadow200"
          ></input>
          <textarea
            name="texts"
            minLength={10}
            required
            placeholder="내용을 입력해주세요."
            onChange={handleInput}
            className="h-height40 resize-none overflow-x-hidden overflow-y-scroll border border-solid border-white rounded-xl8 p-8 text-2xl shadow-shadow200"
          ></textarea>
          <form
            typeof="submit"
            onSubmit={handleFormSubmit}
            className="p-8 my-4 mx-0 h-8 border border-solid border-white rounded-lg text-2xl shadow-shadow200 flex items-center gap-2 bg-white"
          >
            {tags.map((tag, idx) => {
              return (
                <Tag
                  key={idx}
                  isWriting
                  removeTag={removeTag}
                  tag={tag}
                  tagId={idx}
                />
              );
            })}

            <input
              type="text"
              className="border-0 focus:outline-none"
              name="tag"
              placeholder={tags.length < 3 ? "태그를 입력해보세요." : ""}
              required
              onChange={(e) => handleInput(e)}
              onKeyUp={(e) => makeTag(e)}
              value={inputValue.tag}
            ></input>
          </form>
          {/* <input
            name="author"
            placeholder="작성자이름"
            required
            minLength={1}
            onChange={handleInput}
            className="p-8 my-4 mx-0 h-8 border border-solid border-white rounded-lg text-2xl shadow-shadow200"
          ></input> */}
        </div>
      </main>
    </>
  );
}