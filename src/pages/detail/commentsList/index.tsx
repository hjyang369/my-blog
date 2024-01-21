import { useState } from "react";
import Comment from "../comment";
import CreateComment from "../createComment";
import style from "./commentsList.module.css";

export default function CommentsList() {
  const [commentList, setCommentList] = useState([]);

  return (
    <div className={style.container}>
      <p className={style.commentNum}>댓글 {commentList.length}</p>
      <hr className={style.line}></hr>

      {commentList.length > 0 ? (
        <div className="flex flex-col gap-4 py-4">
          {commentList.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
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

const MOCK_DATA = [
  {
    id: 1,
    name: "desert",
    text: "국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다.",
    time: "2023-12-25",
  },
  {
    id: 2,
    name: "이승윤",
    text: "헌법개정안은 국회가 의결한 후 30일 이내에 국민투표에 붙여 국회의원선거권자 과반수의 투표와 투표자 과반수의 찬성을 얻어야 한다.",
    time: "2023-12-20",
  },
  {
    id: 3,
    name: "주우재",
    text: "대통령의 국법상 행위는 문서로써 하며, 이 문서에는 국무총리와 관계 국무위원이 부서한다. 군사에 관한 것도 또한 같다.",
    time: "2023-12-24",
  },
  {
    id: 4,
    name: "약사",
    text: "중앙선거관리위원회는 법령의 범위안에서 선거관리·국민투표관리 또는 정당사무에 관한 규칙을 제정할 수 있으며, 법률에 저촉되지 아니하는 범위안에서 내부규율에 관한 규칙을 제정할 수 있다.",
    time: "2023-12-24",
  },
];
