import * as Main from "./Main";
import DetailMain from "../components/DetailDiary/DetailMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { MyContext } from "../theme";

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
