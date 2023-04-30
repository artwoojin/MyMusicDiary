import * as Main from "./Main";
import NewMain from "../components/NewDiary/NewMain";
import LoginHeader from "../components/Nav/LoginHeader";
import LogoutHeader from "../components/Nav/LogoutHeader";
import { useContext } from "react";
import { MyContext } from "../util/MyContext";

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
