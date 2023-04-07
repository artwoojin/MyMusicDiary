import styled from "styled-components";
import CommentList from "./CommentList";
import DetailPlayList from "./DetailPlayList";
import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryData } from "../../util/Type";
import { TOKEN_API } from "../../util/API";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import DOMPurify from "dompurify";
import { myContext } from "../../theme";
import { toast } from "react-toastify";

const DetailMainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailMainWrapper = styled.div`
  width: 100vw;
  max-width: 900px;
  min-width: 300px;
  margin-top: 20px;
  padding: 10px 20px 10px 20px;
`;

const TitleArea = styled.div`
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.borderLine};
  padding: 0 10px 0 10px;

  > .DetailTitle {
    width: 700px;
    font-size: 24px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    color: ${(props) => props.theme.color.mainText};
  }
`;

const ButtonArea = styled.div`
  display: flex;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    padding: 5px;
    background-color: transparent;
    cursor: pointer;
  }

  > .edit {
    /* 다이어리 수정 오류 때문에 임시로 수정 버튼 숨김처리  */
    display: none;
    width: 40px;
    color: ${(props) => props.theme.color.mainText};
    border: none;
    text-decoration: underline;
    font-weight: ${(props) => props.theme.font.titleWeight};
  }

  > .delete {
    width: 40px;
    color: ${(props) => props.theme.color.mainText};
    border: none;
    text-decoration: underline;
    font-weight: ${(props) => props.theme.font.titleWeight};
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
  width: 430px;
  height: 220px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .deleteModalTitle {
    color: ${(props) => props.theme.color.mainText};
    font-size: 20px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    text-align: center;
    margin: 30px 0 45px 0;
  }

  > .warningText {
    color: ${(props) => props.theme.color.subText};
    font-weight: ${(props) => props.theme.font.contentWeight};
    font-size: 15px;
    margin-bottom: 50.5px;
  }

  > button {
    font-weight: ${(props) => props.theme.font.titleWeight};
    width: 215px;
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
      background-color: ${(props) => props.theme.color.likeHover};
    }
  }

  > .deleteButton {
    color: #ec1d36;
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.color.borderLine};
    border-left: 0.5px solid ${(props) => props.theme.color.borderLine};
    border-bottom-right-radius: 4px;

    &:hover {
      background-color: ${(props) => props.theme.color.likeHover};
    }
  }
`;

const AlbumCoverArea = styled.div`
  display: flex;
  margin: 30px 0 30px 0;
  padding: 0 10px 0 10px;

  > .coverImg {
    width: 190px;
    height: 180px;
    margin-right: 30px;
    border-radius: 4px;
    background-color: lightgray;
    object-fit: cover;
  }
`;

const InfoArea = styled.div`
  width: 650px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.color.mainText};

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    padding: 5px;
    background-color: transparent;
    cursor: pointer;
  }
`;

const User = styled.div`
  font-size: 14px;

  > .text {
    margin-right: 50px;
  }
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

  > .likeCount {
    margin-left: 5px;
  }

  &:hover {
    background-color: ${(props) => props.theme.color.likeHover};
  }
`;

const AlbumInfoArea = styled.div`
  padding: 30px 10px 30px 10px;
  border-top: 1px solid ${(props) => props.theme.color.borderLine};

  > .playTitle {
    font-size: 19px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    margin-bottom: 20px;
    color: ${(props) => props.theme.color.mainText};
  }

  > .playContent {
    font-size: 15px;
    color: ${(props) => props.theme.color.mainText};
  }
`;

const PlayListArea = styled.div`
  padding: 30px 10px 30px 10px;
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

const CommentInputArea = styled.div`
  border-top: 1px solid ${(props) => props.theme.color.borderLine};
  padding: 30px 10px 30px 10px;

  > .commentTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme.color.mainText};
    margin-bottom: 20px;

    > .commentText {
      display: flex;
      align-items: center;
      font-size: 19px;
      margin-left: 5px;
      font-weight: ${(props) => props.theme.font.titleWeight};

      > .commentCount {
        font-size: 15px;
        margin: 0 0 3px 5px;
        color: ${(props) => props.theme.color.subText};
      }
    }

    > .commentRule {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: ${(props) => props.theme.font.titleWeight};
      margin-right: 5px;
      cursor: pointer;

      > .ruleIcon {
        margin-right: 5px;
      }
    }
  }
