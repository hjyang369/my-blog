export interface PostDataType {
  post_id: string;
  post_title: string;
  post_content: string;
  post_author: string;
  createdAt: Date | null;
  like: boolean;
  hashTags: string[];
}

// export interface hashTagType {
//   hashTag_id: string;
//   hashTag_name: string;
// }

export interface WritingInputValueType {
  title: string;
  tag: string;
  author: string;
}

export interface EditInputValueType {
  title: string;
  tag: string;
}

export interface PostingDataType {
  title: string;
  content: string;
  author: string;
  hashTags: string;
  userId: string;
}
