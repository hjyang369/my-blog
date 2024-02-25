import {
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
import {
  calculateTime,
  extractKeywordsFromTitle,
} from "../../modules/function";

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
    const postRef = collection(fireStore, "post");
    let postQuery = query(postRef, orderBy("createdAt", "desc"), limit(10)); // 기본 쿼리

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

// 무한스크롤 코드

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

// 날짜 필터링
const dateFilterPost = async (startDate: string, lastDate: string) => {
  try {
    const postRef = collection(fireStore, "post");
    const queryArray = addDateArr(startDate, lastDate);
    const dateQuery = query(postRef, ...queryArray);

    const documentSnapshots = await getDocs(dateQuery);
    const data = documentSnapshots.docs.map((doc) => ({
      post_id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

// 제목 필터링
const titleFilterPost = async (
  title: string,
  startDate: string,
  lastDate: string
) => {
  try {
    const postRef = collection(fireStore, "post");
    const queryArray = addDateArr(startDate, lastDate);

    // 제목의 키워드에 대한 필터링 추가
    const titleQuery = query(
      postRef,
      ...queryArray,
      where("post_title_keywords", "array-contains", title.toLowerCase())
    );

    const documentSnapshots = await getDocs(titleQuery);
    const data = documentSnapshots.docs.map((doc) => ({
      post_id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

//해시태그 필터링
const hashTagFilterPost = async (
  hashTag: string,
  startDate: string,
  lastDate: string
) => {
  try {
    const postRef = collection(fireStore, "post");
    const queryArray = addDateArr(startDate, lastDate);

    // 해시태그에 대한 필터링 추가
    // TODO Java, JAVA, java, 자바 대응 예정
    // console.log(`#${hashTag}`.toLowerCase());
    const hashTagQuery = query(
      postRef,
      ...queryArray,
      where("hashTagsName", "array-contains", `#${hashTag}`)
    );

    const documentSnapshots = await getDocs(hashTagQuery);
    const data = documentSnapshots.docs.map((doc) => ({
      post_id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

const addDateArr = (startDate: string, lastDate: string) => {
  const startOfDay = calculateTime(startDate, true);
  const endOfDay = calculateTime(lastDate, false);
  const FirstOfDay = calculateTime("2024-01-01", true);
  const currentOfDay = calculateTime(null, false);

  if (startDate) {
    // 시작 날짜만 존재할 때 시작 날짜 이후의 글 필터링 추가 //TODO 마지막 날짜만 선택시 안된다고 경고창 추가
    const queryArray = [
      where("createdAt", ">=", startOfDay),
      orderBy("createdAt", "desc"),
      limit(10),
    ];

    // 마지막 날짜도 존재하는 경우
    // 만약 시작 날짜와 마지막 날짜가 동일하다면 당일에 대한 글, 동일하지 않다면 기간에 대한 글 필터링 추가
    lastDate && queryArray.push(where("createdAt", "<=", endOfDay));

    return queryArray;
  }
  // 날짜 설정 안한경우
  if (!startDate && !lastDate) {
    const queryArray = [
      where("createdAt", ">=", FirstOfDay),
      where("createdAt", "<=", currentOfDay),
      orderBy("createdAt", "desc"),
      limit(10),
    ];
    return queryArray;
  }
};

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
    const keywords = extractKeywordsFromTitle(title);
    const writingRef = await addDoc(collection(fireStore, "post"), {
      post_title: title,
      post_title_keywords: keywords,
      post_content: content,
      hashTags: tagsId,
      hashTagsName: hashTags,
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
    const keywords = extractKeywordsFromTitle(title);
    if (checkUpdate) {
      const postRef = doc(fireStore, "post", postId);
      await updateDoc(postRef, {
        post_title: title,
        post_title_keywords: keywords,
        post_content: content,
        hashTags: tagsId,
        hashTagsName: hashTags,
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

export {
  getPostListFirebase,
  getPost,
  addPost,
  updatePost,
  removePost,
  dateFilterPost,
  titleFilterPost,
  hashTagFilterPost,
};
