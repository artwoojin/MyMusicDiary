import * as Pagination from "../Main/Pagination";
import { BiArrowToLeft, BiArrowToRight, BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

interface PaginationProps {
  searchPageLength: number;
  LIMIT_COUNT: number;
  searchCurrentPage: number;
  setSearchCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchBlockNum: number;
  setSearchBlockNum: React.Dispatch<React.SetStateAction<number>>;
  userInputLength: number;
}

function SearchPagination({
  searchPageLength,
  LIMIT_COUNT,
  searchCurrentPage,
  setSearchCurrentPage,
  searchBlockNum,
  setSearchBlockNum,
  userInputLength,
}: PaginationProps) {
  const PAGE_COUNT: number = 5; // 페이지 당 표시할 페이지네이션 수 (기본값 : 5개의 페이지네이션 노출)
  const blockArea: number = searchBlockNum * PAGE_COUNT; // 각 페이지에서 첫 페이지네이션의 위치 계산

  const numSearchPages: number = Math.ceil(searchPageLength / LIMIT_COUNT); // 나의 다이어리 페이지 개수

  // 새로운 배열 생성 함수
  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
      iArr[i] = i + 1;
    }
    return iArr;
  };
  const searchArr: number[] = createArr(numSearchPages);

  // 제일 처음 페이지로 이동하는 버튼 이벤트 핸들러
  const firstPageHandler = () => {
    setSearchCurrentPage(1);
    setSearchBlockNum(0);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // 나의 다이어리에서 제일 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const diaryLastPageHandler = () => {
    setSearchCurrentPage(numSearchPages);
    setSearchBlockNum(Math.ceil(numSearchPages / PAGE_COUNT) - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // 현재 페이지의 이전 페이지로 이동하는 버튼 이벤트 핸들러
  const prevPageHandler = () => {
    if (searchCurrentPage <= 1) {
      return;
    } else if (searchCurrentPage - 1 <= PAGE_COUNT * searchBlockNum) {
      setSearchBlockNum((n: number) => n - 1);
    }
    setSearchCurrentPage((n: number) => n - 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  // 현재 페이지의 다음 페이지 이동하는 버튼 이벤트 핸들러
  const nextPageHandler = () => {
    if (searchCurrentPage >= numSearchPages) {
      return;
    } else if (PAGE_COUNT * (searchBlockNum + 1) < searchCurrentPage + 1) {
      setSearchBlockNum((n: number) => n + 1);
    }
    setSearchCurrentPage((n: number) => n + 1);
    window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
  };

  return (
    <>
      {searchArr.length !== 0 && userInputLength !== 0 ? (
        <Pagination.PageNum>
          <button
            className='leftHandle'
            onClick={firstPageHandler}
            disabled={searchCurrentPage === 1}
          >
            <BiArrowToLeft size={20} />
          </button>
          <button
            className='leftHandle'
            onClick={prevPageHandler}
            disabled={searchCurrentPage === 1}
          >
            <BiLeftArrowAlt size={19} />
          </button>
          {searchArr.slice(blockArea, PAGE_COUNT + blockArea).map((n) => (
            <button
              className={searchCurrentPage === n ? "pageTab pageFocused" : "pageTab"}
              key={n}
              onClick={() => {
                setSearchCurrentPage(n);
                window.scrollTo(0, parseInt(document.body.style.top || "0", 10) * -1);
              }}
            >
              {n}
            </button>
          ))}
          <button
            className='rightHandle'
            onClick={nextPageHandler}
            disabled={searchCurrentPage === numSearchPages}
          >
            <BiRightArrowAlt size={19} />
          </button>
          <button
            className='rightHandle'
            onClick={diaryLastPageHandler}
            disabled={searchCurrentPage === numSearchPages}
          >
            <BiArrowToRight size={20} />
          </button>
        </Pagination.PageNum>
      ) : null}
    </>
  );
}

export default SearchPagination;
