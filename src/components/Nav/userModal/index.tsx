import IC_AddPost from "../../../../public/icon/AddPost";
import IC_Like from "../../../../public/icon/Like";
import useMoveToPage from "../../../hooks/useMovetoPage";

export default function UserModal({ handleModal }) {
  const { moveToPage } = useMoveToPage();
  const handlePage = (path) => {
    moveToPage(path);
    handleModal(false);
  };

  return (
    <div className="flex flex-col gap-4 bg-yellow100 border-main border-solid border rounded-lg p-2 z-10 relative">
      <button onClick={() => handlePage("/writing")} className="bg-yellow100">
        <IC_AddPost />
      </button>
      <button onClick={() => handlePage("/like")} className="bg-yellow100">
        <IC_Like width="2.5rem" height="2.5rem" isFill={true} />
      </button>

      <button>logout</button>
    </div>
  );
}
