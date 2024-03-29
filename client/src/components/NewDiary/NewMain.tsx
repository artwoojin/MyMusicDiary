import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TOKEN_API } from "../../util/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import NewPlayList from "./NewPlayList";
import { PlaylistData } from "../../util/type";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { AiFillYoutube } from "react-icons/ai";
import mainIcon from "../../assets/images/mainIcon.png";
import Modal from "../common/Modal";
import { mainDiaryRejected } from "../../redux/slice/loading";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

export default function NewMain() {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newTag, setNewTag] = useState<string[]>([]);
  const [newBody, setNewBody] = useState<string>("");
  const [newPlayList, setNewPlayList] = useState<PlaylistData[]>([]);
  const [newUrl, setNewUrl] = useState<string>("");
  const [postCancelModalOpen, setPostCancelModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUserInfo = useAppSelector((state) => state.loginReducer.currentUserInfo);
  const today: string = new Date().toISOString().substring(0, 10);

  // 새 다이어리 작성 페이지 진입 시 메인 다이어리 상태 true로 변경
  useEffect(() => {
    dispatch(mainDiaryRejected());
  }, []);

  // 다이어리 post 요청
  const submitHandler = async () => {
    try {
      if (
        newTitle.length <= 50 &&
        newTitle.length !== 0 &&
        newTag.length !== 0 &&
        newBody.length !== 0 &&
        newPlayList.length !== 0
      ) {
        const newDiary = {
          title: newTitle,
          tags: newTag,
          body: newBody,
          playlists: newPlayList,
        };
        await TOKEN_API.post(`/diary`, newDiary);
        navigate(`/`);
      } else if (newTitle.length === 0) {
        toast.error("제목을 입력해 주세요.");
      } else if (newTitle.length > 50) {
        toast.error("제목은 50글자 이하로 작성해주세요.");
      } else if (newTag.length === 0) {
        toast.error("태그를 1개 이상 선택해주세요.");
      } else if (newBody.length === 0) {
        toast.error("다어어리 소개글을 작성해주세요.");
      } else if (newPlayList.length === 0) {
        toast.error("플레이리스트를 등록해 주세요.");
      }
    } catch (err) {
      console.error(err);
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
  const getYoutubeData = async (id: string | undefined) => {
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
  const addPlayList = async () => {
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
    const res = await getYoutubeData(urlId);
    if (res) {
      check = true;
      if (res.thumbnails.maxres) {
        musicInfo.thumbnail = res.thumbnails.maxres.url;
      } else {
        musicInfo.thumbnail = res.thumbnails.medium.url;
      }
      musicInfo.title = res.title;
      musicInfo.url = newUrl;
      if (res.channelTitle.includes("Topic")) {
        musicInfo.channelTitle = res.channelTitle.substring(
          0,
          res.channelTitle.indexOf(" - Topic")
        );
      } else {
        musicInfo.channelTitle = res.channelTitle;
      }
    } else {
      return toast.error("url을 다시 확인해 주세요.");
    }
    if (check) {
      setNewPlayList((value) => [...value, musicInfo]);
      setNewUrl("");
    }
  };

  const replaceImg = (e: any) => {
    e.target.src = mainIcon;
  };

  // 드롭다운 선택 시 태그 추가하는 이벤트 핸들러
  const addCategory = (value: string) => {
    if (value !== "") {
      if (newTag.length <= 3 && !newTag.includes(value)) {
        setNewTag([...newTag, value]);
      } else if (newTag.length === 4) {
        toast.error("태그는 4개까지만 추가할 수 있습니다.");
      } else if (newTag.includes(value)) {
        toast.error("이미 추가한 태그입니다.");
      }
    }
  };

  // 태그 삭제 이벤트 핸들러
  const removeTags = (deleteIndex: any) => {
    setNewTag(newTag.filter((value: any) => value !== newTag[deleteIndex]));
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

  // 다이어리 등록 취소 모달 오픈 이벤트 핸들러
  const openModalHandler = () => {
    setPostCancelModalOpen(!postCancelModalOpen);
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
  };

  // 다이어리 등록 취소 모달 클로즈 이벤트 핸들러
  const closeModalHandler = () => {
    setPostCancelModalOpen(!postCancelModalOpen);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  // 다이어리 등록 페이지 나기기 이벤트 핸들러
  const backPage = () => {
    navigate(-1);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  return (
    <MainContainer>
      <MainWrapper>
        <TitleArea>
          <input
            className='inputTitle'
            type='text'
            placeholder='제목을 작성해 주세요'
            onChange={changeNewTitle}
          />
        </TitleArea>
        <AlbumCoverArea>
          <CoverImg
            src={newPlayList[0]?.thumbnail ? newPlayList[0]?.thumbnail : mainIcon}
            alt='다이어리 썸네일'
            onError={replaceImg}
          />
          <InfoArea>
            <UserInfo>
              <User>
                <span className='text'>등록자</span>
                {currentUserInfo.nickname}
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
        <TagArea>
          <div className='tagTitle'>다이어리 태그</div>
          <TagDropdown>
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
            <Tag>
              {newTag.map((value: string, index: number) => (
                <li key={index}>
                  <div className='tagTitle'>{value}</div>
                  <div className='tagcloseBtn' onClick={() => removeTags(index)}>
                    <IoIosClose size={20} />
                  </div>
                </li>
              ))}
            </Tag>
          </TagDropdown>
        </TagArea>
        <AlbumInfoArea>
          <div className='playTitle'>다이어리 소개</div>
          <ReactQuill
            className='playContent'
            placeholder='나만의 다이어리를 작성해 보세요'
            onChange={(e) => setNewBody(e)}
          />
        </AlbumInfoArea>
        <PlayListArea>
          <PlayTitleArea>
            <div className='playTitle'>
              다이어리 수록곡 <span className='playCount'>({newPlayList.length})</span>
            </div>
            <Link to='https://www.youtube.com/' target='_blank'>
              <AiFillYoutube className='youtubeIcon' size={30} />
            </Link>
          </PlayTitleArea>
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
          {newPlayList.length >= 1 ? (
            <>
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
            </>
          ) : (
            <EmptyPlayListText>추가한 플레이리스트가 없습니다.</EmptyPlayListText>
          )}
        </PlayListArea>
        <SubmitArea>
          <button className='cancelButton' onClick={openModalHandler}>
            나가기
          </button>
          {postCancelModalOpen ? (
            <Modal
              title={"작성 페이지를 나가시겠습니까?"}
              text={"작성 중인 내용은 저장되지 않습니다."}
              confirmText={"나가기"}
              cancelHandler={closeModalHandler}
              confirmHandler={backPage}
            />
          ) : null}
          <button className='submitButton' onClick={submitHandler}>
            등록
          </button>
        </SubmitArea>
      </MainWrapper>
    </MainContainer>
  );
}

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const MainWrapper = styled.div`
  width: 100vw;
  max-width: 900px;
  margin-top: 20px;
  padding: 10px;
`;

export const TitleArea = styled.div`
  height: 75px;
  display: flex;
  white-space: normal;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.borderLine};
  padding: 0 5px 0 5px;

  > .inputTitle {
    width: 100%;
    font-size: ${(props) => props.theme.font.diaryMainTitleSize}px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    color: ${(props) => props.theme.color.mainText};
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

export const AlbumCoverArea = styled.div`
  display: flex;
  margin: 30px 0 30px 0;
  padding: 0 5px 0 5px;
`;

export const CoverImg = styled.img`
  width: 180px;
  height: 180px;
  margin-right: 30px;
  border-radius: 4px;
  object-fit: cover;
  background-color: ${(props) => props.theme.color.background};

  @media screen and (max-width: 721px) {
    width: 120px;
    height: 120px;
    margin-right: 20px;
  }
`;

export const InfoArea = styled.div`
  width: 650px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  color: ${(props) => props.theme.color.mainText};
`;

export const User = styled.div`
  font-size: 13px;

  > .text {
    font-size: 13px;
    margin-right: 50px;
    color: ${(props) => props.theme.color.subText};

    @media screen and (max-width: 721px) {
      display: none;
    }
  }
`;

export const TagArea = styled.div`
  padding: 30px 5px 30px 5px;
  border-top: 1px solid ${(props) => props.theme.color.borderLine};

  > .tagTitle {
    font-size: ${(props) => props.theme.font.diarySubTitleSize}px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    margin-bottom: 20px;
    color: ${(props) => props.theme.color.mainText};
  }
`;

export const TagDropdown = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 45px;
  padding: 0 5px 0 5px;
  border: 1px solid ${(props) => props.theme.color.borderLine};
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.inputBackground};

  > .tagDropDown {
    font-size: 13px;
    height: 40px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    margin-right: 12px;
    border: none;
    color: ${(props) => props.theme.color.mainText};
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }
`;

export const Tag = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 5px;
  padding: 5px 0 5px 0;
  color: ${(props) => props.theme.color.mainText};

  > li {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 4px 4px 4px 10px;
    border: 1px solid ${(props) => props.theme.color.borderLine};
    border-radius: 50px;

    > .tagcloseBtn {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
`;

export const AlbumInfoArea = styled.div`
  padding: 30px 5px 80px 5px;
  border-top: 1px solid ${(props) => props.theme.color.borderLine};

  > .playTitle {
    font-size: ${(props) => props.theme.font.diarySubTitleSize}px;
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
      font-size: ${(props) => props.theme.font.diaryContentSize}px;
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
  padding: 30px 5px 30px 5px;
  border-top: 1px solid ${(props) => props.theme.color.borderLine};
  border-bottom: 1px solid ${(props) => props.theme.color.borderLine};
`;

export const PlayTitleArea = styled.div`
  display: flex;
  align-items: flex-start;

  > .playTitle {
    display: flex;
    align-items: center;
    font-size: ${(props) => props.theme.font.diarySubTitleSize}px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    margin-bottom: 20px;
    color: ${(props) => props.theme.color.mainText};

    > .playCount {
      font-size: ${(props) => props.theme.font.diaryContentSize}px;
      margin: 0 0 3px 5px;
      color: ${(props) => props.theme.color.subText};
    }
  }

  > a {
    margin: -3px 0 0 10px;
    color: ${(props) => props.theme.color.subText};
    cursor: pointer;

    &:hover {
      color: #ff0000;
    }
  }
`;

export const UrlInput = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  position: relative;

  > input {
    font-size: 14px;
    color: ${(props) => props.theme.color.mainText};
    width: 1300px;
    height: 45px;
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

export const EmptyPlayListText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  font-size: ${(props) => props.theme.font.diaryContentSize}px;
  color: ${(props) => props.theme.color.subText};
`;

export const SubmitArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 5px 50px 5px;

  > button {
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    color: ${(props) => props.theme.color.signatureText};
    font-weight: ${(props) => props.theme.font.titleWeight};
    border: none;
    width: 100px;
    min-width: 60px;
    height: 35px;
    border-radius: 4px;
    cursor: pointer;
  }

  > .cancelButton {
    margin-right: 8px;
    color: ${(props) => props.theme.color.subText};
    border: 1px solid ${(props) => props.theme.color.borderLine};
    background-color: transparent;

    &:hover {
      background-color: ${(props) => props.theme.color.buttonHover};
    }
  }

  > .submitButton {
    margin-left: 8px;
    color: ${(props) => props.theme.color.signatureText};
    background-color: ${(props) => props.theme.color.signature};

    &:hover {
      background-color: ${(props) => props.theme.color.signatureHover};
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
