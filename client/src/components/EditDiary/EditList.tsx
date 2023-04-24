import * as NewMain from "../NewDiary/NewMain";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryDataProps } from "../../util/Type";
import { TOKEN_API } from "../../util/API";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import EditPlayList from "./EditPlayList";
import { PlaylistData } from "../../util/Type";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import mainIcon from "../../assets/images/mainIcon.png";

function EditList({ list }: DiaryDataProps) {
  const [editTitle, setEditTitle] = useState<string>(list.title);
  const [editTag, setEditTag] = useState<any>(list.tags);
  const [editBody, setEditBody] = useState<string>(list.body);
  const [editPlayList, setEditPlayList] = useState<PlaylistData[]>(list.playlists);
  const [editUrl, setEditUrl] = useState<string>("");

  const navigate = useNavigate();
  const { diaryId } = useParams();

  // 다이어리 patch 요청
  const submitHandler = async () => {
    if (editTitle.length <= 100 && editTitle.length !== 0 && editPlayList.length !== 0) {
      const editDiary = {
        title: editTitle,
        tags: editTag,
        body: editBody,
        playlists: editPlayList,
      };
      await TOKEN_API.patch(`/diary/${diaryId}`, editDiary);
      navigate(`/DetailDiary/${diaryId}`);
    } else if (editTitle.length === 0 && editTitle.length === 0) {
      toast.error("제목을 입력해 주세요.");
    } else if (editTitle.length > 100) {
      toast.error("제목의 길이를 줄여주세요.");
    } else {
      toast.error("플레이리스트를 등록해 주세요.");
    }
  };

  // 제목 수정 체인지 이벤트
  const changeEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  // 플레이리스트 수정 체인지 이벤트
  const changeEditUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUrl(e.target.value);
  };

  // 전체 url을 입력받은 후 id만 필터링
  const filteredUrlId = (url: string) => {
    if (url.indexOf("/watch") > -1) {
      const arr = url.replaceAll(/=|&/g, "?").split("?");
      return arr[arr.indexOf("v") + 1];
    } else if (url.indexOf("/youtu.be") > -1) {
      const arr = url.replaceAll(/=|&|\//g, "?").split("?");
      return arr[arr.indexOf("youtu.be") + 1];
    } else {
      return;
    }
  };

  // input에 등록한 Url 정보 불러옴
  const getYoutubeData = async (id: any) => {
    try {
      const res =
        await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}
      &part=snippet`);
      return res.data.items[0].snippet;
    } catch (err) {
      console.error(err);
    }
  };

  // 추가 버튼 클릭 시 플레이리스트 담는 이벤트 핸들러
  const addPlayList = async () => {
    // 플레이리스트 등록 개수 제한(리스트가 20개 이상일 경우 alert 발생)
    if (editPlayList.length >= 20) {
      return toast.error("플레이리스트는 최대 20개까지만 등록 가능합니다.");
    }

    const musicInfo: PlaylistData = {};
    let urlId = filteredUrlId(editUrl);

    // 새로 추가할 리스트의 url과 newPlayList에 담겨있는 리스트들의 url 중 동일한 url이 있을 경우
    // urlId를 "sameUrl"로 바꾸고 플레이리스트 추가 제한
    editPlayList.map((value) => {
      if (value.url === editUrl) {
        urlId = "sameUrl";
      }
    });
    if (urlId === "sameUrl") {
      return toast.error("이미 추가한 플레이리스트 입니다.");
    }

    let check = false;
    const res = await getYoutubeData(urlId);
    if (res) {
      check = true;
      musicInfo.channelId = res.channelId;
      if (res.thumbnails.maxres) {
        musicInfo.thumbnail = res.thumbnails.maxres.url;
      } else {
        musicInfo.thumbnail = res.thumbnails.medium.url;
      }
      musicInfo.title = res.title;
      musicInfo.url = editUrl;
    } else {
      return toast.error("url을 다시 확인해 주세요.");
    }
    if (check) {
      setEditPlayList((value) => [...value, musicInfo]);
      setEditUrl("");
    }
  };

  const replaceImg = (e: any) => {
    e.target.src = mainIcon;
  };

  // 드롭다운 선택 시 태그 추가하는 이벤트 핸들러
  const addCategory = (value: string) => {
    if (value !== "") {
      if (editTag.length <= 3 && !editTag.includes(value)) {
        setEditTag([...editTag, value]);
      } else if (editTag.length === 4) {
        toast.error("태그는 4개까지만 추가할 수 있습니다.");
      } else if (editTag.includes(value)) {
        toast.error("이미 추가한 태그입니다.");
      }
    }
  };

  // 태그 삭제 이벤트 핸들러
  const removeTags = (deleteIndex: any) => {
    setEditTag(editTag.filter((value: any) => value !== editTag[deleteIndex]));
  };

  // 새로고침 & 페이지 닫기 방지
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; // Chrome
  };
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  return (
    <NewMain.MainContainer>
      <NewMain.MainWrapper>
        <NewMain.TitleArea>
          <input
            className='inputTitle'
            type='text'
            value={editTitle}
            placeholder='제목을 입력하세요'
            onChange={changeEditTitle}
          />
          <NewMain.SubmitButton onClick={submitHandler}>수정하기</NewMain.SubmitButton>
        </NewMain.TitleArea>
        <NewMain.AlbumCoverArea>
          <NewMain.CoverImg
            src={editPlayList[0]?.thumbnail ? editPlayList[0]?.thumbnail : mainIcon}
            alt='다이어리 썸네일'
            onError={replaceImg}
          />
          <NewMain.InfoArea>
            <NewMain.UserInfo>
              <NewMain.User>
                <span className='text'>등록자</span>
                {list.userNickname}
              </NewMain.User>
            </NewMain.UserInfo>
            <NewMain.UserInfo>
              <NewMain.User>
                <span className='text'>등록일</span>
                {list.createdAt.substring(0, 10)}
              </NewMain.User>
            </NewMain.UserInfo>
          </NewMain.InfoArea>
        </NewMain.AlbumCoverArea>
        <NewMain.TagArea>
          <div className='tagTitle'>다이어리 태그</div>
          <NewMain.TagDropdown>
            <select className='tagDropDown' onChange={(e) => addCategory(e.target.value)}>
              <option value=''>태그</option>
              <option value='#신나는'>신나는</option>
              <option value='#감성적인'>감성적인</option>
              <option value='#잔잔한'>잔잔한</option>
              <option value='#애절한'>애절한</option>
              <option value='#그루브한'>그루브한</option>
              <option value='#몽환적인'>몽환적인</option>
              <option value='#어쿠스틱한'>어쿠스틱한</option>
              <option value='#청량한'>청량한</option>
            </select>
            <NewMain.Tag>
              {editTag.map((value: any, index: any) => (
                <li key={index}>
                  <div className='tagTitle'>{value.tagName}</div>
                  <div className='tagcloseBtn' onClick={() => removeTags(index)}>
                    <IoIosClose size={20} />
                  </div>
                </li>
              ))}
            </NewMain.Tag>
          </NewMain.TagDropdown>
        </NewMain.TagArea>
        <NewMain.AlbumInfoArea>
          <div className='playTitle'>다이어리 소개</div>
          <ReactQuill
            className='playContent'
            value={editBody}
            placeholder='나만의 다이어리를 작성해 보세요'
            onChange={(e) => setEditBody(e)}
          />
        </NewMain.AlbumInfoArea>
        <NewMain.PlayListArea>
          <div className='playTitle'>
            다이어리 수록곡 <span className='playCount'>({editPlayList.length})</span>
          </div>
          <NewMain.UrlInput>
            <input
              value={editUrl}
              placeholder='유튜브 url을 입력해 주세요'
              onChange={changeEditUrl}
            />
            <button className='sumbit' onClick={addPlayList} disabled={editUrl.length === 0}>
              <FiPlus size={25} />
            </button>
          </NewMain.UrlInput>
          {editPlayList?.map((value, index) => {
            return (
              <EditPlayList
                list={value}
                key={index}
                editPlayList={editPlayList}
                setEditPlayList={setEditPlayList}
              />
            );
          })}
        </NewMain.PlayListArea>
      </NewMain.MainWrapper>
    </NewMain.MainContainer>
  );
}

export default EditList;
