import styled from "styled-components";
import GlobalStyle from "./assets/style/GlobalStyle";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Spinner from "./components/common/Spinner";
import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightMode, darkMode } from "./assets/style/theme";
import { MyContext } from "./util/MyContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const ToastAlert = styled(ToastContainer)`
  .Toastify__toast {
    font-size: 15px;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isLogin = localStorage.getItem("accessToken");
  const currentUser = JSON.parse(localStorage.getItem("CURRENT_USER")!);

  const LocalTheme = localStorage.getItem("theme");
  const [isChange, setIsChange] = useState(LocalTheme);

  const changeMode = () => {
    const changeTheme = isChange === "light" ? "dark" : "light";
    setIsChange(changeTheme);
    localStorage.setItem("theme", changeTheme);
  };

  return (
    <MyContext.Provider
      value={{ isLogin, currentUser, isChange, changeMode, isLoading, setIsLoading }}
    >
      <ThemeProvider theme={isChange === "dark" ? darkMode : lightMode}>
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
            </Routes>
            <ToastAlert hideProgressBar={false} autoClose={2000} pauseOnFocusLoss={true} />
          </div>
        </Suspense>
      </ThemeProvider>
    </MyContext.Provider>
  );
}

export default App;
