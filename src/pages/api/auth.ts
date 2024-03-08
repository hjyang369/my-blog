import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { fireStore } from "../../firebase";

class FirebaseError extends Error {
  code: string;
  constructor(originalError: any) {
    super(originalError.message);
    this.code = originalError.code;
    this.name = "FirebaseError";
  }
}

const auth = getAuth();
let user = auth.currentUser;
// console.log(user.displayName);
// console.log(user.uid);

const createUser = async (email, password) => {
  try {
    const signUp = await createUserWithEmailAndPassword(auth, email, password);
    if (signUp) {
      return signUp;
    }
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const emailVerification = async () => {
  try {
    const verification = sendEmailVerification(auth.currentUser);

    if (verification) {
      return verification;
    }
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const createUserDoc = async ({ uid, email, nickname }) => {
  try {
    await setDoc(doc(fireStore, "user", uid), {
      user_uid: uid,
      user_email: email,
      user_nickname: nickname,
      user_resume: null,
      create_date: new Date(),
      update_date: new Date(),
    });
    updateProfile(auth.currentUser, {
      displayName: nickname,
      // photoURL: null,
    });
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const getUser = async (uid: string) => {
  const userRef = doc(fireStore, "user", uid);
  try {
    const userSnapShot = await getDoc(userRef);

    if (userSnapShot.exists()) {
      return userSnapShot.data();
    }
    throw new Error("fail");
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const loginUserEmail = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (auth.currentUser.emailVerified === true) {
      if (user) {
        return getUser(user.uid);
        // console.log(user.stsTokenManager); //토큰 관련 데이터 있는 곳
      }
    } else {
      alert("이메일 인증을 완료해주세요.");
    }
  } catch (error: any) {
    console.log("error", error.code);
    throw new FirebaseError(error);
  }
};

const logoutUser = async () => {
  // const isLogOut = window.confirm("로그아웃 하실건가요?");
  // if (!isLogOut) return;

  try {
    await signOut(auth);
  } catch (error: any) {
    console.log("error", error.code);
    throw new FirebaseError(error);
  }
};

export {
  createUser,
  emailVerification,
  createUserDoc,
  loginUserEmail,
  logoutUser,
};
