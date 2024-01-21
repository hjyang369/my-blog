import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../firebase/index";
import { PostingDataType } from "../../types/post";

class FirebaseError extends Error {
  code: string;
  constructor(originalError: any) {
    super(originalError.message);
    this.code = originalError.code;
    this.name = "FirebaseError";
  }
}

const addPost = async ({
  title,
  content,
  author,
  hashTags,
}: PostingDataType) => {
  try {
    const writingRef = await addDoc(collection(firestore, "post"), {
      title: title,
      content: content,
      author: author,
      hashTags: hashTags,
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
