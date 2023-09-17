import styled from "styled-components";
import { BiArrowToLeft, BiArrowToRight, BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

interface PaginationProps {
  allPageLength: number;
  LIMIT_COUNT: number;
  mainCurrentPage: number;
  setMainCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  mainCurrentTab: number;
  tagOnePageLength: number;
  tagTwoPageLength: number;
  tagThreePageLength: number;
  tagFourPageLength: number;
  tagFivePageLength: number;
  tagSixPageLength: number;
  tagSevenPageLength: number;
  tagEightPageLength: number;
  mainBlockNum: number;
  setMainBlockNum: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  LIMIT_COUNT,
  mainCurrentPage,
  setMainCurrentPage,
  mainCurrentTab,
  allPageLength,
  tagOnePageLength,
  tagTwoPageLength,
  tagThreePageLength,
  tagFourPageLength,
  tagFivePageLength,
  tagSixPageLength,
  tagSevenPageLength,
  tagEightPageLength,
  mainBlockNum,
  setMainBlockNum,
}: PaginationProps) {
  const PAGE_COUNT: number = 5; // 페이지 당 표시할 페이지네이션 수 (기본값 : 10개의 페이지네이션 노출)
  const blockArea: number = mainBlockNum * PAGE_COUNT; // 각 페이지에서 첫 페이지네이션의 위치 계산

  const numAllPages: number = Math.ceil(allPageLength / LIMIT_COUNT); // 필요한 페이지 개수
  const numTagOnePages: number = Math.ceil(tagOnePageLength / LIMIT_COUNT);
  const numTagTwoPages: number = Math.ceil(tagTwoPageLength / LIMIT_COUNT);
  const numTagThreePages: number = Math.ceil(tagThreePageLength / LIMIT_COUNT);
  const numTagFourPages: number = Math.ceil(tagFourPageLength / LIMIT_COUNT);
  const numTagFivePages: number = Math.ceil(tagFivePageLength / LIMIT_COUNT);
  const numTagSixPages: number = Math.ceil(tagSixPageLength / LIMIT_COUNT);
  const numTagSevenPages: number = Math.ceil(tagSevenPageLength / LIMIT_COUNT);
  const numTagEightPages: number = Math.ceil(tagEightPageLength / LIMIT_COUNT);

  // 새로운 배열 생성 함수
  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
      iArr[i] = i + 1;
    }
    return iArr;
  };
  const allArr: number[] = createArr(numAllPages); // nArr 함수에 전체 페이지의 개수를 배열로 담음
  const tagOneArr: number[] = createArr(numTagOnePages);
  const tagTwoArr: number[] = createArr(numTagTwoPages);
  const tagThreeArr: number[] = createArr(numTagThreePages);
  const tagFourArr: number[] = createArr(numTagFourPages);
  const tagFiveArr: number[] = createArr(numTagFivePages);
  const tagSixArr: number[] = createArr(numTagSixPages);
  const tagSevenArr: number[] = createArr(numTagSevenPages);
  const tagEightArr: number[] = createArr(numTagEightPages);

  // 제일 처음 페이지로 이동하는 버튼 이벤트 핸들러
  const firstPageHandler = () => {
    setMainCurrentPage(1);
    setMainBlockNum(0);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // 전체 데이터에서 제일 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const allLastPageHandler = () => {
    setMainCurrentPage(numAllPages);
    setMainBlockNum(Math.ceil(numAllPages / PAGE_COUNT) - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // #신나는 태그에서 제일 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const tagOneLastPageHandler = () => {
    setMainCurrentPage(numTagOnePages);
    setMainBlockNum(Math.ceil(numTagOnePages / PAGE_COUNT) - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // #감성적인 태그에서 제일 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const tagTwoLastPageHandler = () => {
    setMainCurrentPage(numTagTwoPages);
    setMainBlockNum(Math.ceil(numTagTwoPages / PAGE_COUNT) - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // #잔잔한 태그에서 제일 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const tagThreeLastPageHandler = () => {
    setMainCurrentPage(numTagThreePages);
    setMainBlockNum(Math.ceil(numTagThreePages / PAGE_COUNT) - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // #애절한 태그에서 제일 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const tagFourLastPageHandler = () => {
    setMainCurrentPage(numTagFourPages);
    setMainBlockNum(Math.ceil(numTagFourPages / PAGE_COUNT) - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // #그루브한 태그에서 제일 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const tagFiveLastPageHandler = () => {
    setMainCurrentPage(numTagFivePages);
    setMainBlockNum(Math.ceil(numTagFivePages / PAGE_COUNT) - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // #몽환적인 태그에서 제일 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const tagSixLastPageHandler = () => {
    setMainCurrentPage(numTagSixPages);
    setMainBlockNum(Math.ceil(numTagSixPages / PAGE_COUNT) - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // #어쿠스틱한 태그에서 제일 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const tagSevenLastPageHandler = () => {
    setMainCurrentPage(numTagSevenPages);
    setMainBlockNum(Math.ceil(numTagSevenPages / PAGE_COUNT) - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // #청량한한 태그에서 제일 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const tagEigthLastPageHandler = () => {
    setMainCurrentPage(numTagEightPages);
    setMainBlockNum(Math.ceil(numTagEightPages / PAGE_COUNT) - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // 현재 페이지의 이전 페이지로 이동하는 버튼 이벤트 핸들러
  const prevPageHandler = () => {
    if (mainCurrentPage <= 1) {
      return;
    } else if (mainCurrentPage - 1 <= PAGE_COUNT * mainBlockNum) {
      setMainBlockNum(mainBlockNum - 1);
    }
    setMainCurrentPage(mainCurrentPage - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // 현재 페이지의 다음 페이지 이동하는 버튼 이벤트 핸들러
  const nextPageHandler = () => {
    if (mainCurrentPage >= numAllPages) {
      return;
    } else if (PAGE_COUNT * (mainBlockNum + 1) < mainCurrentPage + 1) {
      setMainBlockNum(mainBlockNum + 1);
    }
    setMainCurrentPage(mainCurrentPage + 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  return (
    <>
      {mainCurrentTab === 0 ? (
        allArr.length !== 0 ? (
          <PageNum>
            <button
              className='leftHandle'
              onClick={firstPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiArrowToLeft size={20} />
            </button>
            <button
              className='leftHandle'
              onClick={prevPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiLeftArrowAlt size={19} />
            </button>
            {allArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
              <button
                className={mainCurrentPage === n ? "pageTab pageFocused" : "pageTab"}
                key={n}
                onClick={() => {
                  setMainCurrentPage(n);
                  window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
                }}
              >
                {n}
              </button>
            ))}
            <button
              className='rightHandle'
              onClick={nextPageHandler}
              disabled={mainCurrentPage === numAllPages}
            >
              <BiRightArrowAlt size={19} />
            </button>
            <button
              className='rightHandle'
              onClick={allLastPageHandler}
              disabled={mainCurrentPage === numAllPages}
            >
              <BiArrowToRight size={20} />
            </button>
          </PageNum>
        ) : null
      ) : mainCurrentTab === 1 ? (
        tagOneArr.length !== 0 ? (
          <PageNum>
            <button
              className='leftHandle'
              onClick={firstPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiArrowToLeft size={20} />
            </button>
            <button
              className='leftHandle'
              onClick={prevPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiLeftArrowAlt size={19} />
            </button>
            {tagOneArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
              <button
                className={mainCurrentPage === n ? "pageTab pageFocused" : "pageTab"}
                key={n}
                onClick={() => {
                  setMainCurrentPage(n);
                  window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
                }}
              >
                {n}
              </button>
            ))}
            <button
              className='rightHandle'
              onClick={nextPageHandler}
              disabled={mainCurrentPage === numTagOnePages}
            >
              <BiRightArrowAlt size={19} />
            </button>
            <button
              className='rightHandle'
              onClick={tagOneLastPageHandler}
              disabled={mainCurrentPage === numTagOnePages}
            >
              <BiArrowToRight size={20} />
            </button>
          </PageNum>
        ) : null
      ) : mainCurrentTab === 2 ? (
        tagTwoArr.length !== 0 ? (
          <PageNum>
            <button
              className='leftHandle'
              onClick={firstPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiArrowToLeft size={20} />
            </button>
            <button
              className='leftHandle'
              onClick={prevPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiLeftArrowAlt size={19} />
            </button>
            {tagTwoArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
              <button
                className={mainCurrentPage === n ? "pageTab pageFocused" : "pageTab"}
                key={n}
                onClick={() => {
                  setMainCurrentPage(n);
                  window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
                }}
              >
                {n}
              </button>
            ))}
            <button
              className='rightHandle'
              onClick={nextPageHandler}
              disabled={mainCurrentPage === numTagTwoPages}
            >
              <BiRightArrowAlt size={19} />
            </button>
            <button
              className='rightHandle'
              onClick={tagTwoLastPageHandler}
              disabled={mainCurrentPage === numTagTwoPages}
            >
              <BiArrowToRight size={20} />
            </button>
          </PageNum>
        ) : null
      ) : mainCurrentTab === 3 ? (
        tagThreeArr.length !== 0 ? (
          <PageNum>
            <button
              className='leftHandle'
              onClick={firstPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiArrowToLeft size={20} />
            </button>
            <button
              className='leftHandle'
              onClick={prevPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiLeftArrowAlt size={19} />
            </button>
            {tagThreeArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
              <button
                className={mainCurrentPage === n ? "pageTab pageFocused" : "pageTab"}
                key={n}
                onClick={() => {
                  setMainCurrentPage(n);
                  window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
                }}
              >
                {n}
              </button>
            ))}
            <button
              className='rightHandle'
              onClick={nextPageHandler}
              disabled={mainCurrentPage === numTagThreePages}
            >
              <BiRightArrowAlt size={19} />
            </button>
            <button
              className='rightHandle'
              onClick={tagThreeLastPageHandler}
              disabled={mainCurrentPage === numTagThreePages}
            >
              <BiArrowToRight size={20} />
            </button>
          </PageNum>
        ) : null
      ) : mainCurrentTab === 4 ? (
        tagFourArr.length !== 0 ? (
          <PageNum>
            <button
              className='leftHandle'
              onClick={firstPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiArrowToLeft size={20} />
            </button>
            <button
              className='leftHandle'
              onClick={prevPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiLeftArrowAlt size={19} />
            </button>
            {tagFourArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
              <button
                className={mainCurrentPage === n ? "pageTab pageFocused" : "pageTab"}
                key={n}
                onClick={() => {
                  setMainCurrentPage(n);
                  window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
                }}
              >
                {n}
              </button>
            ))}
            <button
              className='rightHandle'
              onClick={nextPageHandler}
              disabled={mainCurrentPage === numTagFourPages}
            >
              <BiRightArrowAlt size={19} />
            </button>
            <button
              className='rightHandle'
              onClick={tagFourLastPageHandler}
              disabled={mainCurrentPage === numTagFourPages}
            >
              <BiArrowToRight size={20} />
            </button>
          </PageNum>
        ) : null
      ) : mainCurrentTab === 5 ? (
        tagFiveArr.length !== 0 ? (
          <PageNum>
            <button
              className='leftHandle'
              onClick={firstPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiArrowToLeft size={20} />
            </button>
            <button
              className='leftHandle'
              onClick={prevPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiLeftArrowAlt size={19} />
            </button>
            {tagFiveArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
              <button
                className={mainCurrentPage === n ? "pageTab pageFocused" : "pageTab"}
                key={n}
                onClick={() => {
                  setMainCurrentPage(n);
                  window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
                }}
              >
                {n}
              </button>
            ))}
            <button
              className='rightHandle'
              onClick={nextPageHandler}
              disabled={mainCurrentPage === numTagFivePages}
            >
              <BiRightArrowAlt size={19} />
            </button>
            <button
              className='rightHandle'
              onClick={tagFiveLastPageHandler}
              disabled={mainCurrentPage === numTagFivePages}
            >
              <BiArrowToRight size={20} />
            </button>
          </PageNum>
        ) : null
      ) : mainCurrentTab === 6 ? (
        tagSixArr.length !== 0 ? (
          <PageNum>
            <button
              className='leftHandle'
              onClick={firstPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiArrowToLeft size={20} />
            </button>
            <button
              className='leftHandle'
              onClick={prevPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiLeftArrowAlt size={19} />
            </button>
            {tagSixArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
              <button
                className={mainCurrentPage === n ? "pageTab pageFocused" : "pageTab"}
                key={n}
                onClick={() => {
                  setMainCurrentPage(n);
                  window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
                }}
              >
                {n}
              </button>
            ))}
            <button
              className='rightHandle'
              onClick={nextPageHandler}
              disabled={mainCurrentPage === numTagSixPages}
            >
              <BiRightArrowAlt size={19} />
            </button>
            <button
              className='rightHandle'
              onClick={tagSixLastPageHandler}
              disabled={mainCurrentPage === numTagSixPages}
            >
              <BiArrowToRight size={20} />
            </button>
          </PageNum>
        ) : null
      ) : mainCurrentTab === 7 ? (
        tagSevenArr.length !== 0 ? (
          <PageNum>
            <button
              className='leftHandle'
              onClick={firstPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiArrowToLeft size={20} />
            </button>
            <button
              className='leftHandle'
              onClick={prevPageHandler}
              disabled={mainCurrentPage === 1}
            >
              <BiLeftArrowAlt size={19} />
            </button>
            {tagSevenArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
              <button
                className={mainCurrentPage === n ? "pageTab pageFocused" : "pageTab"}
                key={n}
                onClick={() => {
                  setMainCurrentPage(n);
                  window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
                }}
              >
                {n}
              </button>
            ))}
            <button
              className='rightHandle'
              onClick={nextPageHandler}
              disabled={mainCurrentPage === numTagSevenPages}
            >
              <BiRightArrowAlt size={19} />
            </button>
            <button
              className='rightHandle'
              onClick={tagSevenLastPageHandler}
              disabled={mainCurrentPage === numTagSevenPages}
            >
              <BiArrowToRight size={20} />
            </button>
          </PageNum>
        ) : null
      ) : tagEightArr.length !== 0 ? (
        <PageNum>
          <button
            className='leftHandle'
            onClick={firstPageHandler}
            disabled={mainCurrentPage === 1}
          >
            <BiArrowToLeft size={20} />
          </button>
          <button className='leftHandle' onClick={prevPageHandler} disabled={mainCurrentPage === 1}>
            <BiLeftArrowAlt size={19} />
          </button>
          {tagEightArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={mainCurrentPage === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setMainCurrentPage(n);
                window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
              }}
            >
              {n}
            </button>
          ))}
          <button
            className='rightHandle'
            onClick={nextPageHandler}
            disabled={mainCurrentPage === numTagEightPages}
          >
            <BiRightArrowAlt size={19} />
          </button>
          <button
            className='rightHandle'
            onClick={tagEigthLastPageHandler}
            disabled={mainCurrentPage === numTagEightPages}
          >
            <BiArrowToRight size={20} />
          </button>
        </PageNum>
      ) : null}
    </>
  );
}

export const PageNum = styled.div`
  margin: 50px 0 0 0;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  user-select: none;

  > .pageTab,
  .leftHandle,
  .rightHandle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    color: ${(props) => props.theme.color.mainText};
    transition: 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      width: 30px;
      height: 30px;
      border-radius: 50px;
      background-color: ${(props) => props.theme.color.buttonHover};
    }

    &:disabled {
      color: ${(props) => props.theme.color.pageDisabled};
      background-color: transparent;
    }
  }

  > .pageFocused {
    width: 30px;
    height: 30px;
    background-color: ${(props) => props.theme.color.signature};
    border: none;
    border-radius: 50px;
    color: ${(props) => props.theme.color.signatureText};
    font-weight: ${(props) => props.theme.font.titleWeight};

    &:hover {
      width: 30px;
      height: 30px;
      border-radius: 50px;
      background-color: ${(props) => props.theme.color.signature};
    }
  }
`;
