import * as DiaryList from "../Main/DiaryList";
import { Link } from "react-router-dom";
import { DiaryDataProps } from "../../util/Type";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import defaultProfile from "../../assets/images/defaultProfile.png";

function MyDiary({ list }: DiaryDataProps) {
  return (
    <DiaryList.DiaryListContainer>
      <Link to={`/DetailDiary/${list.diaryId}`}>
        <DiaryList.Thumbnail
          src={list.playlists[0].thumbnail ? list.playlists[0].thumbnail : defaultProfile}
          alt='첫번째 앨범 커버'
        />
        <DiaryList.InfoArea>
          <div className='infoTitle'>{list.title}</div>
          <div className='infoDate'>{list.createdAt.substring(0, 10)}</div>
          {/* <DiaryList.Tag>
          {list.tag.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </DiaryList.Tag> */}
        </DiaryList.InfoArea>
        <DiaryList.UserArea>
          <DiaryList.ByUsername>
            <DiaryList.Profile src={defaultProfile} alt='프로필 이미지' />
            <div className='by'>by</div>
            {list.userNickname}
          </DiaryList.ByUsername>
          <DiaryList.LikeAndComment>
            <AiFillHeart className='likeIcon' size={16} />
            {list.likeCount}
            <FaRegCommentDots className='commentIcon' size={15} />
            {list.comments.length}
          </DiaryList.LikeAndComment>
        </DiaryList.UserArea>
      </Link>
    </DiaryList.DiaryListContainer>
  );
}

export default MyDiary;
