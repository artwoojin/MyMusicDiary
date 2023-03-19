import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import DiaryList from "./MyDiaryList";

const ListTab = styled.ul`
  display: flex;
  justify-content: center;
  margin: 50px 0 50px 0;
  gap: 10px;
  /* border: 1px solid black; */

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    width: 200px;
    height: 40px;
    /* border: 1px solid black; */
    text-align: center;

    > .el {
      color: #495057;
    }
  }

  .focused {
    border-bottom: 2px solid #1c1a16;

    > .el {
      color: #1c1a16;
    }
  }
`;

const MypageMainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DiaryMainWrapper = styled.ul`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px 0 15px;
  gap: 56.6px;
`;

export interface IDiaryData {
  diary_id: number;
  nickname: string;
  title: string;
  body: string;
  createdAt: string;
  modifiedAt: string;
  viewcount: number;
  tag: string[];
  like: number;
  comment: object[];
}

function MypageMain() {
  const [diaryData, setDiaryData] = useState<IDiaryData[]>([]); // 전체 diary 데이터
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [page, setPage] = useState<number>(1); // 현재 페이지 번호 (기본값: 1페이지부터 노출)

  const LIMIT_COUNT: number = 20;
  const offset: number = (page - 1) * LIMIT_COUNT; // 각 페이지에서 첫 데이터의 위치(index) 계산

  const getDiaryData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/diary");
      setDiaryData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getDiaryData();
  }, []);

  const tabArr = [
    { feel: "내 정보" },
    { feel: "나의 다이어리" },
    { feel: "좋아한 다이어리" },
    { feel: "작성한 댓글" },
  ];

  const selectTabHandler = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <>
      <ListTab>
        {" "}
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
      <MypageMainContainer>
        {currentTab === 0 ? (
          <div className='one'>1</div>
        ) : currentTab === 1 ? (
          <DiaryMainWrapper>
            {diaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
              return <DiaryList list={value} key={value.diary_id} />;
            })}
          </DiaryMainWrapper>
        ) : currentTab === 2 ? (
          <DiaryMainWrapper>
            {diaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
              return <DiaryList list={value} key={value.diary_id} />;
            })}
          </DiaryMainWrapper>
        ) : (
          <div className='four'>4</div>
        )}
      </MypageMainContainer>
    </>
  );
}

export default MypageMain;
