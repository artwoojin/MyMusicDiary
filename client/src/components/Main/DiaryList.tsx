import styled from "styled-components";
import { Link } from "react-router-dom";
import { DiaryDataProps } from "../../util/Type";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import mainIcon from "../../assets/images/mainIcon.png";

export const DiaryListContainer = styled.li`
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  width: 310px;
  height: 330px;
  list-style: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.inputBackground};
  transition: 0.2s ease-in-out;
  cursor: pointer;

  > a {
    text-decoration: none;
  }

  &:hover {
    transform: scale(1.01);
  }
`;

export const Thumbnail = styled.img`
  width: 310px;
  height: 174.5px;
  background-color: ${(props) => props.theme.color.inputBackground};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  object-fit: contain;
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
    font-size: 12px;
    color: ${(props) => props.theme.color.thirdText};
    margin-bottom: 15px;
  }
`;

export const TagArea = styled.ul`
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 4px;
  color: ${(props) => props.theme.color.tagText};
  list-style: none;
  margin: 0 -2px 0 -2px;

  > li {
    height: 25px;
    padding: 4px 7px 4px 7px;
    border: 1px solid ${(props) => props.theme.color.borderLine};
    border-radius: 50px;
  }
`;

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px 5px 15px;
  border-top: 1px solid ${(props) => props.theme.color.userAreaLine};
`;

export const ByUsername = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 12px;
  font-weight: ${(props) => props.theme.font.titleWeight};
  color: ${(props) => props.theme.color.mainText};

  > .by {
    font-size: 12px;
    font-weight: 400;
    color: ${(props) => props.theme.color.thirdText};
    margin-right: 5px;
  }
`;

export const Profile = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 8px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${(props) => props.theme.color.inputBackground};
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
  const replaceImg = (e: any) => {
    e.target.src = mainIcon;
  };

  return (
    <DiaryListContainer>
      <Link to={`/DetailDiary/${list.diaryId}`}>
        <Thumbnail
          src={list.playlists[0]?.thumbnail ? list.playlists[0]?.thumbnail : mainIcon}
          alt='첫번째 앨범 커버'
          onError={replaceImg}
        />
        <InfoArea>
          <div className='infoTitle'>{list.title}</div>
          <div className='infoDate'>{list.createdAt.substring(0, 10)}</div>
          <TagArea>
            {list.tags.map((value: any, index: number) => {
              return <li key={index}>{value.tagName}</li>;
            })}
          </TagArea>
        </InfoArea>
        <UserArea>
          <ByUsername>
            <Profile src={mainIcon} alt='프로필 이미지' />
            <div className='by'>by</div>
            <div className='userNickname'>{list.userNickname}</div>
          </ByUsername>
          <LikeAndComment>
            <AiFillHeart className='likeIcon' size={15} />
            {list.likeCount}
            <FaRegCommentDots className='commentIcon' size={14} />
            {list.comments.length}
          </LikeAndComment>
        </UserArea>
      </Link>
    </DiaryListContainer>
  );
}

export default DiaryList;
