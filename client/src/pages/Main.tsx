import styled from "styled-components";
import Carousel from "../components/Main/Carousel";
import DiaryMain from "../components/Main/DiaryMain";
import LoginHeader from "../components/Nav/LoginHeader";
import LogoutHeader from "../components/Nav/LogoutHeader";
import { useAppSelector } from "../redux/hooks/hooks";

export const Page = styled.div`
  background-color: ${(props) => props.theme.color.background};
  transition: 0.2s ease-in-out;
  height: 100vh;
`;

function Main() {
  const loginState = useAppSelector((state) => state.loginReducer.isLogin);

  return (
    <Page>
      {loginState ? <LoginHeader /> : <LogoutHeader />}
      <Carousel />
      <DiaryMain />
    </Page>
  );
}

export default Main;
