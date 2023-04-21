import * as Main from "./Main";
import MypageMain from "../components/Mypage/MypageMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { MyContext } from "../theme";

function Mypage() {
  const { isLogin }: any = useContext(MyContext);

  return (
    <Main.Page>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <MypageMain />
    </Main.Page>
  );
}

export default Mypage;
