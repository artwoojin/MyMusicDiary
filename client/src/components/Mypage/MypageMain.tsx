import styled from "styled-components";
import * as DiaryMain from "../Main/DiaryMain";
import MyDiary from "./MyDiary";
import MypagePagination from "./MypagePagination";
import MyLikeDiary from "./MyLikeDiary";
import MyComment from "./MyComment";
import MyInfo from "./MyInfo";
import { useState, useEffect, useContext } from "react";
import { DiaryData } from "../../util/Type";
import { CommentData } from "../../util/Type";
import { UserData } from "../../util/Type";
import { BASE_API } from "../../util/API";
import { myContext } from "../../theme";

const ListTab = styled.ul`
  display: flex;
  justify-content: center;
  margin: 50px 0 50px 0;
  gap: 10px;

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 700;
    width: 200px;
    height: 40px;
    text-align: center;
    cursor: pointer;

    > .el {
      color: ${(props) => props.theme.subText};
    }
  }

  .focused {
    border-bottom: 2px solid ${(props) => props.theme.mainText};

    > .el {
      color: ${(props) => props.theme.mainText};
    }
  }
`;

const MypageWrapper = styled.div`
  width: 100vw;
  max-width: 850px;
  min-width: 300px;
`;

function MypageMain() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [myDiaryData, setMyDiaryData] = useState<DiaryData[]>([]);
  const [myLikeDiaryData, setLikeDiaryData] = useState<DiaryData[]>([]);
  const [myCommentData, setMyCommentData] = useState<CommentData[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [page, setPage] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("myCurrentPage")!) || 1
  );

  useEffect(() => {
    window.localStorage.setItem("myCurrentPage", JSON.stringify(page));
  }, [page]);

  const LIMIT_COUNT: number = 20;
  const offset: number = (page - 1) * LIMIT_COUNT;
  const { currentUser }: any = useContext(myContext);

  // Tab 1(MyInfo) : 나의 유저 정보만 불러오는 get 요청
  const getUserData = async () => {
    try {
      const res = await BASE_API.get(`/users/${currentUser.userId}`);
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  // Tab 2(MyDiary) : 나의 다이어리 데이터 get 요청
  const getMyDiaryData = async () => {
    try {
      const res = await BASE_API.get(`/diary?userNickname=동구222`);
      setMyDiaryData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMyDiaryData();
  }, []);

  // Tab 3(MyLikeDiary) : 내가 좋아요 한 다이어리 데이터 get 요청
  // const getLikeData = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:3001/likediary`);
  //     setLikeDiaryData(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // useEffect(() => {
  //   getLikeData();
  // }, []);

  // Tab 4(MyComment) : 내가 작성한 댓글 데이터 get 요청
  const getMyCommentData = async () => {
    try {
      const res = await BASE_API.get(`/comment`);
      setMyCommentData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMyCommentData();
  }, []);

  // 마이 페이지 탭 리스트
  const tabArr = [
    { feel: "내 정보" },
    { feel: "나의 다이어리" },
    { feel: "좋아한 다이어리" },
    { feel: "작성한 댓글" },
  ];

  // 탭 선택 이벤트 핸들러
  const selectTabHandler = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <>
      <ListTab>
        {tabArr.map((tab, index) => {
          return (
            <li
              key={index}
              className={currentTab === index ? "tab focused" : "tab"}
              onClick={() => selectTabHandler(index)}
            >
              <div className='el'>{tab.feel}</div>
            </li>
          );
        })}
      </ListTab>
      <DiaryMain.DiaryMainContainer>
        {currentTab === 0 ? (
          <MypageWrapper>
            {Object.values(userData).map((value: any) => {
              return <MyInfo list={value} key={value.userId} getUserData={getUserData} />;
            })}
          </MypageWrapper>
        ) : currentTab === 1 ? (
          <DiaryMain.DiaryMainWrapper>
            {myDiaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
              return <MyDiary list={value} key={value.diaryId} />;
            })}
          </DiaryMain.DiaryMainWrapper>
        ) : currentTab === 2 ? (
          <DiaryMain.DiaryMainWrapper>
            {myLikeDiaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
              return <MyLikeDiary list={value} key={value.diaryId} />;
            })}
          </DiaryMain.DiaryMainWrapper>
        ) : (
          <MypageWrapper>
            {myCommentData.slice(offset, offset + LIMIT_COUNT).map((value) => {
              return <MyComment list={value} key={value.commentId} />;
            })}
          </MypageWrapper>
        )}
      </DiaryMain.DiaryMainContainer>
      <MypagePagination
        myPageLength={myDiaryData.length}
        myLikePageLength={myLikeDiaryData.length}
        myCommentPageLength={myCommentData.length}
        LIMIT_COUNT={LIMIT_COUNT}
        page={page}
        setPage={setPage}
        currentTab={currentTab}
      />
    </>
  );
}

export default MypageMain;
