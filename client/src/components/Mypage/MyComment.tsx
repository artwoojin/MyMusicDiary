import * as CommentList from "../DetailDiary/CommentList";
import { CommentDataProps } from "../../util/Type";
import { useContext } from "react";
import { myContext } from "../../theme";

function MyComment({ list }: CommentDataProps) {
  const { currentUser }: any = useContext(myContext);
  const myComment: boolean = list.userNickname === currentUser.nickname;

  return (
    <>
      {myComment === true ? (
        <CommentList.CommentListContainer>
          <CommentList.CommentListWrapper>
            <div className='name'>{list.userNickname}</div>
            <div className='content'>{list.body}</div>
            <div className='date'>{list.createdAt.substring(0, 10)}</div>
          </CommentList.CommentListWrapper>
        </CommentList.CommentListContainer>
      ) : null}
    </>
  );
}

export default MyComment;
