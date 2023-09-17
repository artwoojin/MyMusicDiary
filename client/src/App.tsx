import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightMode, darkMode } from "./assets/style/theme";
import { useAppSelector } from "./redux/hooks/hooks";
import { ToastAlert } from "./assets/style/alertStyle";
import Router from "./Router";
import { GlobalStyle } from "./assets/style/globalStyle";

export default function App() {
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
      <GlobalStyle />
      <Router />
      <ToastAlert hideProgressBar={false} autoClose={2000} pauseOnFocusLoss={true} />
    </ThemeProvider>
  );
}
