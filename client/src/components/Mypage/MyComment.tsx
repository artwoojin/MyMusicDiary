import styled from "styled-components";
import * as CommentList from "../DetailDiary/CommentList";
import { useNavigate } from "react-router-dom";
import { CommentDataProps } from "../../util/Type";

const CommentListContainer = styled(CommentList.CommentListContainer)`
  cursor: pointer;

  > a {
    text-decoration: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.color.buttonHover};
  }
`;

function MyComment({ list }: CommentDataProps) {
  const navigate = useNavigate();

  const moveDetailDiary = () => {
    navigate(`/DetailDiary/${list.diaryId}`);
  };

  return (
    <CommentListContainer onClick={moveDetailDiary}>
      <CommentList.CommentListWrapper>
        <div className='name'>{list.userNickname}</div>
        <div className='content'>{list.body}</div>
        <div className='date'>{list.createdAt.substring(0, 10)}</div>
      </CommentList.CommentListWrapper>
    </CommentListContainer>
  );
}

export default MyComment;
