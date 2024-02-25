import {
  QueryOrderByConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  endAt,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  updateDoc,
  where,
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

const getPostListFirebase = async (
  title: string,
  startDate: string,
  lastDate: string,
  hashTag: string
) => {
  try {
    const postRef = collection(fireStore, "post");
    let postQuery = query(postRef, orderBy("createdAt", "desc"), limit(10)); // 기본 쿼리
    const start = new Date(startDate);
    const end = new Date(lastDate);
    const startOfDay = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );

    const endOfDate = new Date(
      end.getFullYear(),
      end.getMonth(),
      end.getDate(),
      23,
      59,
      59
    );

    if (title) {
      // 제목이 존재할 때 제목에 대한 필터링 추가
      postQuery = query(
        postRef,
        limit(10),
        where("post_title", ">=", title),
        where("post_title", "<=", `${title}\uf8ff`),
        where("keyword", "array-contains", title.toLowerCase())
      );
    }

    if (startDate && !lastDate) {
      // 시작 날짜가 존재할 때 시작 날짜에 대한 필터링 추가
      postQuery = query(
        postRef,
        limit(10),
        where("createdAt", ">=", startOfDay),
        orderBy("createdAt", "desc")
      );
    }

    if (startDate && lastDate) {
      // 마지막 날짜가 존재할 때 마지막 날짜에 대한 필터링 추가
      if (startDate === lastDate) {
        postQuery = query(
          postRef,
          limit(10),
          where("createdAt", ">=", startOfDay),
          where("createdAt", "<=", endOfDate),
          orderBy("createdAt", "desc")
        );
      } else {
        postQuery = query(
          postRef,
          limit(10),
          where("createdAt", ">=", startOfDay),
          where("createdAt", "<=", endOfDate),
          orderBy("createdAt", "desc")
        );
      }
    }
    // if (hashTag) {
    //   // 해시태그가 존재할 때 해시태그에 대한 필터링 추가
    //   console.log(`#${hashTag}`);
    //   postQuery = query(
    //     postRef,
    //     limit(10),
    //     where("keyword", "array-contains", `#${hashTag}`.toLowerCase())
    //   );
    // }

    // 필요한 모든 조건을 반영한 최종 쿼리를 실행하여 데이터를 가져옵니다.
    const documentSnapshots = await getDocs(postQuery);
    const data = documentSnapshots.docs.map((doc) => ({
      post_id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

// console.log("%c========", "color: red", queryArray);

// const getPostListFirebase = async (
//   title: string,
//   startDate: string,
//   lastDate: string,
//   hashTags: string[]
// ) => {
//   try {
//     const postRef = collection(fireStore, "post");
//     // const first = quegetPostListFirebasery(
//     //   postRef,
//     //   orderBy("createdAt", "desc"),
//     //   // startAt(0),
//     //   limit(10)
//     //   // , where("capital", "==", true)
//     // );
//     console.log(title ? "true" : "false");
//     console.log(startDate);
//     console.log(lastDate);

//     const queryArray = [
//       limit(10),
//       orderBy("createdAt", "desc"),
//       // orderBy("post_title", "asc"),
//     ];

//     if (title) {
//       console.log(title);
//       // queryArray.push(orderBy("post_title", "desc"));
//       // queryArray.push(startAt("post_title"));
//       // queryArray.push(endAt("post_title" + "\uf8ff"));
//       queryArray.push(where("post_title", ">=", title));
//       queryArray.push(where("post_title", "<=", `${title}\uf8ff`));
//     }

//     if (startDate) {
//       queryArray.push(orderBy("createdAt", "desc"));
//       queryArray.push(where("createdAt", ">=", startDate));
//     }

//     if (lastDate) {
//       queryArray.push(orderBy("createdAt", "desc"));
//       queryArray.push(where("createdAt", "<=", lastDate));
//     }
//

//     const first = query(postRef, ...queryArray);
//     console.log(postRef, ...queryArray, title);
//     // const first =
//     //   title || startDate || lastDate
//     //     ? filterPost(title, startDate, lastDate, hashTags)
//     //     : query(postRef, orderBy("createdAt", "desc"), limit(10)); //최신순 desc, 작성순 asc
//     const documentSnapshots = await getDocs(first);

//     const firstData = documentSnapshots.docs.map((doc) => ({
//       post_id: doc.id,
//       ...doc.data(),
//     }));

//     const lastVisible =
//       documentSnapshots.docs[documentSnapshots.docs.length - 1];
//     console.log(documentSnapshots.docs);
//     // console.log(lastVisible);

//     if (documentSnapshots) {
//       return firstData;
//     }

//     // const next = query(
//     //   postRef,
//     //   orderBy("createdAt", "desc"),
//     //   limit(10),
//     //   startAfter(lastVisible)
//     // );

//     // const querySnapshot = await getDocs(next);
//     // const nextData = querySnapshot.docs.map((doc) => ({
//     //   post_id: doc.id,
//     //   ...doc.data(),
//     // }));

//     // if (querySnapshot) {
//     //   return nextData;
//     // }
//   } catch (error: any) {
//     throw new FirebaseError(error);
//   }
// };

// const filterPost = (
//   title: string,
//   startDate: string,
//   lastDate: string,
//   hashTags: string[]
// ) => {
//   const postRef = collection(fireStore, "post");
//   const queryArray = [orderBy("createdAt", "desc"), limit(10)];

//   if (title) {
//     queryArray.push(where("post_title", "==", title));
//   }

//   if (startDate) {
//     queryArray.push(where("createdAt", ">=", startDate));
//   }

//   if (lastDate) {
//     queryArray.push(where("createdAt", "<=", lastDate));
//   }

//   return query(postRef, ...queryArray);
// };

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
      // hashTagsName: hashTags,
      post_author: author,
      user_id: userId,
      createdAt: new Date(),
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
        // hashTagsName: hashTags,
        updatedAt: new Date(),
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
