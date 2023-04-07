import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DiaryDataProps } from "../../util/Type";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import defaultProfile from "../../util/img/mainIcon.png";

export const DiaryListContainer = styled.li`
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  width: 310px;
  height: 339px;
  list-style: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.inputBackground};
  transition: 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }
`;

export const Thumbnail = styled.img`
  width: 310px;
  height: 184px;
  background-color: lightgray;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const InfoArea = styled.div`
  padding: 15px;

  > .infoTitle {
    color: ${(props) => props.theme.color.mainText};
    font-weight: ${(props) => props.theme.font.titleWeight};
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > .infoDate {
    font-size: 13px;
    color: ${(props) => props.theme.color.thirdText};
    margin-bottom: 15px;
  }
`;

// export const Tag = styled.ul`
//   display: flex;
//   font-size: 12px;
//   color: #757170;
//   list-style: none;

//   > li {
//     margin-right: 5px;
//     padding: 3px 6px 3px 6px;
//     border: 1px solid #d1d1d1;
//     border-radius: 50px;
//   }
// `;

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 15px 8px 15px;
  border-top: 1px solid ${(props) => props.theme.color.borderLine};
  /* 태그 미구현으로 인한 임시로 위치 내림 */
  margin-top: 18px;
`;

export const ByUsername = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 13px;
  font-weight: ${(props) => props.theme.font.titleWeight};
  color: ${(props) => props.theme.color.mainText};

  > .by {
    font-size: 12px;
    font-weight: 400;
    color: ${(props) => props.theme.color.thirdText};
    margin: 0 5px 2px 0;
  }

  > .userNickname {
    padding-bottom: 2px;
  }
`;

export const Profile = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 8px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${(props) => props.theme.color.background};
`;

export const LikeAndComment = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${(props) => props.theme.color.mainText};

  > .likeIcon {
    color: red;
    margin-right: 5px;
  }

  > .commentIcon {
    color: ${(props) => props.theme.color.mainText};
    margin: 0 5px 0 12px;
  }
`;

function DiaryList({ list }: DiaryDataProps) {
  const navigate = useNavigate();

  // 디테일 페이지로 이동
  const moveDetailDiary = () => {
    navigate(`/DetailDiary/${list.diaryId}`);
  };

  return (
    <DiaryListContainer onClick={moveDetailDiary}>
      <Thumbnail src={list.playlists[0]?.thumbnail} alt='첫번째 앨범 커버' />
      <InfoArea>
        <div className='infoTitle'>{list.title}</div>
        <div className='infoDate'>{list.createdAt.substring(0, 10)}</div>
        {/* <Tag>
          {list.tag.map((value: string, index: number) => {
            return <li key={index}>{value}</li>;
          })}
        </Tag> */}
      </InfoArea>
      <UserArea>
        <ByUsername>
          <Profile src={defaultProfile} alt='프로필 이미지' />
          <div className='by'>by</div>
          <div className='userNickname'>{list.userNickname}</div>
        </ByUsername>
        <LikeAndComment>
          <AiFillHeart className='likeIcon' size={17} />
          {list.likeCount}
          <FaRegCommentDots className='commentIcon' size={16} />
          {list.comments.length}
        </LikeAndComment>
      </UserArea>
    </DiaryListContainer>
  );
}

export default DiaryList;
