import * as NewPlayList from "../NewDiary/NewPlayList";
import { PlaylistData } from "../../util/Type";
import mainIcon from "../../util/img/mainIcon.png";

interface PlaylistDataProps {
  list: PlaylistData;
  editPlayList: object[];
  setEditPlayList: Function;
}

function EditPlayList({ list, editPlayList, setEditPlayList }: PlaylistDataProps) {
  const deleteList = (deleteId: string | undefined) => {
    setEditPlayList(editPlayList.filter((value: any) => value.url !== deleteId));
  };

  const replaceImg = (e: any) => {
    e.target.src = mainIcon;
  };

  return (
    <NewPlayList.PlayListContainer>
      <NewPlayList.PlayListWrapper>
        <NewPlayList.ContentArea>
          <img
            className='thumbnail'
            src={list.thumbnail ? list.thumbnail : mainIcon}
            alt='썸네일'
            onError={replaceImg}
          />
          <div className='listTitle'>{list.title}</div>
          <button className='delete' onClick={() => deleteList(list.url)}>
            삭제
          </button>
        </NewPlayList.ContentArea>
      </NewPlayList.PlayListWrapper>
    </NewPlayList.PlayListContainer>
  );
}

export default EditPlayList;
