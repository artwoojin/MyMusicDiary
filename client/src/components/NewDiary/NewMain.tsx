import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_API } from "../../util/API";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import NewPlayList from "./NewPlayList";
import { myContext } from "../../theme";
import { PlaylistData } from "../../util/Type";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import defaultProfile from "../../util/img/mainIcon.png";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const MainWrapper = styled.div`
  width: 100vw;
  max-width: 900px;
  min-width: 300px;
  margin-top: 20px;
  padding: 10px 20px 10px 20px;
`;

export const TitleArea = styled.div`
  height: 75px;
  display: flex;
  white-space: normal;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.borderLine};
  padding: 0 10px 0 10px;

  > .inputTitle {
    width: 700px;
    font-size: 21px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    color: ${(props) => props.theme.color.mainText};
    margin-right: 10px;
    padding: 10px 8px 10px 8px;
    border-radius: 4px;
    border: none;
    border: 1px solid ${(props) => props.theme.color.borderLine};
    background-color: ${(props) => props.theme.color.inputBackground};

    &:focus {
      outline: none;
    }

    @media screen and (max-width: 721px) {
      font-size: 19px;
    }
  }
`;

export const SubmitButton = styled.button`
  font-size: 14px;
  color: ${(props) => props.theme.color.signatureText};
  font-weight: ${(props) => props.theme.font.titleWeight};
  background-color: ${(props) => props.theme.color.signature};
  border: none;
  width: 100px;
  min-width: 60px;
  height: 35px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.signatureHover};
  }
`;

export const AlbumCoverArea = styled.div`
  display: flex;
  margin: 30px 0 30px 0;
  padding: 0 10px 0 10px;
`;

export const CoverImg = styled.img`
  width: 180px;
  height: 180px;
  margin-right: 30px;
  border-radius: 4px;
  object-fit: cover;
  background-color: ${(props) => props.theme.color.background};

  @media screen and (max-width: 721px) {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
`;

export const InfoArea = styled.div`
  width: 650px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  color: ${(props) => props.theme.color.mainText};
`;

export const User = styled.div`
  font-size: 14px;

  > .text {
    font-size: 13px;
    margin-right: 50px;
    color: ${(props) => props.theme.color.subText};

    @media screen and (max-width: 721px) {
      margin-right: 20px;
    }
  }
`;

export const AlbumInfoArea = styled.div`
  padding: 30px 10px 80px 10px;
  border-top: 1px solid ${(props) => props.theme.color.borderLine};

  > .playTitle {
    font-size: 19px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    margin-bottom: 20px;
    color: ${(props) => props.theme.color.mainText};
  }

  > .playContent {
    color: ${(props) => props.theme.color.mainText};
    width: 100%;
    height: 200px;

    > .ql-toolbar {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border: none;
      border: 1px solid ${(props) => props.theme.color.borderLine};
      background-color: ${(props) => props.theme.color.inputBackground};
    }

    > .ql-container {
      font-size: 15px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border: none;
      border: 1px solid ${(props) => props.theme.color.borderLine};
      background-color: ${(props) => props.theme.color.inputBackground};

      > .ql-editor::before {
        color: gray;
        font-style: normal;
      }
    }
  }
`;

export const PlayListArea = styled.div`
  padding: 30px 10px 100px 10px;
  border-top: 1px solid ${(props) => props.theme.color.borderLine};

  > .playTitle {
    display: flex;
    align-items: center;
    font-size: 19px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    margin-bottom: 20px;
    color: ${(props) => props.theme.color.mainText};

    > .playCount {
      font-size: 15px;
      margin: 0 0 3px 5px;
      color: ${(props) => props.theme.color.subText};
    }
  }
`;

export const UrlInput = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  position: relative;

  > input {
    font-size: 15px;
    color: ${(props) => props.theme.color.mainText};
    width: 1300px;
    resize: none;
    border-radius: 4px;
    padding: 10px 40px 10px 8px;
    border: none;
    border: 1px solid ${(props) => props.theme.color.borderLine};
    background-color: ${(props) => props.theme.color.inputBackground};

    &:focus {
      outline: none;
    }
  }

  > .sumbit {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    width: 45px;
    height: 40px;
    border: none;
    color: ${(props) => props.theme.color.subText};
    border-radius: 4px;
    background-color: transparent;
    cursor: pointer;
  }
