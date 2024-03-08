import Comment from "../comment";
import CreateComment from "../createComment";
import style from "./commentsList.module.css";

export default function CommentsList({ commentList }) {
  return (
    <div className={style.container}>
      <p className={style.commentNum}>댓글 {commentList?.length}</p>
      <hr className={style.line}></hr>

      {commentList?.length > 0 ? (
        <div className="flex flex-col gap-4 py-4">
          {commentList.map((comment) => {
            return <Comment key={comment.comment_id} comment={comment} />;
          })}
        </div>
      ) : (
        <div className="my-4 text-xl">아직 댓글이 없습니다.</div>
      )}
      <hr className={style.line}></hr>
      <CreateComment />
    </div>
  );
}
