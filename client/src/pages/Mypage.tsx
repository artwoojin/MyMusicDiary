import * as Main from "./Main";
import MypageMain from "../components/Mypage/MypageMain";
import LoginHeader from "../components/Nav/LoginHeader";
import LogoutHeader from "../components/Nav/LogoutHeader";
import { useAppSelector } from "../redux/hooks/hooks";

export default function Mypage() {
  const loginState = useAppSelector((state) => state.loginReducer.isLogin);

  return (
    <Main.Page>
      {loginState ? <LoginHeader /> : <LogoutHeader />}
      <MypageMain />
    </Main.Page>
  );
}
