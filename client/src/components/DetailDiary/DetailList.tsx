import styled from "styled-components";
import * as NewMain from "../NewDiary/NewMain";
import CommentList from "./CommentList";
import DetailPlayList from "./DetailPlayList";
import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { DiaryData } from "../../util/Type";
import { TOKEN_API } from "../../util/API";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import DOMPurify from "dompurify";
import { myContext } from "../../theme";
import { toast } from "react-toastify";
import mainIcon from "../../util/img/mainIcon.png";
import axios from "axios";

const TitleArea = styled.div`
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.borderLine};
  padding: 0 5px 0 5px;

  > .DetailTitle {
    width: 700px;
    font-size: ${(props) => props.theme.font.diaryMainTitleSize}px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    color: ${(props) => props.theme.color.mainText};

    @media screen and (max-width: 721px) {
      font-size: 19px;
    }
  }
`;

const ButtonArea = styled.div`
  display: flex;
  position: relative;

  > .detailDropdownButton {
    display: flex;
    justify-content: flex-end;
    width: 30px;
    color: ${(props) => props.theme.color.mainText};
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const DeleteModalBack = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const DeleteModalView = styled.div`
  text-align: center;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.background};
  width: 80%;
  max-width: 400px;
  height: 200px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .deleteModalTitle {
    color: ${(props) => props.theme.color.mainText};
    font-size: ${(props) => props.theme.font.diarySubTitleSize}px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    text-align: center;
    margin: 30px 15px 35px 15px;
  }

  > .warningText {
    color: ${(props) => props.theme.color.subText};
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    font-weight: ${(props) => props.theme.font.contentWeight};
    margin: 0 15px 43px 15px;
  }

  > button {
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    width: 50%;
    height: 50px;
    border: none;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }

  > .deleteCancelButton {
    color: ${(props) => props.theme.color.subText};
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.color.borderLine};
    border-right: 0.5px solid ${(props) => props.theme.color.borderLine};
    border-bottom-left-radius: 4px;

    &:hover {
      background-color: ${(props) => props.theme.color.buttonHover};
    }
  }

  > .deleteButton {
    color: #ec1d36;
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.color.borderLine};
    border-left: 0.5px solid ${(props) => props.theme.color.borderLine};
    border-bottom-right-radius: 4px;

    &:hover {
      background-color: ${(props) => props.theme.color.buttonHover};
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  color: ${(props) => props.theme.color.mainText};
`;

const LikeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  padding: 5px;
  background-color: transparent;
  color: ${(props) => props.theme.color.mainText};
  width: 80px;
  height: 35px;
  font-weight: ${(props) => props.theme.font.contentWeight};
  border: 1px solid ${(props) => props.theme.color.borderLine};
  border-radius: 50px;
  cursor: pointer;

  > .likeIcon {
    color: #ec1d36;
  }

  > .unLikeIcon {
    color: ${(props) => props.theme.color.mainText};
  }

  > .likeCount {
    margin-left: 5px;
  }

  &:hover {
    background-color: ${(props) => props.theme.color.buttonHover};
  }

  // 721px 이하에서 헤더의 새 다이어리 작성 버튼 숨김 적용
  @media screen and (max-width: 721px) {
    display: none;
  }
`;

const Dropdown = styled.ul`
  width: 150px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
  background-color: ${(props) => props.theme.color.inputBackground};
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 35px;
  right: 1px;
  list-style: none;
  z-index: 999;
  cursor: pointer;

  > a {
    padding: 12px;
    text-decoration: none;

    &:hover {
      border-radius: 4px;
      background-color: ${(props) => props.theme.color.dropDownHover};
    }
  }

  > li {
    padding: 12px;
    text-decoration: none;

    &:hover {
      border-radius: 4px;
      background-color: ${(props) => props.theme.color.dropDownHover};
    }
  }

  // 722px 이상에서 드롭다운의 좋아요 버튼 숨김 적용
  > li:first-child {
    @media screen and (min-width: 722px) {
      display: none;
    }
  }
`;

const DropdownLikeButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: ${(props) => props.theme.color.mainText};
  font-size: 14px;
  font-weight: ${(props) => props.theme.font.contentWeight};
  border: none;
  cursor: pointer;

  > .likeIcon {
    margin-right: 12px;
    color: #ec1d36;
  }

  > .unLikeIcon {
    margin-right: 12px;
  }

  > .likeText {
    margin-right: 10px;
  }

  > .likeCount {
    font-size: 13.5px;
    margin-bottom: 1px;
  }
`;

const DropdownEditButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: ${(props) => props.theme.color.mainText};
  border: none;
  font-size: 14px;
  font-weight: ${(props) => props.theme.font.contentWeight};
  cursor: pointer;

  > .editIcon {
    margin-right: 12px;
    margin-left: 1px;
    margin-bottom: 1px;
  }
`;

const DropdownDeleteButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: ${(props) => props.theme.color.mainText};
  border: none;
  font-size: 14px;
  font-weight: ${(props) => props.theme.font.contentWeight};
  cursor: pointer;

  > .deleteIcon {
    margin-right: 12px;
  }
`;

const AlbumInfoArea = styled.div`
  padding: 30px 5px 30px 5px;
  border-top: 1px solid ${(props) => props.theme.color.borderLine};

  > .playTitle {
    font-size: ${(props) => props.theme.font.diarySubTitleSize}px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    margin-bottom: 20px;
    color: ${(props) => props.theme.color.mainText};
  }

  > .playContent {
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    color: ${(props) => props.theme.color.mainText};
  }
`;

const PlayListArea = styled.div`
  padding: 30px 5px 30px 5px;
  border-top: 1px solid ${(props) => props.theme.color.borderLine};

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
`;

const CommentInputArea = styled.div`
  border-top: 1px solid ${(props) => props.theme.color.borderLine};
  padding: 30px 0 30px 0;

  > .commentTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme.color.mainText};
    padding: 0 5px 0 5px;
    margin-bottom: 20px;

    > .commentText {
      display: flex;
      align-items: center;
      font-size: ${(props) => props.theme.font.diarySubTitleSize}px;
      font-weight: ${(props) => props.theme.font.titleWeight};

      > .commentCount {
        font-size: ${(props) => props.theme.font.diaryContentSize}px;
        margin: 0 0 3px 5px;
        color: ${(props) => props.theme.color.subText};
      }
    }

    > .commentRule {
      display: flex;
      align-items: center;
      font-size: 13px;
      font-weight: ${(props) => props.theme.font.titleWeight};
      cursor: pointer;

      > .ruleIcon {
        margin-right: 5px;
      }

      @media screen and (max-width: 721px) {
        display: none;
      }
    }
  }
