import * as Main from "./Main";
import MypageMain from "../components/Mypage/MypageMain";
import LoginHeader from "../components/Nav/LoginHeader";
import LogoutHeader from "../components/Nav/LogoutHeader";
import { useContext } from "react";
import { MyContext } from "../util/MyContext";

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
