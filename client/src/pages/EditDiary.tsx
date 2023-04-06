import * as Main from "./Main";
import EditMain from "../components/EditDiary/EditMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { myContext } from "../theme";

function EditDiary() {
  const { isLogin }: any = useContext(myContext);

  return (
    <Main.Page>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <EditMain />
    </Main.Page>
  );
}

export default EditDiary;
