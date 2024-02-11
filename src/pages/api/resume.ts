import { getDoc, doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { fireStore, storage } from "../../firebase/index";

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
//     const room = doc(fireStore, "timer_room", id);
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
  const userRef = doc(fireStore, "user", userId);
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
    const userRef = doc(fireStore, "user", userId);
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
    const userRef = doc(fireStore, "user", userId);
    await updateDoc(userRef, {
      user_resume: null,
    });
    alert("이력서가 삭제되었습니다!");
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
};
