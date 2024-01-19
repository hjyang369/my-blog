import {
  getDoc,
  doc,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { firestore, storage } from "../../firebase/index";
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

const getResume = async (userId: string) => {
  const userRef = doc(firestore, "user", userId);
  try {
    const userSnapShot = await getDoc(userRef);

    if (userSnapShot.exists()) {
      return userSnapShot.data().user_resume;
    }
    throw new Error("fail");
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const updateResume = async (url: string, userId: string) => {
  try {
    const userRef = doc(firestore, "user", userId);
    await updateDoc(userRef, {
      user_resume: url,
    });
    alert("이력서가 등록되었습니다!");
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const uploadResumeFile = (file, setState) => {
  const fileName = `userName-${Date.now()}`;
  const resumeRef = ref(storage, "pdf/" + fileName);
  uploadBytes(resumeRef, file)
    .then((snapshot) => {
      console.log("Uploaded a blob or file!");
      getDownloadURL(snapshot.ref).then((url) => {
        setState(url);
      });
    })
    .catch(() => {
      console.error();
    });
};

const deleteResumeFile = async (url: string) => {
  try {
    const startIndex = url.indexOf("pdf%2F") + 6;
    const endIndex = url.indexOf("?alt=media&token=");
    const path = url.substring(startIndex, endIndex);

    const resumeRef = ref(storage, `pdf/${path}`);

    deleteObject(resumeRef).then(() => {
      console.log("File deleted successfully");
    });
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const deleteResume = async (userId: string) => {
  try {
    const userRef = doc(firestore, "user", userId);
    await updateDoc(userRef, {
      user_resume: null,
    });
    alert("이력서가 삭제되었습니다!");
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const postWriting = async ({
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

export {
  getResume,
  updateResume,
  uploadResumeFile,
  deleteResumeFile,
  deleteResume,
  postWriting,
};
