import * as Main from "./Main";
import SearchDiaryMain from "../components/SearchDiary/SearchDiaryMain";
import LoginHeader from "../components/Nav/LoginHeader";
import LogoutHeader from "../components/Nav/LogoutHeader";
import { useContext } from "react";
import { MyContext } from "../util/MyContext";

function SearchDiary() {
  const { isLogin }: any = useContext(MyContext);

  return (
    <Main.Page>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <SearchDiaryMain />
    </Main.Page>
  );
}

export default SearchDiary;
