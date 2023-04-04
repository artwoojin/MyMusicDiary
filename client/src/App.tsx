import Main from "./pages/Main";
import NewDiary from "./pages/NewDiary";
import Mypage from "./pages/Mypage";
import Login from "./pages/Login";
import DetailDiary from "./pages/DetailDiary";
import Signup from "./pages/Signup";
import EditDiary from "./pages/EditDiary";
import styled from "styled-components";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { myContext, lightMode, darkMode } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }

  body {
    background-color: ${(props) => props.theme.background};
  }
`;

const Test = styled(ToastContainer)`
  .Toastify__toast {
    font-size: 15px;
    color: ${(props) => props.theme.mainText};
    background-color: ${(props) => props.theme.disabledTagBackground};
  }

  .Toastify__close-button {
    color: ${(props) => props.theme.mainText};
  }
`;

function App() {
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
    <myContext.Provider value={{ isLogin, currentUser, isChange, changeMode }}>
      <ThemeProvider theme={isChange === "dark" ? darkMode : lightMode}>
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
          <Test hideProgressBar={false} autoClose={2000} pauseOnFocusLoss={true} limit={1} />
        </div>
      </ThemeProvider>
    </myContext.Provider>
  );
}

export default App;
