export interface PostDataType {
  id: number;
  title: string;
  content: string;
  author: string;
  hashTags: [{ id: number; name: string }];
  createdAt: string;
  like: boolean;
}
