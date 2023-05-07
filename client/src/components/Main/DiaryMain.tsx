import DiaryList from "./DiaryList";
import Pagination from "./Pagination";
import Skeleton from "../common/Skeleton";
import ScrollTopButton from "../common/scrollTopButton";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { DiaryData } from "../../util/Type";
import { BASE_API } from "../../util/API";
import { MyContext } from "../../util/MyContext";
import useFetch from "../../hooks/useFetch";

const TagContainer = styled.section`
  display: flex;
  justify-content: center;
  height: 60px;
  margin: 70px 0 5px 0;
`;

const ListTab = styled.ul`
  display: flex;
  margin: 0 10px 0 10px;
  padding: 5px;
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
      transform: scale(1.04);
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

const SortedTagContainer = styled.section`
  display: flex;
  justify-content: center;
  height: 60px;
`;

const SortedListTab = styled.div`
  width: 100vw;
  max-width: 1440px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
  word-break: keep-all;

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

const TagTitle = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.mainText};
  font-size: 19px;
  font-weight: ${(props) => props.theme.font.titleWeight};

  > .numCount {
    font-size: 16px;
    margin: 0 0 3px 5px;
    color: ${(props) => props.theme.color.subText};

    @media screen and (max-width: 721px) {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 721px) {
    font-size: 18px;
  }
`;

const SortedButtonArea = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    width: 50px;
    height: 30px;
    text-align: center;
    cursor: pointer;

    > .el {
      color: gray;
      font-weight: ${(props) => props.theme.font.titleWeight};
    }
  }

  .focused > .el {
    color: ${(props) => props.theme.color.mainText};
    font-weight: ${(props) => props.theme.font.logoWeight};
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
  const [mainBlockNum, setMainBlockNum] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("mainCurrentPageBlock")!) || 0
  ); // 현재 페이지네이션 블록 index
  const [sortedCurrentTab, setSortedCurrentTab] = useState<number>(
    () => JSON.parse(window.localStorage.getItem("mainCurrentSortedTab")!) || 0
  ); // 현재 정렬 버튼 index

  const LIMIT_COUNT: number = 20;
  const offset: number = (mainCurrentPage - 1) * LIMIT_COUNT; // 각 페이지에서 첫 데이터의 위치(index) 계산
  const { isLoading, setIsLoading }: any = useContext(MyContext);
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
  ]; // 태그 리스트
  const sortedArr = [{ sorting: "최신순" }, { sorting: "인기순" }]; // 정렬 리스트

  // 좋아요 순으로 정렬된 diaryData
  const sortedDiaryData = [...diaryData].sort((a, b) => b.likeCount - a.likeCount);

  const tagOneData = diaryData.filter((value) => value.tags.includes(tagArr[1].feel));
  const tagTwoData = diaryData.filter((value) => value.tags.includes(tagArr[2].feel));
  const tagThreeData = diaryData.filter((value) => value.tags.includes(tagArr[3].feel));
  const tagFourData = diaryData.filter((value) => value.tags.includes(tagArr[4].feel));
  const tagFiveData = diaryData.filter((value) => value.tags.includes(tagArr[5].feel));
  const tagSixData = diaryData.filter((value) => value.tags.includes(tagArr[6].feel));
  const tagSevenData = diaryData.filter((value) => value.tags.includes(tagArr[7].feel));
  const tagEightData = diaryData.filter((value) => value.tags.includes(tagArr[8].feel));

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

  // 로컬스토리지에 현재 탭 번호 저장
  useEffect(() => {
    window.localStorage.setItem("mainCurrentTab", JSON.stringify(mainCurrentTab));
    setMainCurrentPage(1);
    setMainBlockNum(0);
    setSortedCurrentTab(0);
  }, [mainCurrentTab]);

  // 로컬스토리지에 현재 페이지 번호 저장
  useEffect(() => {
    window.localStorage.setItem("mainCurrentPage", JSON.stringify(mainCurrentPage));
    setMainCurrentPage(mainCurrentPage);
    setMainBlockNum(mainBlockNum);
    setSortedCurrentTab(sortedCurrentTab);
  }, [mainCurrentPage, mainBlockNum, sortedCurrentTab]);

  // 로컬스토리지에 페이지 블록 번호 저장
  useEffect(() => {
    window.localStorage.setItem("mainCurrentPageBlock", JSON.stringify(mainBlockNum));
  }, [mainBlockNum]);

  // 로컬스토리지에 페이지 블록 번호 저장
  useEffect(() => {
    window.localStorage.setItem("mainCurrentSortedTab", JSON.stringify(sortedCurrentTab));
  }, [sortedCurrentTab]);

  // 마이페이지 탭, 페이지, 블록 상태 초기화
  useEffect(() => {
    localStorage.removeItem("myCurrentTab");
    localStorage.removeItem("myCurrentPage");
    localStorage.removeItem("myCurrentPageBlock");
  }, []);

  // 태그 선택 이벤트 핸들러
  const selectTagHandler = (index: number) => {
    setMainCurrentTab(index);
  };

  // 정렬 선택 이벤트 핸들러
  const selectSortedHandler = (index: number) => {
    setSortedCurrentTab(index);
  };

  // const test = diaryData.map((value) => value.title);
  // console.log(test.includes("asfd"));

  return (
    <>
      <TagContainer>
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
      </TagContainer>
      <SortedTagContainer>
        <SortedListTab>
          {mainCurrentTab === 0 ? (
            <TagTitle>
              {tagArr[0].feel}
              <span className='numCount'>({diaryData.length})</span>
            </TagTitle>
          ) : mainCurrentTab === 1 ? (
            <TagTitle>
              {tagArr[1].feel}
              <span className='numCount'>({tagOneData.length})</span>
            </TagTitle>
          ) : mainCurrentTab === 2 ? (
            <TagTitle>
              {tagArr[2].feel}
              <span className='numCount'>({tagTwoData.length})</span>
            </TagTitle>
          ) : mainCurrentTab === 3 ? (
            <TagTitle>
              {tagArr[3].feel}
              <span className='numCount'>({tagThreeData.length})</span>
            </TagTitle>
          ) : mainCurrentTab === 4 ? (
            <TagTitle>
              {tagArr[4].feel}
              <span className='numCount'>({tagFourData.length})</span>
            </TagTitle>
          ) : mainCurrentTab === 5 ? (
            <TagTitle>
              {tagArr[5].feel}
              <span className='numCount'>({tagFiveData.length})</span>
            </TagTitle>
          ) : mainCurrentTab === 6 ? (
            <TagTitle>
              {tagArr[6].feel}
              <span className='numCount'>({tagSixData.length})</span>
            </TagTitle>
          ) : mainCurrentTab === 7 ? (
            <TagTitle>
              {tagArr[7].feel}
              <span className='numCount'>({tagSevenData.length})</span>
            </TagTitle>
          ) : (
            <TagTitle>
              {tagArr[8].feel}
              <span className='numCount'>({tagEightData.length})</span>
            </TagTitle>
          )}
          <SortedButtonArea>
            {sortedArr.map((tab, index) => {
              return (
                <li
                  key={index}
                  className={sortedCurrentTab === index ? "tab focused" : "tab"}
                  onClick={() => selectSortedHandler(index)}
                >
                  <div className='el'>{tab.sorting}</div>
                </li>
              );
            })}
          </SortedButtonArea>
        </SortedListTab>
      </SortedTagContainer>
      {isLoading ? (
        <Skeleton />
      ) : (
        <DiaryMainContainer>
          {mainCurrentTab === 0 ? (
            <DiaryMainWrapper>
              {sortedCurrentTab === 0 ? (
                <>
                  {diaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
                    return <DiaryList list={value} key={value.diaryId} />;
                  })}
                </>
              ) : (
                <>
                  {sortedDiaryData.slice(offset, offset + LIMIT_COUNT).map((value) => {
                    return <DiaryList list={value} key={value.diaryId} />;
                  })}
                </>
              )}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 1 ? (
            <DiaryMainWrapper>
              {sortedCurrentTab === 0 ? (
                <>
                  {diaryData
                    .filter((value) => value.tags.includes(tagArr[1].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              ) : (
                <>
                  {sortedDiaryData
                    .filter((value) => value.tags.includes(tagArr[1].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              )}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 2 ? (
            <DiaryMainWrapper>
              {sortedCurrentTab === 0 ? (
                <>
                  {diaryData
                    .filter((value) => value.tags.includes(tagArr[2].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              ) : (
                <>
                  {sortedDiaryData
                    .filter((value) => value.tags.includes(tagArr[2].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              )}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 3 ? (
            <DiaryMainWrapper>
              {sortedCurrentTab === 0 ? (
                <>
                  {diaryData
                    .filter((value) => value.tags.includes(tagArr[3].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              ) : (
                <>
                  {sortedDiaryData
                    .filter((value) => value.tags.includes(tagArr[3].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              )}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 4 ? (
            <DiaryMainWrapper>
              {sortedCurrentTab === 0 ? (
                <>
                  {diaryData
                    .filter((value) => value.tags.includes(tagArr[4].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              ) : (
                <>
                  {sortedDiaryData
                    .filter((value) => value.tags.includes(tagArr[4].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              )}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 5 ? (
            <DiaryMainWrapper>
              {sortedCurrentTab === 0 ? (
                <>
                  {diaryData
                    .filter((value) => value.tags.includes(tagArr[5].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              ) : (
                <>
                  {sortedDiaryData
                    .filter((value) => value.tags.includes(tagArr[5].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              )}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 6 ? (
            <DiaryMainWrapper>
              {sortedCurrentTab === 0 ? (
                <>
                  {diaryData
                    .filter((value) => value.tags.includes(tagArr[6].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              ) : (
                <>
                  {sortedDiaryData
                    .filter((value) => value.tags.includes(tagArr[6].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              )}
            </DiaryMainWrapper>
          ) : mainCurrentTab === 7 ? (
            <DiaryMainWrapper>
              {sortedCurrentTab === 0 ? (
                <>
                  {diaryData
                    .filter((value) => value.tags.includes(tagArr[7].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              ) : (
                <>
                  {sortedDiaryData
                    .filter((value) => value.tags.includes(tagArr[7].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              )}
            </DiaryMainWrapper>
          ) : (
            <DiaryMainWrapper>
              {sortedCurrentTab === 0 ? (
                <>
                  {diaryData
                    .filter((value) => value.tags.includes(tagArr[8].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              ) : (
                <>
                  {sortedDiaryData
                    .filter((value) => value.tags.includes(tagArr[8].feel))
                    .slice(offset, offset + LIMIT_COUNT)
                    .map((value) => {
                      return <DiaryList list={value} key={value.diaryId} />;
                    })}
                </>
              )}
            </DiaryMainWrapper>
          )}
        </DiaryMainContainer>
      )}
      <ScrollTopButton />
      <Pagination
        allPageLength={diaryData.length}
        tagOnePageLength={tagOneData.length}
        tagTwoPageLength={tagTwoData.length}
        tagThreePageLength={tagThreeData.length}
        tagFourPageLength={tagFourData.length}
        tagFivePageLength={tagFiveData.length}
        tagSixPageLength={tagSixData.length}
        tagSevenPageLength={tagSevenData.length}
        tagEightPageLength={tagEightData.length}
        LIMIT_COUNT={LIMIT_COUNT}
        mainCurrentPage={mainCurrentPage}
        setMainCurrentPage={setMainCurrentPage}
        mainCurrentTab={mainCurrentTab}
        mainBlockNum={mainBlockNum}
        setMainBlockNum={setMainBlockNum}
      />
    </>
  );
}

export default DiaryMain;