`;

const TextArea = styled.div`
  display: flex;
  padding: 0 5px 0 5px;

  > textArea {
    color: ${(props) => props.theme.color.mainText};
    width: 1300px;
    height: 70px;
    resize: none;
    font-size: 14px;
    margin: 0 10px 30px 0;
    border-radius: 4px;
    padding: 10px 8px 10px 8px;
    border: none;
    border: 1px solid ${(props) => props.theme.color.borderLine};
    background-color: ${(props) => props.theme.color.inputBackground};

    &:focus {
      outline: none;
    }
  }

  > .sumbit {
    min-width: 80px;
    height: 70px;
    border: none;
    font-size: 14px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    color: ${(props) => props.theme.color.signatureText};
    border-radius: 4px;
    background-color: ${(props) => props.theme.color.signature};
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.color.signatureHover};
    }

    @media screen and (max-width: 721px) {
      min-width: 60px;
    }
  }
`;

const RuleModalView = styled.div`
  text-align: center;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.background};
  width: 80%;
  max-width: 500px;
  height: 300px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .ruleModalTitle {
    color: ${(props) => props.theme.color.mainText};
    font-size: ${(props) => props.theme.font.diarySubTitleSize}px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    text-align: center;
    margin: 30px 15px 35px 15px;
  }

  > .warningText {
    color: ${(props) => props.theme.color.subText};
    font-weight: ${(props) => props.theme.font.contentWeight};
    line-height: 30px;
    text-align: left;
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    margin: 0 15px 42px 15px;
  }

  > button {
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    width: 100%;
    height: 50px;
    border: none;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }

  > .confirmButton {
    color: ${(props) => props.theme.color.subText};
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.color.borderLine};
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;

    &:hover {
      background-color: ${(props) => props.theme.color.buttonHover};
    }
  }
