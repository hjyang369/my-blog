import {
  addDoc,
  collection,
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
  author,
  hashTags,
}: PostingDataType) => {
  try {
    const tagsId = await addTags(hashTags);
    const writingRef = await addDoc(collection(fireStore, "post"), {
      post_title: title,
      post_content: content,
      post_author: author,
      hashTags: tagsId,
      user_id: author,
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
export { addPost };
