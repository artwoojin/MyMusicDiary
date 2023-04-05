import * as NewPlayList from "../NewDiary/NewPlayList";
import { PlaylistData } from "../../util/Type";

interface PlaylistDataProps {
  list: PlaylistData;
  editPlayList: object[];
  setEditPlayList: Function;
}

function EditPlayList({ list, editPlayList, setEditPlayList }: PlaylistDataProps) {
  const deleteList = (deleteId: string | undefined) => {
    setEditPlayList(editPlayList.filter((value: any) => value.url !== deleteId));
  };

  return (
    <NewPlayList.PlayListContainer>
      <NewPlayList.PlayListWrapper>
        <NewPlayList.ContentArea>
          <img className='thumbnail' src={list.thumbnail} alt='썸네일' />
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
