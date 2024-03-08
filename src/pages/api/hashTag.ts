import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { fireStore } from "../../firebase/index";

class FirebaseError extends Error {
  code: string;
  constructor(originalError: any) {
    super(originalError.message);
    this.code = originalError.code;
    this.name = "FirebaseError";
  }
}

const getTag = async (hashTagId: string) => {
  try {
    const hashTagRef = doc(fireStore, "hashTag", hashTagId);
    const hashTagSnapShot = await getDoc(hashTagRef);

    if (hashTagSnapShot) {
      return hashTagSnapShot.data().hashTag_name;
    }
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
            updateDoc(newTagRef, {
              hashTag_id: newTagRef.id,
            });
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

export { getTag, addTags };
