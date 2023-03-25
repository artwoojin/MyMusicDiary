import styled from "styled-components";
import CommentList from "./CommentList";
import PlayList from "./PlayList";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { DiaryData } from "../../util/Type";
import { BASE_API } from "../../util/API";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const DetailMainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailMainWrapper = styled.div`
  width: 100vw;
  max-width: 1300px;
  min-width: 300px;
  padding: 10px 20px 10px 20px;
`;

const TitleArea = styled.div`
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  padding: 0 10px 0 10px;

  > .DetailTitle {
    font-size: 24px;
    color: #21252b;
    font-weight: 600;
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
  }

  > .edit {
    width: 40px;
    color: #21252b;
    border: none;
    text-decoration: underline;
    font-weight: 600;
  }

  > .delete {
    width: 40px;
    color: #21252b;
    border: none;
    text-decoration: underline;
    font-weight: 600;
  }

  > .like {
    color: #21252b;
    margin-left: 25px;
    width: 120px;
    height: 35px;
    border: 1px solid #d1d1d1;
    border-radius: 4px;

    > .likeIcon {
      color: red;
      margin-right: 5px;
    }

    > .likeCount {
      margin-left: 5px;
    }

    &:hover {
      background-color: #eeeeee;
    }
  }
`;

const AlbumCoverArea = styled.div`
  display: flex;
  margin: 30px 0 30px 0;

  > .coverImg {
    width: 190px;
    height: 180px;
    margin-right: 30px;
    background-color: lightgray;
  }
`;

const InfoArea = styled.div`
  width: 400px;
  margin-top: 5px;
  /* border: 1px solid red; */
`;

const UserInfo = styled.div`
  /* border: 1px solid blue; */
  margin-bottom: 15px;
  font-size: 14px;

  > .text {
    font-size: 13px;
    margin-right: 50px;
  }
`;

const AlbumInfoArea = styled.div`
  /* border: 1px solid blue; */
  padding: 30px 10px 30px 10px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;

  > .playTitle {
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 20px;
    /* border: 1px solid red; */
  }

  > .playContent {
    font-size: 14px;
    /* border: 1px solid red; */
  }
`;

const CommentInputArea = styled.div`
  font-size: 19px;
  font-weight: 500;
  margin-bottom: 20px;
  border-top: 1px solid #d9d9d9;
  padding: 30px 10px 30px 10px;
  /* border: 1px solid red; */

  > .commentTitle {
    display: flex;
    align-items: center;
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 20px;

    > .commentCount {
      margin-left: 5px;
      font-size: 15px;
    }
  }
`;

const TextArea = styled.div`
  display: flex;

  > .textArea {
    width: 1300px;
    height: 70px;
    resize: none;
    margin: 0 10px 30px 0;
    border: 1px solid #d1d1d1;
    border-radius: 4px;

    &:focus {
      outline: 0.5px solid gray;
      padding: 5px;
    }
  }

  > .sumbit {
    width: 90px;
    min-width: 90px;
    height: 70px;
    border: 1px solid #d1d1d1;
    color: #21252b;
    border-radius: 4px;
    background-color: transparent;
  }
`;

interface DiaryDataProps {
  list: DiaryData;
  getDetailData: React.Dispatch<React.SetStateAction<object>>;
}

function DetailList({ list, getDetailData }: DiaryDataProps) {
  const [checkLike, setCheckLike] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const commentData = list.comments; // 선택한 다이어리의 코멘트 정보
  const { diaryId } = useParams();
  const token = `eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiZ2dAZ21haWwuY29tIiwic3ViIjoiZ2dAZ21haWwuY29tIiwiaWF0IjoxNjc5NzI2NTU2LCJleHAiOjE2ODAzMjY1NTZ9.y2-PjQUPjcGsD5YQtU8ezxrh_bPEPGXe3YzJiXo-P_sNzDsS6w5IfVLaVjWyWw7ekubLVLchJIv6623bheoybQ`;

  // 좋아요 버튼
  const plusLikeCount = async () => {
    if (checkLike === false) {
      const like = {
        likeCount: list.likeCount + 1,
      };
      const res = await BASE_API.patch(`/diary/${diaryId}`, like);
      getDetailData(res.data);
      setCheckLike(true);
    } else {
      const like = {
        likeCount: list.likeCount - 1,
      };
      const res = await BASE_API.patch(`/diary/${diaryId}`, like);
      getDetailData(res.data);
      setCheckLike(false);
    }
  };

  // 선택한 다이어리 delete 요청
  const postDelete = async () => {
    const deleteDiary = window.confirm("정말 게시글을 삭제하시겠습니까?");
    if (deleteDiary === true) {
      const res = await BASE_API.delete(`/diary/${diaryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getDetailData(res.data);
      alert("삭제되었습니다.");
    } else {
      return;
    }
  };

  // 댓글 post 요청
  const submitHandler = async () => {
    const newComment = {
      diaryId: diaryId,
      body: text,
    };
    const res = await BASE_API.post(`/comment`, newComment, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getDetailData(res.data);
  };

  // 댓글 작성 체인지 이벤트
  const changeHandler = (e: any) => {
    setText(e.target.value);
  };

  return (
    <DetailMainContainer>
      <DetailMainWrapper>
        <TitleArea>
          <div className='DetailTitle'>{list.title}</div>
          <ButtonArea>
            <button className='edit'>수정</button>
            <button className='delete' onClick={postDelete}>
              삭제
            </button>
            <button className='like' onClick={plusLikeCount}>
              {checkLike === true ? (
                <AiFillHeart className='likeIcon' />
              ) : (
                <AiOutlineHeart className='likeIcon' />
              )}
              좋아요
              <span className='likeCount'>{list.likeCount}</span>
            </button>
          </ButtonArea>
        </TitleArea>
        <AlbumCoverArea>
          <div className='coverImg'></div>
          <InfoArea>
            <UserInfo>
              <span className='text'>등록자</span>
              {list.userNickname}
            </UserInfo>
            <UserInfo>
              <span className='text'>등록일</span>
              {list.createdAt.substring(0, 10)}
            </UserInfo>
          </InfoArea>
        </AlbumCoverArea>
        <AlbumInfoArea>
          <div className='playTitle'>다이어리 소개</div>
          <div className='playContent'>{list.body}</div>
        </AlbumInfoArea>
        <PlayList />
        <CommentInputArea>
          <div className='commentTitle'>
            댓글
            <span className='commentCount'>({commentData?.length})</span>
          </div>
          <TextArea>
            <textarea className='textArea' onChange={changeHandler} />
            <button className='sumbit' onClick={submitHandler}>
              등록
            </button>
          </TextArea>
          {commentData?.map((value) => {
            return <CommentList list={value} key={value.commentId} />;
          })}
        </CommentInputArea>
      </DetailMainWrapper>
    </DetailMainContainer>
  );
}

export default DetailList;
