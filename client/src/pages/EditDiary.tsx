import * as Main from "./Main";
import EditMain from "../components/EditDiary/EditMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { MyContext } from "../theme";

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
