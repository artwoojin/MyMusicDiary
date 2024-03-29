import styled from "styled-components";
import * as CommentList from "../DetailDiary/CommentList";
import { useNavigate } from "react-router-dom";
import { CommentDataProps } from "../../util/type";
import defaultProfile from "../../assets/images/defaultProfile.png";

export default function MyComment({ list }: CommentDataProps) {
  const navigate = useNavigate();

  const moveDetailDiary = () => {
    navigate(`/detail/${list.diaryId}`);
  };

  const replaceImg = (e: any) => {
    e.target.src = defaultProfile;
  };

  return (
    <CommentListContainer onClick={moveDetailDiary}>
      <CommentList.CommentListWrapper>
        <UserInfoArea>
          <CommentList.Profile
            src={list?.imageUrl ? list?.imageUrl : defaultProfile}
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
