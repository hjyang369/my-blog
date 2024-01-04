import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { idState, savedPostState } from "../store/savePostStore";
import { PostDataType } from "../types/post";

const useHandleLike = (newSavedPost: PostDataType) => {
  const [isSaved, setIsSaved] = useState(false);
  const [posts, setPosts] = useRecoilState(savedPostState);
  const [idList, setIdList] = useRecoilState(idState);

  const savePost = (newSavedPost: PostDataType) => {
    setIsSaved(true);
    setPosts([...posts, newSavedPost]);
    setIdList([...idList, newSavedPost.id]);
  };

  const removePost = (id: number) => {
    const updatedPost = posts.filter((e: any) => e.id !== id);
    const updatedId = idList.filter((ele: number) => ele !== id);

    setPosts(updatedPost);
    setIdList(updatedId);
    setIsSaved(false);
  };

  const handleSavePost = (id: number) => {
    isSaved === true ? removePost(id) : savePost(newSavedPost);
  };

  useEffect(() => {
    if (newSavedPost.like) {
      setIsSaved(newSavedPost.like);
    }
  }, []);

  return { isSaved, setIsSaved, handleSavePost };
};

export default useHandleLike;
