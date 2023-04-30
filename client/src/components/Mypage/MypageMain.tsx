import styled from "styled-components";
import * as DiaryMain from "../Main/DiaryMain";
import MyDiary from "./MyDiary";
import MypagePagination from "./MypagePagination";
import MyLikeDiary from "./MyLikeDiary";
import MyComment from "./MyComment";
import MyInfo from "./MyInfo";
import ScrollTopButton from "../common/scrollTopButton";
import { useState, useEffect, useContext } from "react";
import { DiaryData } from "../../util/Type";
import { CommentData } from "../../util/Type";
import { UserData } from "../../util/Type";
import { BASE_API } from "../../util/API";
import { MyContext } from "../../util/MyContext";

const ListTab = styled.ul`
  display: flex;
  justify-content: center;
  font-size: 16px;
  margin: 50px 0 45px 0;
  padding: 0 15px 0 15px;
  gap: 10px;
  word-break: keep-all;

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 40px;
    text-align: center;
    cursor: pointer;

    > .el {
      color: ${(props) => props.theme.color.subText};
      font-weight: ${(props) => props.theme.font.titleWeight};
    }

    // 721px 이하에서 탭 글씨 크기 축소
    @media screen and (max-width: 721px) {
      font-size: 13px;
    }
  }

  .focused {
    border-bottom: 2px solid ${(props) => props.theme.color.mainText};

    > .el {
      color: ${(props) => props.theme.color.mainText};
      font-weight: ${(props) => props.theme.font.logoWeight};
    }
  }
`;

const MypageWrapper = styled.div`
  width: 100vw;
  max-width: 850px;
  padding: 0 10px 0 10px;
`;

const CommentCountWrapper = styled.div`
  font-size: 15px;
  height: 33px;
  padding: 0 5px 0 5px;
  border-bottom: 1px solid ${(props) => props.theme.color.borderLine};
`;

const CommentInfo = styled.div`
  display: flex;
  color: ${(props) => props.theme.color.mainText};

  > .countNum {
    font-weight: ${(props) => props.theme.font.titleWeight};
  }

  > .countText {
    font-weight: ${(props) => props.theme.font.contentWeight};
  }
`;

function MypageMain() {
  const [myUserData, setMyUserData] = useState<UserData>();
  const [myDiaryData, setMyDiaryData] = useState<DiaryData[]>([]);
  const [myLikeDiaryData, setMyLikeDiaryData] = useState<DiaryData[]>([]);
  const [myCommentData, setMyCommentData] = useState<CommentData[]>([]);
  const [myCurrentTab, setMyCurrentTab] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("myCurrentTab")!) || 0
  );
  const [myCurrentPage, setMyCurrentPage] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("myCurrentPage")!) || 1
  );
  const [blockNum, setBlockNum] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("myCurrentPageBlock")!) || 0
  ); // 현재 페이지네이션 블록 index

  const LIMIT_COUNT: number = 20;
  const offset: number = (myCurrentPage - 1) * LIMIT_COUNT;
  const { currentUser }: any = useContext(MyContext);

  useEffect(() => {
    window.localStorage.setItem("myCurrentTab", JSON.stringify(myCurrentTab));
    setMyCurrentPage(1);
    setBlockNum(0);
  }, [myCurrentTab]);

  useEffect(() => {
    window.localStorage.setItem("myCurrentPage", JSON.stringify(myCurrentPage));
    setMyCurrentPage(myCurrentPage);
    setBlockNum(blockNum);
  }, [myCurrentPage]);

  useEffect(() => {
    window.localStorage.setItem("myCurrentPageBlock", JSON.stringify(blockNum));
  }, [blockNum]);

  // Tab 1(MyInfo) : 나의 유저 정보만 불러오는 get 요청
  const getUserData = async () => {
    try {
      const res = await BASE_API.get(`/users/${currentUser.userId}`);
      setMyUserData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  // Tab 2(MyDiary) : 내가 작성한 다이어리만 불러오는 get 요청
  const getMyDiaryData = async () => {
    try {
      const res = await BASE_API.get(`/diary`);
      setMyDiaryData(
        res.data.filter((value: DiaryData) => value.userNickname === currentUser.nickname)
      );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMyDiaryData();
  }, []);

  // Tab 3(MyLikeDiary) : 내가 좋아요 한 다이어리 데이터 get 요청
  const getLikeData = async () => {
    try {
      const res = await BASE_API.get(`/users/${currentUser.userId}`);
      setMyLikeDiaryData(res.data.likeDiaries);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getLikeData();
  }, []);

  // Tab 4(MyComment) : 내가 작성한 댓글만 불러오는 get 요청
  const getMyCommentData = async () => {
    try {
      const res = await BASE_API.get(`/comment`);
      setMyCommentData(
        res.data.filter((value: CommentData) => value.userNickname === currentUser.nickname)
      );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMyCommentData();
  }, []);

  // 마이 페이지 탭 리스트
  const tabArr = [
    { feel: "내 정보 수정" },
    { feel: "나의 다이어리" },
    { feel: "좋아한 다이어리" },
    { feel: "작성한 댓글" },
  ];

  // 탭 선택 이벤트 핸들러
  const selectTabHandler = (index: number) => {
    setMyCurrentTab(index);
  };

  return (
    <>
      <ListTab>
        {tabArr.map((tab, index) => {
          return (
            <li
              key={index}
              className={myCurrentTab === index ? "tab focused" : "tab"}
              onClick={() => selectTabHandler(index)}
            >
              <div className='el'>{tab.feel}</div>
            </li>
          );
        })}
      </ListTab>
      <DiaryMain.DiaryMainContainer>
        {myCurrentTab === 0 ? (
          <MypageWrapper>
            {myUserData && <MyInfo list={myUserData} getUserData={getUserData} />}
          </MypageWrapper>
        ) : myCurrentTab === 1 ? (
          <DiaryMain.DiaryMainWrapper>
            {myDiaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
              return <MyDiary list={value} key={value.diaryId} />;
            })}
          </DiaryMain.DiaryMainWrapper>
        ) : myCurrentTab === 2 ? (
          <DiaryMain.DiaryMainWrapper>
            {myLikeDiaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
              return <MyLikeDiary list={value} key={value.diaryId} />;
            })}
          </DiaryMain.DiaryMainWrapper>
        ) : (
          <MypageWrapper>
            <CommentCountWrapper>
              <CommentInfo>
                <div className='countNum'>{myCommentData.length}</div>
                <div className='countText'>개의 작성한 댓글이 있습니다.</div>
              </CommentInfo>
            </CommentCountWrapper>
            {myCommentData.slice(offset, offset + LIMIT_COUNT).map((value) => {
              return <MyComment list={value} key={value.commentId} />;
            })}
          </MypageWrapper>
        )}
      </DiaryMain.DiaryMainContainer>
      <ScrollTopButton />
      <MypagePagination
        myPageLength={myDiaryData.length}
        myLikePageLength={myLikeDiaryData.length}
        myCommentPageLength={myCommentData.length}
        LIMIT_COUNT={LIMIT_COUNT}
        myCurrentPage={myCurrentPage}
        setMyCurrentPage={setMyCurrentPage}
        myCurrentTab={myCurrentTab}
        blockNum={blockNum}
        setBlockNum={setBlockNum}
      />
    </>
  );
}

export default MypageMain;
