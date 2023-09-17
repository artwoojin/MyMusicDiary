import * as DiaryList from "../Main/DiaryList";
import { Link } from "react-router-dom";
import { DiaryDataProps } from "../../util/type";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import mainIcon from "../../assets/images/mainIcon.png";
import defaultProfile from "../../assets/images/defaultProfile.png";

export default function MyDiary({ list }: DiaryDataProps) {
  const replaceImg = (e: any) => {
    e.target.src = mainIcon;
  };

  return (
    <DiaryList.DiaryListContainer>
      <Link to={`/detail/${list.diaryId}`}>
        <DiaryList.Thumbnail
          src={list.playlists[0].thumbnail ? list.playlists[0].thumbnail : mainIcon}
          alt='첫번째 앨범 커버'
        />
        <DiaryList.InfoArea>
          <div className='infoTitle'>{list.title}</div>
          <div className='infoDate'>{list.createdAt.substring(0, 10)}</div>
          <DiaryList.TagArea>
            {list.tags.map((value: string, index: number) => {
              return <li key={index}>{value}</li>;
            })}
          </DiaryList.TagArea>
        </DiaryList.InfoArea>
        <DiaryList.UserArea>
          <DiaryList.ByUsername>
            <DiaryList.Profile
              src={list?.imageUrl ? list?.imageUrl : defaultProfile}
              alt='프로필 이미지'
              onError={replaceImg}
            />
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
