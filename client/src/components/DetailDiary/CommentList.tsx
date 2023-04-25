import styled from "styled-components";
import { useState, useContext } from "react";
import { CommentData } from "../../util/Type";
import { TOKEN_API } from "../../util/API";
import { MyContext } from "../../util/MyContext";
import defaultProfile from "../../assets/images/defaultProfile.png";
import Modal from "../common/Modal";

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
  margin-bottom: 10px;
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

export const UserInfoArea = styled.div`
  display: flex;
  align-items: center;
`;

export const Profile = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 8px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${(props) => props.theme.color.inputBackground};
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
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
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

  const replaceImg = (e: any) => {
    e.target.src = defaultProfile;
  };

  return (
    <CommentListContainer>
      <CommentListWrapper>
        <NameArea>
          <UserInfoArea>
            <Profile
              src={list?.imageUrl ? list?.imageUrl : defaultProfile}
              alt='프로필 이미지'
              onError={replaceImg}
            />
            <div className='name'>{list.userNickname}</div>
          </UserInfoArea>
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
              <Modal
                title={"댓글을 삭제 하시겠습니까?"}
                text={"삭제한 댓글은 복구되지 않습니다."}
                confirmText={"삭제"}
                cancelHandler={closeDeleteModalHandler}
                confirmHandler={commentDelete}
              />
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
