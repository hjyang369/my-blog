import {
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { fireStore } from "../../firebase/index";
import { PostDataType, PostingDataType } from "../../types/post";
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

// 전체 글 목록 불러오는 함수
const loadPostList = async () => {
  try {
    const postRef = collection(fireStore, "post");
    let postQuery = query(
      postRef,
      orderBy("createdAt", "desc") //최신순 desc, 작성순 asc
    );

    const documentSnapshots = await getDocs(postQuery);
    const data = documentSnapshots.docs.map((doc) => ({
      post_id: doc.id,
      ...doc.data(),
    }));

    if (documentSnapshots) {
      return data;
    }
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

// 무한스크롤 시 첫번째 글 목록 불러오는 함수
const getFirstPage = async () => {
  try {
    const postRef = collection(fireStore, "post");
    let firstPostQuery = query(
      postRef,
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const documentSnapshots = await getDocs(firstPostQuery);
    const firstData: PostDataType[] = documentSnapshots.docs.map((doc) => ({
      post_id: doc.id,
      post_title: doc.data().post_title,
      post_content: doc.data().post_content,
      post_author: doc.data().post_author,
      createdAt: doc.data().createdAt,
      hashTags: doc.data().hashTags,
      hashTagsName: doc.data().hashTagsName,
      post_title_keywords: doc.data().post_title_keywords,
      user_id: doc.data().user_id,
      like: false, //TODO 좋아요 만들면 수정
    }));

    // 마지막 문서 스냅샷
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    if (documentSnapshots) {
      return { firstData, lastVisible };
    }
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

// 무한스크롤 첫번째 이후 글 목록 가져오는 함수
const getNextPage = async (loadCount) => {
  try {
    const postRef = collection(fireStore, "post");
    const nextPostQuery = query(
      postRef,
      orderBy("createdAt", "desc"),
      startAfter(loadCount),
      limit(10)
    );

    const documentSnapshots = await getDocs(nextPostQuery);
    const nextData = documentSnapshots.docs.map((doc) => ({
      post_id: doc.id,
      ...doc.data(),
    }));

    const lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData> =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    if (documentSnapshots) {
      return { nextData, lastVisible };
    }
  } catch (error: any) {
    throw new FirebaseError(error);
  }
};

// console.log("%c========", "color: red", queryArray);

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
  loadPostList,
  getFirstPage,
  getNextPage,
  dateFilterPost,
  titleFilterPost,
  hashTagFilterPost,
  getPost,
  addPost,
  updatePost,
  removePost,
};
