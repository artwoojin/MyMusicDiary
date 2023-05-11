import styled from "styled-components";
import GlobalStyle from "./assets/style/GlobalStyle";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Spinner from "./components/common/Spinner";
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightMode, darkMode } from "./assets/style/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import SearchDiary from "./pages/Search";
import { useAppSelector } from "./redux/hooks/hooks";

const ToastAlert = styled(ToastContainer)`
  .Toastify__toast {
    font-size: ${(props) => props.theme.font.diaryContentSize}px;
    color: ${(props) => props.theme.color.mainText};
    background-color: ${(props) => props.theme.color.inputBackground};
  }

  .Toastify__close-button {
    color: ${(props) => props.theme.color.mainText};
  }
`;

const NewDiary = lazy(() => import("./pages/NewDiary"));
const Mypage = lazy(() => import("./pages/Mypage"));
const DetailDiary = lazy(() => import("./pages/DetailDiary"));
const EditDiary = lazy(() => import("./pages/EditDiary"));

function App() {
  const modeState = useAppSelector((state) => state.themeReducer.isChange);

  // 브라우저 종료/새로고침 시 메인/마이 페이지 탭, 페이지, 블록, 검색어 로컬스토리지 초기화
  const removeLocalStorage = () => {
    localStorage.removeItem("mainCurrentTab");
    localStorage.removeItem("mainCurrentPage");
    localStorage.removeItem("mainCurrentPageBlock");
    localStorage.removeItem("mainCurrentSortedTab");
    localStorage.removeItem("myCurrentTab");
    localStorage.removeItem("myCurrentPage");
    localStorage.removeItem("myCurrentPageBlock");
    localStorage.removeItem("searchText");
  };
  useEffect(() => {
    (() => {
      window.addEventListener("unload", removeLocalStorage);
    })();
    return () => {
      window.removeEventListener("unload", removeLocalStorage);
    };
  }, []);

  return (
    <ThemeProvider theme={modeState === "dark" ? darkMode : lightMode}>
      <Suspense fallback={<Spinner />}>
        <div className='App'>
          <GlobalStyle />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/NewDiary' element={<NewDiary />} />
            <Route path='/Mypage' element={<Mypage />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/DetailDiary/:diaryId' element={<DetailDiary />} />
            <Route path='/EditDiary/:diaryId' element={<EditDiary />} />
            <Route path='/Search' element={<SearchDiary />} />
          </Routes>
          <ToastAlert hideProgressBar={false} autoClose={2000} pauseOnFocusLoss={true} />
        </div>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
