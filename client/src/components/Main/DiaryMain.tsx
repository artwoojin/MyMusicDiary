import DiaryList from "./DiaryList";
import Pagination from "./Pagination";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { DiaryData } from "../../util/Type";
import { BASE_API } from "../../util/API";
import { MyContext } from "../../util/MyContext";
import Skeleton from "../common/Skeleton";

const Test = styled.div`
  display: flex;
  justify-content: center;
  height: 55px;
  margin-bottom: 35px;
`;

const ListTab = styled.ul`
  display: flex;
  margin: 0 10px 0 10px;
  padding: 0 5px 0 5px;
  gap: 10px;
  overflow-x: auto;

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100px;
    height: 40px;
    border-radius: 50px;
    text-align: center;
    padding: 7px 7px;
    border: 1px solid ${(props) => props.theme.color.borderLine};
    transition: 0.2s ease-in-out;
    cursor: pointer;

    > .el {
      font-size: 13.5px;
      color: ${(props) => props.theme.color.thirdText};
      font-weight: ${(props) => props.theme.font.contentWeight};
    }

    &:hover {
      transform: scale(1.03);
    }
  }

  .focused {
    border: 2px solid ${(props) => props.theme.color.signature};
    background-color: ${(props) => props.theme.color.signature};

    > .el {
      font-size: 14px;
      color: ${(props) => props.theme.color.signatureText};
      font-weight: ${(props) => props.theme.font.titleWeight};
    }
  }

  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.color.borderLine};
    border-radius: 50px;
  }
`;

export const DiaryMainContainer = styled.main`
  display: flex;
  justify-content: center;
`;

export const DiaryMainWrapper = styled.ul`
  width: 100vw;
  max-width: 1440px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px 0 15px;
  gap: 55px;

  @media screen and (max-width: 1449px) {
    max-width: 1070px;
  }

  @media screen and (max-width: 1084px) {
    max-width: 705px;
  }

  @media screen and (max-width: 721px) {
    max-width: 340px;
  }
`;

