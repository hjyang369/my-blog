export interface PostDataType {
  id: number;
  title: string;
  subtitle: string;
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
  subtitle: string;
  tag: string;
  author: string;
}

export interface EditInputValueType {
  title: string;
  subtitle: string;
  tag: string;
}

export interface PostingDataType {
  title: string;
  content: string;
  author: string;
  hashTags: string;
}
