import * as Main from "./Main";
import NewMain from "../components/NewDiary/NewMain";
import LoginHeader from "../components/Nav/LoginHeader";
import LogoutHeader from "../components/Nav/LogoutHeader";
import { useAppSelector } from "../redux/hooks/hooks";

export default function NewDiary() {
  const loginState = useAppSelector((state) => state.loginReducer.isLogin);

  return (
    <Main.Page>
      {loginState ? <LoginHeader /> : <LogoutHeader />}
      <NewMain />
    </Main.Page>
  );
}
