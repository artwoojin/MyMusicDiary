import styled from "styled-components";
import { useState, useContext } from "react";
import { CommentData } from "../../util/Type";
import { TOKEN_API } from "../../util/API";
import { MyContext } from "../../util/MyContext";

export const CommentListContainer = styled.li`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${(props) => props.theme.color.borderLine};

  :last-child {
    border-bottom: none;
  }
`;

export const CommentListWrapper = styled.div`
  width: 100vw;
  max-width: 900px;
  border: none;
  padding: 0 5px 0 5px;

  .name {
    font-size: 14px;
    font-weight: ${(props) => props.theme.font.titleWeight};
    margin: 15px 0 15px 0;
    color: ${(props) => props.theme.color.mainText};
  }

  .content {
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    color: ${(props) => props.theme.color.mainText};
  }

  .date {
    font-size: 13px;
    margin: 10px 0 15px 0;
    color: ${(props) => props.theme.color.thirdText};
  }
`;

const NameArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditCommentArea = styled.input`
  color: ${(props) => props.theme.color.mainText};
  width: 100%;
  padding: 10px 8px 10px 8px;
  border: none;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.color.borderLine};
  background-color: ${(props) => props.theme.color.inputBackground};

  &:focus {
    outline: none;
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

interface CommentDataProps {
  list: CommentData;
  getDetailData: React.Dispatch<React.SetStateAction<object>>;
}

function CommentList({ list, getDetailData }: CommentDataProps) {
  const [commentContent, setCommentContent] = useState(list.body);
  const [click, setClick] = useState<boolean>(false);
  const [deleteCommentModal, setDeleteCommentModal] = useState<boolean>(false);

  const { currentUser }: any = useContext(MyContext);
  const myComment: boolean = list.userNickname === currentUser?.nickname;

  // 댓글 patch 요청
  const changeComment = async () => {
    const newComment = {
      diaryId: list.diaryId,
      commentId: list.commentId,
      body: commentContent,
    };
    const res = await TOKEN_API.patch(`/comment/${list.commentId}`, newComment);
    getDetailData(res.data);
    setClick(false);
  };

  // 댓글 delete 요청
  const commentDelete = async () => {
    const res = await TOKEN_API.delete(`/comment/${list.commentId}`);
    getDetailData(res.data);
  };

  // 댓글 변경 클릭 이벤트
  const clickHandler = () => {
    setClick(!click);
  };

  // 댓글 변경 체인지 이벤트
  const onChangeEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  // 댓글 운영 원칙 오픈 모달 오픈 이벤트 핸들러
  const openDeleteCommentModalHandler = () => {
    setDeleteCommentModal(!deleteCommentModal);
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
  };

  // 댓글 운영 원칙 모달 클로즈 이벤트 핸들러
  const closeDeleteModalHandler = () => {
    setDeleteCommentModal(!deleteCommentModal);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  return (
    <CommentListContainer>
      <CommentListWrapper>
        <NameArea>
          <div className='name'>{list.userNickname}</div>
          <ButtonArea>
            {myComment === true ? (
              <>
                {click ? (
                  <button className='edit' onClick={changeComment}>
                    저장
                  </button>
                ) : (
                  <button className='edit' onClick={clickHandler}>
                    수정
                  </button>
                )}
                <button className='delete' onClick={openDeleteCommentModalHandler}>
                  삭제
                </button>
              </>
            ) : null}
            {deleteCommentModal ? (
              <DeleteModalBack>
                <DeleteModalView>
                  <div className='deleteModalTitle'>댓글을 삭제 하시겠습니까?</div>
                  <div className='warningText'>삭제한 댓글은 복구되지 않습니다.</div>
                  <button className='deleteCancelButton' onClick={closeDeleteModalHandler}>
                    취소
                  </button>
                  <button
                    className='deleteButton'
                    onClick={() => {
                      commentDelete();
                      closeDeleteModalHandler();
                    }}
                  >
                    삭제
                  </button>
                </DeleteModalView>
              </DeleteModalBack>
            ) : null}
          </ButtonArea>
        </NameArea>
        {click ? (
          <EditCommentArea type='text' value={commentContent} onChange={onChangeEditInput} />
        ) : (
          <div className='content'>{list.body}</div>
        )}
        <div className='date'>{list.createdAt.substring(0, 10)}</div>
      </CommentListWrapper>
    </CommentListContainer>
  );
}

export default CommentList;
