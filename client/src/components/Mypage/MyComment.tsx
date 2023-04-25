import styled from "styled-components";
import * as CommentList from "../DetailDiary/CommentList";
import { useNavigate } from "react-router-dom";
import { CommentDataProps } from "../../util/Type";
import mainIcon from "../../assets/images/mainIcon.png";

const CommentListContainer = styled(CommentList.CommentListContainer)`
  cursor: pointer;

  > a {
    text-decoration: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.color.buttonHover};
  }
`;

const UserInfoArea = styled(CommentList.UserInfoArea)`
  margin-bottom: 10px;
`;

function MyComment({ list }: CommentDataProps) {
  const navigate = useNavigate();

  const moveDetailDiary = () => {
    navigate(`/DetailDiary/${list.diaryId}`);
  };

  const replaceImg = (e: any) => {
    e.target.src = mainIcon;
  };

  return (
    <CommentListContainer onClick={moveDetailDiary}>
      <CommentList.CommentListWrapper>
        <UserInfoArea>
          <CommentList.Profile
            src={list?.imageUrl ? list?.imageUrl : mainIcon}
            alt='프로필 이미지'
            onError={replaceImg}
          />
          <div className='name'>{list.userNickname}</div>
        </UserInfoArea>
        <div className='content'>{list.body}</div>
        <div className='date'>{list.createdAt.substring(0, 10)}</div>
      </CommentList.CommentListWrapper>
    </CommentListContainer>
  );
}

export default MyComment;
