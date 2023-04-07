import styled from "styled-components";
import { PlaylistData } from "../../util/Type";
import defaultProfile from "../../util/img/mainIcon.png";

export const PlayListContainer = styled.li`
  display: flex;
  justify-content: center;
  margin-top: 10px;
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
    margin-right: 20px;
    border-radius: 4px;
    object-fit: cover;
    background-color: ${(props) => props.theme.color.background};
  }

  > .listTitle {
    font-size: 15px;
    font-weight: ${(props) => props.theme.font.contentWeight};
    width: 100%;
  }

  > .delete {
    width: 50px;
    color: ${(props) => props.theme.color.mainText};
    border: none;
    text-decoration: underline;
    font-weight: ${(props) => props.theme.font.titleWeight};
    font-size: 13px;
    margin: 5px;
    background-color: transparent;
    cursor: pointer;
  }
`;

interface PlaylistDataProps {
  list: PlaylistData;
  newPlayList: object[];
  setNewPlayList: Function;
}

function NewPlayList({ list, newPlayList, setNewPlayList }: PlaylistDataProps) {
  const deleteList = (deleteUrl: string | undefined) => {
    setNewPlayList(newPlayList.filter((value: any) => value.url !== deleteUrl));
  };

  // console.log(list);

  return (
    <PlayListContainer>
      <PlayListWrapper>
        <ContentArea>
          <img
            className='thumbnail'
            src={list.thumbnail ? list.thumbnail : defaultProfile}
            alt='썸네일'
          />
          <div className='listTitle'>{list.title}</div>
          <button className='delete' onClick={() => deleteList(list.url)}>
            삭제
          </button>
        </ContentArea>
      </PlayListWrapper>
    </PlayListContainer>
  );
}

export default NewPlayList;
