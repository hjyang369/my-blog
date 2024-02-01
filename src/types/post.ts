export interface PostDataType {
  id: number;
  title: string;
  content: string;
  author: string;
  hashTags: hashTagType[];
  createdAt: string;
  like: boolean;
}

export interface hashTagType {
  id: number;
  name: string;
}

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
}
