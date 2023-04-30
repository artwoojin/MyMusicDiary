import * as Main from "./Main";
import EditMain from "../components/EditDiary/EditMain";
import LoginHeader from "../components/Nav/LoginHeader";
import LogoutHeader from "../components/Nav/LogoutHeader";
import { useContext } from "react";
import { MyContext } from "../util/MyContext";

function EditDiary() {
  const { isLogin }: any = useContext(MyContext);

  return (
    <Main.Page>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <EditMain />
    </Main.Page>
  );
}

export default EditDiary;
