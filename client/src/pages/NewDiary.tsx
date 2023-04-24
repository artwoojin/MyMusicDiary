import * as Main from "./Main";
import NewMain from "../components/NewDiary/NewMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { MyContext } from "../theme";

function NewDiary() {
  const { isLogin }: any = useContext(MyContext);

  return (
    <Main.Page>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <NewMain />
    </Main.Page>
  );
}

export default NewDiary;
