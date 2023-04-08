import styled from "styled-components";
import * as CommentList from "../DetailDiary/CommentList";
import { useNavigate } from "react-router-dom";
import { CommentDataProps } from "../../util/Type";

const CommentListContainer = styled(CommentList.CommentListContainer)`
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.buttonHover};
  }
`;

function MyComment({ list }: CommentDataProps) {
  const navigate = useNavigate();

  // 해당 댓글이 있는 디테일 페이지로 이동
  const clickHandler = () => {
    navigate(`/DetailDiary/${list.diaryId}`);
  };

  return (
    <CommentListContainer onClick={clickHandler}>
      <CommentList.CommentListWrapper>
        <div className='name'>{list.userNickname}</div>
        <div className='content'>{list.body}</div>
        <div className='date'>{list.createdAt.substring(0, 10)}</div>
      </CommentList.CommentListWrapper>
    </CommentListContainer>
  );
}

export default MyComment;