`;

function NewMain() {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newBody, setNewBody] = useState<string>("");
  const [newPlayList, setNewPlayList] = useState<PlaylistData[]>([]);
  const [newUrl, setNewUrl] = useState<string>("");

  const navigate = useNavigate();
  const { currentUser }: any = useContext(myContext);
  const today: string = new Date().toISOString().substring(0, 10);

  // 다이어리 post 요청
  const submitHandler = async () => {
    if (newTitle.length <= 100 && newTitle.length !== 0 && newPlayList.length !== 0) {
      const newDiary = {
        title: newTitle,
        body: newBody,
        playlists: newPlayList,
      };
      await TOKEN_API.post(`/diary`, newDiary);
      navigate(`/`);
    } else if (newTitle.length === 0 && newTitle.length === 0) {
      toast.error("제목을 입력해 주세요.");
    } else if (newTitle.length > 100) {
      toast.error("제목의 길이를 줄여주세요.");
    } else {
      toast.error("플레이리스트를 등록해 주세요.");
    }
  };

  // 제목 수정 체인지 이벤트
  const changeNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  // 플레이리스트 수정 체인지 이벤트
  const changeNewUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUrl(e.target.value);
  };

  // 전체 url을 입력받은 후 id만 필터링
  const filteredUrlId = (allUrl: string) => {
    if (allUrl.indexOf("/watch") > -1) {
      const arr = allUrl.replaceAll(/=|&/g, "?").split("?");
      return arr[arr.indexOf("v") + 1];
    } else if (allUrl.indexOf("/youtu.be") > -1) {
      const arr = allUrl.replaceAll(/=|&|\//g, "?").split("?");
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
      return res.data.items[0]?.snippet;
    } catch (err) {
      console.error(err);
    }
  };

  // 추가 버튼 클릭 시 플레이리스트 담는 이벤트 핸들러
  const addPlayList = () => {
    // 플레이리스트 등록 개수 제한(리스트가 20개 이상일 경우 alert 발생)
    if (newPlayList.length >= 20) {
      return toast.error("플레이리스트는 최대 20개까지만 등록 가능합니다.");
    }

    const musicInfo: PlaylistData = {};
    let urlId = filteredUrlId(newUrl);

    // 새로 추가할 리스트의 url과 newPlayList에 담겨있는 리스트들의 url 중 동일한 url이 있을 경우
    // urlId를 "sameUrl"로 바꾸고 플레이리스트 추가 제한
    newPlayList.map((value) => {
      if (value.url === newUrl) {
        urlId = "sameUrl";
      }
    });
    if (urlId === "sameUrl") {
      return toast.error("이미 추가한 플레이리스트 입니다.");
    }

    let check = false;
    getYoutubeData(urlId)
      .then((res) => {
        if (res) {
          check = true;
          musicInfo.channelId = res.channelId;
          if (res.thumbnails.maxres) {
            musicInfo.thumbnail = res.thumbnails.maxres.url;
          } else {
            musicInfo.thumbnail = res.thumbnails.medium.url;
          }
          musicInfo.title = res.title;
          musicInfo.url = newUrl;
        } else {
          return toast.error("url을 다시 확인해 주세요.");
        }
      })
      .then(() => {
        if (check) {
          setNewPlayList((value) => [...value, musicInfo]);
          setNewUrl("");
        }
      });
  };

  return (
    <MainContainer>
      <MainWrapper>
        <TitleArea>
          <input
            className='inputTitle'
            type='text'
            placeholder='제목을 입력하세요'
            onChange={changeNewTitle}
          />
          <SubmitButton onClick={submitHandler}>등록하기</SubmitButton>
        </TitleArea>
        <AlbumCoverArea>
          <CoverImg
            src={newPlayList[0]?.thumbnail ? newPlayList[0]?.thumbnail : defaultProfile}
            alt='다이어리 썸네일'
          />
          <InfoArea>
            <UserInfo>
              <User>
                <span className='text'>등록자</span>
                {currentUser.nickname}
              </User>
            </UserInfo>
            <UserInfo>
              <User>
                <span className='text'>등록일</span>
                {today.toString()}
              </User>
            </UserInfo>
          </InfoArea>
        </AlbumCoverArea>
        <AlbumInfoArea>
          <div className='playTitle'>다이어리 소개</div>
          <ReactQuill
            className='playContent'
            placeholder='나만의 다이어리를 작성해 보세요'
            onChange={(e) => setNewBody(e)}
          />
        </AlbumInfoArea>
        <PlayListArea>
          <div className='playTitle'>
            다이어리 수록곡 <span className='playCount'>({newPlayList.length})</span>
          </div>
          <UrlInput>
            <input
              value={newUrl}
              placeholder='유튜브 url을 추가해 주세요'
              onChange={changeNewUrl}
            />
            <button className='sumbit' onClick={addPlayList} disabled={newUrl.length === 0}>
              <FiPlus size={25} />
            </button>
          </UrlInput>
          {newPlayList?.map((value, index) => {
            return (
              <NewPlayList
                list={value}
                key={index}
                newPlayList={newPlayList}
                setNewPlayList={setNewPlayList}
              />
            );
          })}
        </PlayListArea>
      </MainWrapper>
    </MainContainer>
  );
}

export default NewMain;
