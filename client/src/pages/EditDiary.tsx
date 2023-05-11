import * as Main from "./Main";
import EditMain from "../components/EditDiary/EditMain";
import LoginHeader from "../components/Nav/LoginHeader";
import LogoutHeader from "../components/Nav/LogoutHeader";
import { useAppSelector } from "../redux/hooks/hooks";

function EditDiary() {
  const loginState = useAppSelector((state) => state.loginReducer.isLogin);

  return (
    <Main.Page>
      {loginState ? <LoginHeader /> : <LogoutHeader />}
      <EditMain />
    </Main.Page>
  );
}

export default EditDiary;