`;

const TextArea = styled.div`
  display: flex;

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
    border: 1px solid ${(props) => props.theme.color.disabledTagBorder};
    background-color: ${(props) => props.theme.color.disabledTagBackground};

    &:focus {
      outline: none;
    }
  }

  > .sumbit {
    width: 80px;
    min-width: 80px;
    height: 70px;
    border: none;
    font-size: 14px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    color: ${(props) => props.theme.color.TagColor};
    border-radius: 4px;
    background-color: ${(props) => props.theme.color.mainColor};
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.color.buttonHover};
    }
  }
`;

const RuleModalView = styled.div`
  text-align: center;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.background};
  width: 550px;
  height: 420px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .ruleModalTitle {
    color: ${(props) => props.theme.color.mainText};
    font-size: 20px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    text-align: center;
    margin: 30px 0 45px 0;
  }

  > .warningText {
    color: ${(props) => props.theme.color.subText};
    font-weight: ${(props) => props.theme.font.contentWeight};
    line-height: 30px;
    text-align: left;
    font-size: 15px;
    padding: 0 25px 0 25px;
    margin-bottom: 59px;
  }

  > button {
    font-weight: ${(props) => props.theme.font.titleWeight};
    width: 550px;
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
      background-color: ${(props) => props.theme.color.likeHover};
    }
  }
`;

interface DiaryDataProps {
  list: DiaryData;
  getDetailData: React.Dispatch<React.SetStateAction<object>>;
}

function DetailList({ list, getDetailData }: DiaryDataProps) {
  const [checkLike, setCheckLike] = useState<boolean>(false);
  const [commentBody, setCommentBody] = useState<string>("");
  const [withDrawalModalOpen, setWithdrawalModalOpen] = useState<boolean>(false);
  const [ruleModal, setRuleModal] = useState<boolean>(false);

  const commentData = list.comments; // 선택한 다이어리의 코멘트 정보
  const playlistData = list.playlists; // 선택한 플레이리스트의 정보

  const { diaryId } = useParams();
  const navigate = useNavigate();
  const { isLogin, currentUser }: any = useContext(myContext);
  const myDiary: boolean = list.userNickname === currentUser?.nickname;

  // 좋아요 버튼
  const plusLikeCount = async () => {
    if (checkLike === false) {
      // const like = {
      //   likeCount: list.likeCount + 1,
      // };
      // const res = await TOKEN_API.patch(`/diary/${diaryId}`, like);
      // getDetailData(res.data);
      setCheckLike(true);
    } else {
      // const like = {
      //   likeCount: list.likeCount - 1,
      // };
      // const res = await TOKEN_API.patch(`/diary/${diaryId}`, like);
      // getDetailData(res.data);
      setCheckLike(false);
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

  // 수정 페이지로 이동
  const moveEditDiary = () => {
    navigate(`/EditDiary/${list.diaryId}`);
  };

  return (
    <DetailMainContainer>
      <DetailMainWrapper>
        <TitleArea>
          <div className='DetailTitle'>{list.title}</div>
          <ButtonArea>
            {myDiary === true ? (
              <>
                <button className='edit' onClick={moveEditDiary}>
                  수정
                </button>
                <button className='delete' onClick={openModalHandler}>
                  삭제
                </button>
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
        <AlbumCoverArea>
          <img className='coverImg' src={list.playlists[0]?.thumbnail} alt='첫번째 앨범 커버' />
          <InfoArea>
            <UserInfo>
              <User>
                <span className='text'>등록자</span>
                {list.userNickname}
              </User>
              <LikeButton onClick={plusLikeCount}>
                {checkLike === true ? (
                  <AiFillHeart className='likeIcon' size={17} />
                ) : (
                  <AiOutlineHeart className='likeIcon' size={17} />
                )}
                <span className='likeCount'>{list.likeCount}</span>
              </LikeButton>
            </UserInfo>
            <UserInfo>
              <User>
                <span className='text'>등록일</span>
                {list.createdAt.substring(0, 10)}
              </User>
            </UserInfo>
          </InfoArea>
        </AlbumCoverArea>
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
                    <div>
                      2. 한 페이지 내에서 동일한 내용의 글을 반복적으로 3회 이상 등록하지 말아
                      주세요.
                    </div>
                    <div>3. 홍보 및 상업성 글을 등록하지 말아 주세요.</div>
                    <div>4. 음란성 글을 등록하지 말아 주세요.</div>
                    <div>5. 악성코드를 유포하지 말아주세요.</div>
                    <div>6. 본인 및 타인의 개인 정보를 유출하지 말아 주세요.</div>
                    <div>7. 반사회성 글을 등록하지 말아주세요.</div>
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
      </DetailMainWrapper>
    </DetailMainContainer>
  );
}

export default DetailList;
