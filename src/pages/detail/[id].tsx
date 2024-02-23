import Head from "next/head";
import style from "./detail.module.css";
import Nav from "../../components/Nav/Nav";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Tag from "../../components/common/Tag";
import CommentsList from "./commentsList";
import IC_Like from "../../../public/icon/Like";
import { useRecoilValue } from "recoil";
import { idState } from "../../store/savePostStore";
import { PostDataType } from "../../types/post";
import useHandleLike from "../../hooks/useHandleLike";
import useMoveToPage from "../../hooks/useMovetoPage";
import ClickButton from "../../components/common/clickButton";
import dynamic from "next/dynamic";
import { removePost, getPost, getPostListFirebase } from "../api/post"; // FIREBASE
// import { getCommentList } from "../api/comment";

const initialPostingData: PostDataType = {
  post_id: "",
  post_title: "",
  post_content: "",
  post_author: "",
  hashTags: [],
  createdAt: null,
  like: false,
};

const Markdown = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

export default function Detail({ item }) {
  const router = useRouter();
  const { id } = router.query;
  const idList = useRecoilValue(idState);
  const { moveToPage } = useMoveToPage();

  const [postingData, setPostingData] =
    useState<PostDataType>(initialPostingData);
  const {
    post_id,
    post_title,
    post_content,
    post_author,
    hashTags,
    createdAt,
    like,
  } = postingData;
  const { isSaved, setIsSaved, handleSavePost } = useHandleLike(postingData);
  const changeDate = new Date(createdAt);
  const formattedDate = `${changeDate.getFullYear()}-${(
    changeDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${changeDate.getDate().toString().padStart(2, "0")}`;

  useEffect(() => {
    const isScraped = idList.includes(item.id);
    const addLike = { ...item, like: isScraped };
    setPostingData(addLike);
    setIsSaved(isScraped);
  }, []);

  const deletePost = (postId) => {
    removePost(postId)
      .then(() => moveToPage("/"))
      .catch(() => alert("다시 시도해주세요."));
  };

  // 댓글 csr
  const [commentList, setCommentList] = useState([]);

  // const getddd = async (id) => {
  //   const commentList = await getCommentList(id);
  //   const comments = commentList.map((comment) => ({
  //     ...comment,
  //     createdAt: comment["createdAt"].toString(),
  //     updatedAt: comment["createdAt"].toString(),
  //   }));
  //   setCommentList(comments);
  // };
  // useEffect(() => {
  //   getddd(id);
  // }, []);

  return (
    <>
      <Head>
        <title>my blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={style.container}>
        <Nav />
        <div className={style.all}>
          <header className={style.titleContainer}>
            <h1 className={style.header}>{post_title}</h1>
            <div className={style.postData}>
              <p className={style.text}>@ {post_author}</p>
              <p className={style.text}>{formattedDate}</p>
            </div>
          </header>
          <main className={style.main}>
            <div className={style.buttons}>
              <div className={style.tagContainer}>
                {hashTags.length > 0 &&
                  hashTags.map((tag, idx) => {
                    return <Tag key={idx} tag={tag} />;
                  })}
              </div>
              <div className={style.tagContainer}>
                <ClickButton
                  width="5rem"
                  text={"수정"}
                  fontSize={"1.4rem"}
                  onclick={() => moveToPage(`/edit/${id}`)}
                />
                <ClickButton
                  width="5rem"
                  text={"삭제"}
                  fontSize={"1.4rem"}
                  onclick={() => deletePost(post_id)}
                />
                <button onClick={() => handleSavePost(post_id)}>
                  <IC_Like width="2rem" height="2rem" isFill={isSaved} />
                </button>
              </div>
            </div>
            <div data-color-mode="dark">
              <Markdown source={post_content} />
            </div>
          </main>
        </div>
        <CommentsList commentList={commentList} />
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  const res = await getPostListFirebase();
  const paths = res.map((post) => ({
    params: { id: post.post_id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async (context) => {
  try {
    const id = context.params.id;
    const data = await getPost(id); // FIREBASE
    const itemsWithSerializedDate = {
      ...data,
      createdAt: data["createdAt"].toString(),
      updatedAt: data["createdAt"].toString(),
    };
    // const commentList = await getCommentList(id);
    // const comments = commentList.map((comment) => ({
    //   ...comment,
    //   createdAt: comment["createdAt"].toString(),
    //   updatedAt: comment["createdAt"].toString(),
    // }));

    return {
      props: { item: itemsWithSerializedDate },
      revalidate: 3600,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
//ssr 비교
// export const getServerSideProps = async (context) => {
//   try {
//     const id = context.params.id;
//     const data = await getPost(id); // FIREBASE
//     const itemsWithSerializedDate = {
//       ...data,
//       createdAt: data["createdAt"].toString(),
//       updatedAt: data["createdAt"].toString(),
//     };

//     return {
//       props: { item: itemsWithSerializedDate },
//     };
//   } catch (err) {
//     return {
//       notFound: true,
//     };
//   }
// };
