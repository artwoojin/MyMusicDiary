import * as Main from "./Main";
import DetailMain from "../components/DetailDiary/DetailMain";
import LoginHeader from "../components/Nav/LoginHeader";
import LogoutHeader from "../components/Nav/LogoutHeader";
import { useAppSelector } from "../redux/hooks/hooks";

export default function DetailDiary() {
  const loginState = useAppSelector((state) => state.loginReducer.isLogin);

  return (
    <Main.Page>
      {loginState ? <LoginHeader /> : <LogoutHeader />}
      <DetailMain />
    </Main.Page>
  );
}
