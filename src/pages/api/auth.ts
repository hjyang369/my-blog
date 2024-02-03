import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../firebase";

class FirebaseError extends Error {
  code: string;
  constructor(originalError: any) {
    super(originalError.message);
    this.code = originalError.code;
    this.name = "FirebaseError";
  }
}

const auth = getAuth();

const createUser = async (email, password) => {
  try {
    const signUp = await createUserWithEmailAndPassword(auth, email, password);
    if (signUp) {
      console.log(signUp);
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
    const setQuery = await addDoc(collection(firestore, "user"), {
      user_uid: uid,
      user_email: email,
      user_nickname: nickname,
      user_resume: null,
      create_date: new Date(),
      update_date: new Date(),
    });

    if (setQuery) {
      return setQuery;
    }
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

export { createUser, emailVerification, createUserDoc };