function DiaryMain() {
  const [diaryData, setDiaryData] = useState<DiaryData[]>([]); // 전체 diary 데이터
  const [mainCurrentTab, setMainCurrentTab] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("mainCurrentTab")!) || 0
  ); // 현재 탭 index
  const [mainCurrentPage, setMainCurrentPage] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("mainCurrentPage")!) || 1 // 현재 페이지 번호 (기본값: 1페이지부터 노출)
  );
  const [blockNum, setBlockNum] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("mainCurrentPageBlock")!) || 0
  ); // 현재 페이지네이션 블록 index

  const LIMIT_COUNT: number = 20;
  const offset: number = (mainCurrentPage - 1) * LIMIT_COUNT; // 각 페이지에서 첫 데이터의 위치(index) 계산
  const { isLoading, setIsLoading }: any = useContext(MyContext);

  // 로컬스토리지에 현재 탭 번호 저장
  useEffect(() => {
    window.localStorage.setItem("mainCurrentTab", JSON.stringify(mainCurrentTab));
    setMainCurrentPage(1);
    setBlockNum(0);
  }, [mainCurrentTab]);

  // 로컬스토리지에 현재 페이지 번호 저장
  useEffect(() => {
    window.localStorage.setItem("mainCurrentPage", JSON.stringify(mainCurrentPage));
    setMainCurrentPage(mainCurrentPage);
    setBlockNum(blockNum);
  }, [mainCurrentPage]);

  // 로컬스토리지에 페이지 블록 번호 저장
  useEffect(() => {
    window.localStorage.setItem("mainCurrentPageBlock", JSON.stringify(blockNum));
  }, [blockNum]);

  // 마이페이지 탭, 페이지, 블록 상태 초기화
  useEffect(() => {
    localStorage.removeItem("myCurrentTab");
    localStorage.removeItem("myCurrentPage");
    localStorage.removeItem("myCurrentPageBlock");
  }, []);

  // 전체 diary 데이터 get 요청
  const getDiaryData = async () => {
    try {
      const res = await BASE_API.get(`/diary`);
      setIsLoading(false);
      setDiaryData(res.data);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };
  useEffect(() => {
    getDiaryData();
  }, []);

  // 태그 리스트
  const tagArr = [
    { feel: "전체" },
    { feel: "#신나는" },
    { feel: "#감성적인" },
    { feel: "#잔잔한" },
    { feel: "#애절한" },
    { feel: "#그루브한" },
    { feel: "#몽환적인" },
    { feel: "#어쿠스틱한" },
    { feel: "#청량한" },
  ];

  // 태그 선택 이벤트 핸들러
  const selectTagHandler = (index: number) => {
    setMainCurrentTab(index);
  };

  return (
    <>
      <Test>
        <ListTab>
          {tagArr.map((tab, index) => {
            return (
              <li
                key={index}
                className={mainCurrentTab === index ? "tab focused" : "tab"}
                onClick={() => selectTagHandler(index)}
              >
                <div className='el'>{tab.feel}</div>
              </li>
            );
          })}
        </ListTab>
      </Test>
      {isLoading ? (
        <Skeleton />
      ) : (
        <DiaryMainContainer>
          {mainCurrentTab === 0 ? (
            <DiaryMainWrapper>
              {diaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
                return <DiaryList list={value} key={value.diaryId} />;
              })}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 1 ? (
            <DiaryMainWrapper>
              {diaryData
                .filter((value) => value.tags.includes(tagArr[1].feel))
                .slice(offset, offset + LIMIT_COUNT)
                .map((value) => {
                  return <DiaryList list={value} key={value.diaryId} />;
                })}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 2 ? (
            <DiaryMainWrapper>
              {diaryData
                .filter((value) => value.tags.includes(tagArr[2].feel))
                .slice(offset, offset + LIMIT_COUNT)
                .map((value) => {
                  return <DiaryList list={value} key={value.diaryId} />;
                })}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 3 ? (
            <DiaryMainWrapper>
              {diaryData
                .filter((value) => value.tags.includes(tagArr[3].feel))
                .slice(offset, offset + LIMIT_COUNT)
                .map((value) => {
                  return <DiaryList list={value} key={value.diaryId} />;
                })}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 4 ? (
            <DiaryMainWrapper>
              {diaryData
                .filter((value) => value.tags.includes(tagArr[4].feel))
                .slice(offset, offset + LIMIT_COUNT)
                .map((value) => {
                  return <DiaryList list={value} key={value.diaryId} />;
                })}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 5 ? (
            <DiaryMainWrapper>
              {diaryData
                .filter((value) => value.tags.includes(tagArr[5].feel))
                .slice(offset, offset + LIMIT_COUNT)
                .map((value) => {
                  return <DiaryList list={value} key={value.diaryId} />;
                })}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 6 ? (
            <DiaryMainWrapper>
              {diaryData
                .filter((value) => value.tags.includes(tagArr[6].feel))
                .slice(offset, offset + LIMIT_COUNT)
                .map((value) => {
                  return <DiaryList list={value} key={value.diaryId} />;
                })}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 7 ? (
            <DiaryMainWrapper>
              {diaryData
                .filter((value) => value.tags.includes(tagArr[7].feel))
                .slice(offset, offset + LIMIT_COUNT)
                .map((value) => {
                  return <DiaryList list={value} key={value.diaryId} />;
                })}
            </DiaryMainWrapper>
          ) : (
            <DiaryMainWrapper>
              {diaryData
                .slice(offset, offset + LIMIT_COUNT)
                .filter((value) => value.tags.includes(tagArr[8].feel))
                .map((value) => {
                  return <DiaryList list={value} key={value.diaryId} />;
                })}
            </DiaryMainWrapper>
          )}
        </DiaryMainContainer>
      )}
      <Pagination
        allPageLength={diaryData.length}
        tagOnePageLength={diaryData.filter((value) => value.tags.includes(tagArr[1].feel)).length}
        // tagOnePageLength={
        //   diaryData.filter((value) => value.tags[0]?.tagName === tagArr[1].feel).length
        // }
        tagTwoPageLength={diaryData.filter((value) => value.tags.includes(tagArr[2].feel)).length}
        tagThreePageLength={diaryData.filter((value) => value.tags.includes(tagArr[3].feel)).length}
        tagFourPageLength={diaryData.filter((value) => value.tags.includes(tagArr[4].feel)).length}
        tagFivePageLength={diaryData.filter((value) => value.tags.includes(tagArr[5].feel)).length}
        tagSixPageLength={diaryData.filter((value) => value.tags.includes(tagArr[6].feel)).length}
        tagSevenPageLength={diaryData.filter((value) => value.tags.includes(tagArr[7].feel)).length}
        tagEightPageLength={diaryData.filter((value) => value.tags.includes(tagArr[8].feel)).length}
        LIMIT_COUNT={LIMIT_COUNT}
        mainCurrentPage={mainCurrentPage}
        setMainCurrentPage={setMainCurrentPage}
        mainCurrentTab={mainCurrentTab}
        blockNum={blockNum}
        setBlockNum={setBlockNum}
      />
    </>
  );
}

export default DiaryMain;
