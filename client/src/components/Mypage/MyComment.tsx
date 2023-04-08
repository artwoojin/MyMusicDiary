import * as CommentList from "../DetailDiary/CommentList";
import { CommentDataProps } from "../../util/Type";

function MyComment({ list }: CommentDataProps) {
  return (
    <CommentList.CommentListContainer>
      <CommentList.CommentListWrapper>
        <div className='name'>{list.userNickname}</div>
        <div className='content'>{list.body}</div>
        <div className='date'>{list.createdAt.substring(0, 10)}</div>
      </CommentList.CommentListWrapper>
    </CommentList.CommentListContainer>
  );
}

export default MyComment;
