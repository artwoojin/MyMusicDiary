import SearchDiaryList from "./SearchDiaryList";
import styled from "styled-components";
import * as DiaryMain from "../Main/DiaryMain";
import { DiaryData } from "../../util/Type";
import { BASE_API } from "../../util/API";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import noDiary from "../../assets/images/noDiary.png";

const SearchbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 40px 0 45px 0;
  padding: 0 15px 0 15px;
  /* border: 1px solid red; */
`;

const Searchbar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 675px;

  > input {
    width: 100%;
    height: 50px;
    margin-bottom: 15px;
    font-size: ${(props) => props.theme.font.diaryMainTitleSize}px;
    color: ${(props) => props.theme.color.mainText};
    padding: 15px;
    border-radius: 4px;
    border: none;
    border: 1px solid ${(props) => props.theme.color.thirdText};
    background-color: ${(props) => props.theme.color.inputBackground};

    &:focus {
      border: 1px solid ${(props) => props.theme.color.mainText};
      outline: none;
    }

    @media screen and (max-width: 721px) {
      height: 40px;
      font-size: 19px;
      padding: 15px 10px 15px 10px;
      font-size: 19px;
    }
  }

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 45px;
    height: 40px;
    right: 0;
    top: 5px;
    margin-right: 10px;
    border: none;
    color: ${(props) => props.theme.color.mainText};
    border-radius: 4px;
    background-color: transparent;

    @media screen and (max-width: 721px) {
      top: 0;
    }
  }
`;

const SearchInfo = styled.div`
  display: flex;
  width: 100%;
  max-width: 675px;
  font-size: ${(props) => props.theme.font.diarySubTitleSize}px;
  /* border: 1px solid blue; */

  > .countNum {
    color: ${(props) => props.theme.color.mainText};
    font-weight: ${(props) => props.theme.font.titleWeight};
  }

  > .countText {
    color: ${(props) => props.theme.color.subText};
    font-weight: ${(props) => props.theme.font.contentWeight};
  }
`;

const NoDiary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 675px;
  margin-top: 30px;
  font-size: 21px;
  /* border: 1px solid red; */

  > img {
    width: 600px;
    height: 400px;
    margin-bottom: 10px;
    /* border: 1px solid red; */

    @media screen and (max-width: 721px) {
      width: 375px;
      height: 250px;
    }
  }

  > .noDiaryText {
    font-size: 25px;
    color: ${(props) => props.theme.color.mainText};
    font-weight: ${(props) => props.theme.font.logoWeight};
    /* border: 1px solid red; */

    @media screen and (max-width: 721px) {
      font-size: 22px;
    }
  }
`;

function SearchDiaryMain() {
  const [diaryData, setDiaryData] = useState<DiaryData[]>([]);
  const [userInput, setUserInput] = useState<string>(
    () => JSON.parse(window.localStorage.getItem("searchText")!) || ""
  );

  const inputText: any = useRef(null);

  // 전체 diary 데이터 get 요청
  const getDiaryData = async () => {
    try {
      const res = await BASE_API.get(`/diary`);
      setDiaryData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getDiaryData();
  }, []);

  // 검색 페이지 진입 시 검색바에 자동 포커스
  useEffect(() => {
    inputText.current.focus();
  }, []);

  // 검색어 로컬스토리지에 저장
  useEffect(() => {
    window.localStorage.setItem("searchText", JSON.stringify(userInput));
  }, [userInput]);

  // 마이페이지 탭, 페이지, 블록 상태 초기화
  useEffect(() => {
    localStorage.removeItem("myCurrentTab");
    localStorage.removeItem("myCurrentPage");
    localStorage.removeItem("myCurrentPageBlock");
  }, []);

  const inputChange = (e: any) => {
    setUserInput(e.target.value);
  };

  // 다이어리 제목 또는 본문에 검색 내용이 포함되어 있는 다이어리만 필터링
  const searchDiaryList = diaryData.filter(
    (value) => value.title.includes(userInput) || value.body.includes(userInput)
  );

  // console.log(searchDiaryList);
  // console.log(searchDiaryList.length);

  return (
    <>
      <SearchbarContainer>
        <Searchbar>
          <input
            placeholder='검색어를 입력해 주세요'
            ref={inputText}
            onChange={inputChange}
            value={userInput}
          />
          <button>
            <FiSearch size={25} />
          </button>
        </Searchbar>
        {searchDiaryList.length !== 0 && userInput.length !== 0 ? (
          <SearchInfo>
            <div className='countNum'>{searchDiaryList.length}개</div>
            <div className='countText'>의 다이어리를 찾았습니다.</div>
          </SearchInfo>
        ) : searchDiaryList.length === 0 &&
          userInput.length !== 0 &&
          JSON.parse(localStorage.getItem("searchText")!) === "" ? (
          <NoDiary>
            <img src={noDiary} alt='noDiaryImg' />
            <div className='noDiaryText'>찾으시는 다이어리가 없어요!</div>
          </NoDiary>
        ) : null}
      </SearchbarContainer>
      <DiaryMain.DiaryMainContainer>
        {searchDiaryList.length !== 0 && userInput.length !== 0 ? (
          <DiaryMain.DiaryMainWrapper>
            {searchDiaryList.map((value) => {
              return <SearchDiaryList list={value} key={value.diaryId} />;
            })}
          </DiaryMain.DiaryMainWrapper>
        ) : null}
      </DiaryMain.DiaryMainContainer>
    </>
  );
}

export default SearchDiaryMain;
