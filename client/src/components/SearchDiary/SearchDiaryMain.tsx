import SearchDiaryList from "./SearchDiaryList";
import styled from "styled-components";
import * as DiaryMain from "../Main/DiaryMain";
import { DiaryData } from "../../util/Type";
import { BASE_API } from "../../util/API";
import { useState, useEffect } from "react";

const SearchbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 0 45px 0;
  padding: 0 15px 0 15px;
  /* border: 1px solid red; */
`;

const Searchbar = styled.input`
  width: 100%;
  max-width: 600px;
  height: 50px;
  margin-bottom: 15px;
  font-size: ${(props) => props.theme.font.diaryMainTitleSize}px;
  color: ${(props) => props.theme.color.mainText};
  padding: 10px 8px 10px 8px;
  border-radius: 4px;
  border: none;
  border: 1px solid ${(props) => props.theme.color.borderLine};
  background-color: ${(props) => props.theme.color.inputBackground};

  &:focus {
    border: 1px solid ${(props) => props.theme.color.thirdText};
    outline: none;
  }
`;

const SearchInfo = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  font-size: 16px;
  color: ${(props) => props.theme.color.mainText};
  /* border: 1px solid blue; */

  > .countNum {
    font-weight: ${(props) => props.theme.font.titleWeight};
  }

  > .countText {
    font-weight: ${(props) => props.theme.font.contentWeight};
  }
`;

function SearchDiaryMain() {
  const [diaryData, setDiaryData] = useState<DiaryData[]>([]); // 전체 diary 데이터
  const [userInput, setUserInput] = useState<string>("");

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

  const inputChange = (e: any) => {
    setUserInput(e.target.value);
  };

  const searchDiaryList = diaryData.filter(
    (value) => value.title.includes(userInput) || value.body.includes(userInput)
  );

  console.log(searchDiaryList);
  console.log(searchDiaryList.length);

  return (
    <>
      <SearchbarContainer>
        <Searchbar placeholder='검색어를 입력해주세요' onChange={inputChange} />
        {searchDiaryList.length && userInput.length !== 0 ? (
          <SearchInfo>
            <div className='countNum'>{searchDiaryList.length}</div>
            <div className='countText'>개의 다이어리를 찾았습니다.</div>
          </SearchInfo>
        ) : null}
      </SearchbarContainer>
      <DiaryMain.DiaryMainContainer>
        {searchDiaryList.length && userInput.length !== 0 ? (
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
