import styled from "styled-components";
import { PlaylistData } from "../../util/type";
import mainIcon from "../../assets/images/mainIcon.png";

interface PlaylistDataProps {
  list: PlaylistData;
  newPlayList: PlaylistData[];
  setNewPlayList: React.Dispatch<React.SetStateAction<PlaylistData[]>>;
}

export default function NewPlayList({ list, newPlayList, setNewPlayList }: PlaylistDataProps) {
  const deleteList = (deleteUrl: string | undefined) => {
    setNewPlayList(newPlayList.filter((value: PlaylistData) => value.url !== deleteUrl));
  };

  const replaceImg = (e: any) => {
    e.target.src = mainIcon;
  };

  return (
    <PlayListContainer>
      <PlayListWrapper>
        <ContentArea>
          <img
            className='thumbnail'
            src={list.thumbnail ? list.thumbnail : mainIcon}
            alt='썸네일'
            onError={replaceImg}
          />
          <div className='listTitle'>{list.title}</div>
          <div className='listChannelTitle'>{list.channelTitle}</div>
          <button className='delete' onClick={() => deleteList(list.url)}>
            삭제
          </button>
        </ContentArea>
      </PlayListWrapper>
    </PlayListContainer>
  );
}

export const PlayListContainer = styled.li`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

export const PlayListWrapper = styled.div`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  border: none;
  color: ${(props) => props.theme.color.mainText};
`;

export const ContentArea = styled.div`
  display: flex;
  align-items: center;

  > .thumbnail {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    border-radius: 4px;
    object-fit: cover;
    background-color: ${(props) => props.theme.color.background};
  }

  > .listTitle {
    flex: 7;
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 1.35;
  }

  > .listChannelTitle {
    flex: 3;
    margin-left: 60px;
    min-width: 130px;
    font-size: 14px;
    color: ${(props) => props.theme.color.subText};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (max-width: 721px) {
      margin-left: 20px;
      min-width: 80px;
    }
  }

  > .delete {
    min-width: 50px;
    color: ${(props) => props.theme.color.subText};
    border: none;
    text-decoration: underline;
    font-weight: ${(props) => props.theme.font.titleWeight};
    font-size: 13px;
    margin: 5px;
    background-color: transparent;
    cursor: pointer;
  }
`;
