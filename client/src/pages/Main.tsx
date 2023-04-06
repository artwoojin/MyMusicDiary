import styled from "styled-components";
import Carousel from "../components/Main/Carousel";
import DiaryMain from "../components/Main/DiaryMain";
import LoginHeader from "../components/LoginHeader";
import LogoutHeader from "../components/LogoutHeader";
import { useContext } from "react";
import { myContext } from "../theme";

export const Page = styled.div`
  background-color: ${(props) => props.theme.color.background};
  transition: 0.2s ease-in-out;
  height: 100vh;
`;

function Main() {
  const { isLogin }: any = useContext(myContext);

  return (
    <Page>
      {isLogin ? <LoginHeader /> : <LogoutHeader />}
      <Carousel />
      <DiaryMain />
    </Page>
  );
}

export default Main;