`;

interface DiaryDataProps {
  list: DiaryData;
  getDetailData: React.Dispatch<React.SetStateAction<object>>;
  // likeData: any;
  // getLikeData: any;
}

function DetailList({ list, getDetailData }: DiaryDataProps) {
  const [checkLike, setCheckLike] = useState<boolean>(false);
  const [commentBody, setCommentBody] = useState<string>("");
  const [withDrawalModalOpen, setWithdrawalModalOpen] = useState<boolean>(false);
  const [ruleModal, setRuleModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const commentData = list.comments; // 선택한 다이어리의 코멘트 정보
  const playlistData = list.playlists; // 선택한 플레이리스트의 정보

  const { diaryId } = useParams();
  const navigate = useNavigate();
  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const { isLogin, currentUser }: any = useContext(myContext);
  const myDiary: boolean = list.userNickname === currentUser?.nickname;

  // 드롬다운 오픈 이벤트 핸들러
  const openDropdown = (e: any) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleOutsideClose = (e: any) => {
      if (isOpen && !dropMenuRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("click", handleOutsideClose);
    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isOpen]);

  // 좋아요 post/delete 요청
  const plusLikeCount = async () => {
    try {
      const newLike = {
        userId: currentUser.userId,
        diaryId: diaryId,
      };
      const res = await TOKEN_API.post(`/likes/${diaryId}`, newLike);
      getDetailData(res.data);
    } catch (err: any) {
      if (err.response?.status === 500) {
        const res = await TOKEN_API.delete(`/likes/${diaryId}`);
        getDetailData(res.data);
      }
    }
  };

  // 다이어리 삭제 모달 오픈 이벤트 핸들러
  const openModalHandler = () => {
    setWithdrawalModalOpen(!withDrawalModalOpen);
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
  };

  // 다이어리 삭제 모달 클로즈 이벤트 핸들러
  const closeModalHandler = () => {
    setWithdrawalModalOpen(!withDrawalModalOpen);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  // 선택한 다이어리 delete 요청
  const postDelete = async () => {
    await TOKEN_API.delete(`/diary/${diaryId}`);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    navigate("/");
  };

  // 댓글 post 요청
  const submitHandler = async () => {
    if (isLogin) {
      const newComment = {
        diaryId: diaryId,
        body: commentBody,
      };
      const res = await TOKEN_API.post(`/comment`, newComment);
      getDetailData(res.data);
      setCommentBody("");
    } else {
      toast.error("로그인 후 이용해 주세요.");
    }
  };

  // 댓글 작성 체인지 이벤트
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBody(e.target.value);
  };

  // 댓글 운영 원칙 오픈 모달 오픈 이벤트 핸들러
  const openRuleModalHandler = () => {
    setRuleModal(!ruleModal);
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
  };

  // 댓글 운영 원칙 모달 클로즈 이벤트 핸들러
  const closeRuleModalHandler = () => {
    setRuleModal(!ruleModal);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  const replaceImg = (e: any) => {
    e.target.src = mainIcon;
  };

  return (
    <NewMain.MainContainer>
      <NewMain.MainWrapper>
        <TitleArea>
          <div className='DetailTitle'>{list.title}</div>
          <ButtonArea>
            {myDiary === true ? (
              <>
                <button className='detailDropdownButton' onClick={openDropdown}>
                  <BsThreeDotsVertical size={17} />
                </button>
                <div ref={dropMenuRef}>
                  {isOpen ? (
                    <Dropdown>
                      <li onClick={plusLikeCount}>
                        <DropdownLikeButton>
                          {checkLike === true ? (
                            <AiFillHeart className='likeIcon' size={19} />
                          ) : (
                            <AiOutlineHeart className='unLikeIcon' size={19} />
                          )}
                          <div className='likeText'>좋아요</div>
                          <div className='likeCount'>{list.likeCount}</div>
                        </DropdownLikeButton>
                      </li>
                      <Link to={`/EditDiary/${list.diaryId}`}>
                        <li>
                          <DropdownEditButton>
                            <FiEdit className='editIcon' size={17} />
                            <div className='editText'>수정</div>
                          </DropdownEditButton>
                        </li>
                      </Link>
                      <li onClick={openModalHandler}>
                        <DropdownDeleteButton>
                          <BsTrash className='deleteIcon' size={18} />
                          <div className='deleteText'>삭제</div>
                        </DropdownDeleteButton>
                      </li>
                    </Dropdown>
                  ) : null}
                </div>
              </>
            ) : null}
            {withDrawalModalOpen ? (
              <DeleteModalBack>
                <DeleteModalView>
                  <div className='deleteModalTitle'>다이어리를 삭제 하시겠습니까?</div>
                  <div className='warningText'>삭제한 다이어리는 복구되지 않습니다.</div>
                  <button className='deleteCancelButton' onClick={closeModalHandler}>
                    취소
                  </button>
                  <button
                    className='deleteButton'
                    onClick={() => {
                      postDelete();
                      closeModalHandler();
                    }}
                  >
                    삭제
                  </button>
                </DeleteModalView>
              </DeleteModalBack>
            ) : null}
          </ButtonArea>
        </TitleArea>
        <NewMain.AlbumCoverArea>
          <NewMain.CoverImg
            src={list.playlists[0]?.thumbnail ? list.playlists[0]?.thumbnail : mainIcon}
            alt='첫번째 앨범 커버'
            onError={replaceImg}
          />
          <NewMain.InfoArea>
            <UserInfo>
              <NewMain.User>
                <span className='text'>등록자</span>
                {list.userNickname}
              </NewMain.User>
              <LikeButton onClick={plusLikeCount}>
                {checkLike === true ? (
                  <AiFillHeart className='likeIcon' size={17} />
                ) : (
                  <AiOutlineHeart className='unLikeIcon' size={17} />
                )}
                <span className='likeCount'>{list.likeCount}</span>
              </LikeButton>
            </UserInfo>
            <UserInfo>
              <NewMain.User>
                <span className='text'>등록일</span>
                {list.createdAt.substring(0, 10)}
              </NewMain.User>
            </UserInfo>
          </NewMain.InfoArea>
        </NewMain.AlbumCoverArea>
        <AlbumInfoArea>
          <div className='playTitle'>다이어리 소개</div>
          <div
            className='playContent'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(list.body) }}
          ></div>
        </AlbumInfoArea>
        <PlayListArea>
          <div className='playTitle'>
            다이어리 수록곡 <span className='playCount'>({playlistData.length})</span>
          </div>
          {playlistData?.map((value, index) => {
            return <DetailPlayList list={value} key={index} />;
          })}
        </PlayListArea>
        <CommentInputArea>
          <div className='commentTitle'>
            <div className='commentText'>
              댓글 <span className='commentCount'>({commentData.length})</span>
            </div>
            <div className='commentRule' onClick={openRuleModalHandler}>
              <RiErrorWarningLine className='ruleIcon' size={16} />
              댓글 운영 원칙
            </div>
            {ruleModal ? (
              <DeleteModalBack>
                <RuleModalView>
                  <div className='ruleModalTitle'>나만의 작은 음악 다이어리 댓글 운영 원칙</div>
                  <div className='warningText'>
                    <div>1. 욕설 및 비방 글을 등록하지 말아 주세요</div>
                    <div>2. 동일한 내용의 글을 반복해서 등록하지 말아 주세요.</div>
                    <div>3. 홍보 및 상업성 글을 등록하지 말아 주세요.</div>
                    <div>4. 본인 및 타인의 개인 정보를 유출하지 말아 주세요.</div>
                  </div>
                  <button className='confirmButton' onClick={closeRuleModalHandler}>
                    확인
                  </button>
                </RuleModalView>
              </DeleteModalBack>
            ) : null}
          </div>
          <TextArea>
            <textarea
              value={commentBody}
              placeholder='댓글을 작성하세요'
              onChange={changeHandler}
            />
            <button className='sumbit' onClick={submitHandler} disabled={commentBody.length === 0}>
              등록
            </button>
          </TextArea>
          {commentData?.map((value) => {
            return <CommentList list={value} key={value.commentId} getDetailData={getDetailData} />;
          })}
        </CommentInputArea>
      </NewMain.MainWrapper>
    </NewMain.MainContainer>
  );
}

export default DetailList;
