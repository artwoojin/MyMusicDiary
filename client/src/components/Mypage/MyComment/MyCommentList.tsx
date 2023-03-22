import styled from "styled-components";
import { CommentDataProps } from "../../../Type";

const CommentListContainer = styled.li`
  display: flex;
  justify-content: center;
`;

const CommentListWrapper = styled.div`
  width: 100vw;
  max-width: 900px;
  border: none;
  border-bottom: 1px solid lightgray;
  font-size: 15px;

  > .name {
    font-weight: 500;
    margin: 10px 0 25px 0;
  }
  > .content {
    color: #323232;
    font-weight: 500;
  }

  > .date {
    font-size: 13px;
    color: #848180;
    margin: 10px 0 15px 0;
  }
`;

function MyCommentList({ list }: CommentDataProps) {
  // const isLogin = localStorage.getItem('nickname')
  // list.nickname === {이 부분을 로그인한 사용자의 닉네임으로 변경}
  const myComment: boolean = list.userNickname === "light";

  return (
    <CommentListContainer>
      {myComment === true ? (
        <CommentListWrapper>
          <div className='name'>{list.userNickname}</div>
          <div className='content'>{list.body}</div>
          <div className='date'>{list.createdAt}</div>
        </CommentListWrapper>
      ) : null}
    </CommentListContainer>
  );
}

export default MyCommentList;
