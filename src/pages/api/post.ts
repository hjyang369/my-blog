import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { fireStore } from "../../firebase/index";
import { PostingDataType } from "../../types/post";
import { addTags, getTag } from "./hashTag";

class FirebaseError extends Error {
  code: string;
  constructor(originalError: any) {
    super(originalError.message);
    this.code = originalError.code;
    this.name = "FirebaseError";
  }
}

const getPostListFirebase = async () => {
  try {
    const q = query(collection(fireStore, "post"));
    // , where("capital", "==", true)

    const querySnapshot = await getDocs(q);
    const newData = querySnapshot.docs.map((doc) => ({
      post_id: doc.id,
      ...doc.data(),
    }));

    if (querySnapshot) {
      return newData;
    }
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const getPost = async (postId: string) => {
  const postRef = doc(fireStore, "post", postId);
  try {
    const postSnapShot = await getDoc(postRef);

    if (postSnapShot.exists()) {
      const hashTags = await Promise.all(
        postSnapShot.data().hashTags.map(async (hashTag) => {
          return getTag(hashTag);
        })
      );
      return {
        post_id: postSnapShot.id,
        ...postSnapShot.data(),
        createdAt: postSnapShot.data().createdAt.toDate(),
        hashTags: hashTags,
      };
    }
    throw new Error("fail");
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const addPost = async ({
  title,
  content,
  userId,
  author,
  hashTags,
}: PostingDataType) => {
  try {
    const tagsId = await addTags(hashTags);
    const writingRef = await addDoc(collection(fireStore, "post"), {
      post_title: title,
      post_content: content,
      hashTags: tagsId,
      post_author: author,
      user_id: userId,
      createdAt: serverTimestamp(),
    });
    if (writingRef) {
      return writingRef;
    }
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const updatePost = async ({ title, content, postId, hashTags }) => {
  try {
    const checkUpdate = window.confirm("글을 수정하시겠습니까?");
    const tagsId = await addTags(hashTags);
    if (checkUpdate) {
      const postRef = doc(fireStore, "post", postId);
      await updateDoc(postRef, {
        post_title: title,
        post_content: content,
        hashTags: tagsId,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const removePost = async (postId: string) => {
  try {
    const checkDelete = window.confirm("글을 삭제하시겠습니까?");
    if (checkDelete) {
      const postRef = doc(fireStore, "post", postId);
      await deleteDoc(postRef);
      alert("글이 삭제되었습니다!");
    }
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

export { getPostListFirebase, getPost, addPost, updatePost, removePost };
