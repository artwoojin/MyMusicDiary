import * as Main from "./Main";
import DetailMain from "../components/DetailDiary/DetailMain";
import LoginHeader from "../components/Nav/LoginHeader";
import LogoutHeader from "../components/Nav/LogoutHeader";
import { useContext } from "react";
import { MyContext } from "../util/MyContext";

function DetailDiary() {
  const { isLogin }: any = useContext(MyContext);

  return (
    <Main.Page>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <DetailMain />
    </Main.Page>
  );
}

export default DetailDiary;
