import {
  getDoc,
  doc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
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

//예시
// const getRoom = async (id: string) => {
//   try {
//     const room = doc(firestore, "timer_room", id);
//     const roomSnapShot = await getDoc(room);

//     if (roomSnapShot.exists()) {
//       return roomSnapShot.data();
//     }
//     throw new Error("fail");
//   } catch (error: any) {
//     throw new FirebaseError(error);
//   }
// };

const getResume = async (id: string) => {
  try {
    const user = doc(firestore, "user", id);
    const userSnapShot = await getDoc(user);

    if (userSnapShot.exists()) {
      return userSnapShot.data().user_resume;
    }
    throw new Error("fail");
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const postingData = async ({
  title,
  content,
  author,
  hashTags,
}: PostingDataType) => {
  try {
    const docRef = await addDoc(collection(firestore, "post"), {
      title: title,
      content: content,
      author: author,
      hashTags: hashTags,
      createdAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    if (docRef) {
      return docRef;
    }
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

export { getResume, postingData };