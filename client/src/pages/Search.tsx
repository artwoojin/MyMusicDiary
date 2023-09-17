import * as Main from "./Main";
import SearchDiaryMain from "../components/SearchDiary/SearchDiaryMain";
import LoginHeader from "../components/Nav/LoginHeader";
import LogoutHeader from "../components/Nav/LogoutHeader";
import { useAppSelector } from "../redux/hooks/hooks";

export default function SearchDiary() {
  const loginState = useAppSelector((state) => state.loginReducer.isLogin);

  return (
    <Main.Page>
      {loginState ? <LoginHeader /> : <LogoutHeader />}
      <SearchDiaryMain />
    </Main.Page>
  );
}
