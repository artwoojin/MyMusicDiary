import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import styled from "styled-components";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { MyContext, lightMode, darkMode } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Spinner from "./components/Loading/Spinner";
import { lazy, Suspense } from "react";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background-color: ${(props) => props.theme.color.background};
}
`;

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
            {/* <Link to='/Loading'>
              <div>Loading</div>
            </Link> */}
            <GlobalStyle />
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/NewDiary' element={<NewDiary />} />
              <Route path='/Mypage' element={<Mypage />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Signup' element={<Signup />} />
              <Route path='/DetailDiary/:diaryId' element={<DetailDiary />} />
              <Route path='/EditDiary/:diaryId' element={<EditDiary />} />
              <Route path='/Loading' element={<Spinner />} />
            </Routes>
            <ToastAlert hideProgressBar={false} autoClose={2000} pauseOnFocusLoss={true} />
          </div>
        </Suspense>
      </ThemeProvider>
    </MyContext.Provider>
  );
}

export default App;
