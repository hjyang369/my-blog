import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { fireStore } from "../../firebase/index";
import { PostingDataType } from "../../types/post";

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

const getPost = async (postId) => {
  const userRef = doc(fireStore, "post", postId);
  try {
    const userSnapShot = await getDoc(userRef);

    if (userSnapShot.exists()) {
      console.log(userSnapShot.id);
      return { post_id: userSnapShot.id, ...userSnapShot.data() };
    }
    throw new Error("fail");
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const addTags = async (tags) => {
  try {
    const tagRef = collection(fireStore, "hashTag");
    const result = [];

    await Promise.all(
      tags.map(async (tag) => {
        const querySnapshot = await getDocs(
          query(tagRef, where("hashTag_name", "==", tag))
        );
        if (querySnapshot.empty) {
          // 태그가 존재하지 않는 경우
          const newTagRef = await addDoc(collection(fireStore, "hashTag"), {
            hashTag_name: tag,
          });
          if (newTagRef) {
            result.push(newTagRef.id);
          }
        } else {
          // 태그가 이미 존재하는 경우
          result.push(querySnapshot.docs[0].id);
        }
      })
    );
    return result;
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
    console.log("Document written with ID: ", writingRef.id);
    if (writingRef) {
      return writingRef;
    }
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};
export { getPostListFirebase, getPost, addPost };
