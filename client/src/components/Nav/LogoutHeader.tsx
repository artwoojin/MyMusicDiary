import styled from "styled-components";
import * as LoginHeader from "./LoginHeader";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useContext } from "react";
import { MyContext } from "../../util/MyContext";
import six from "../../assets/images/006.png";

const ButtonArea = styled.div`
  display: flex;
  align-items: center;
`;

const LoginButton = styled.button`
  width: 80px;
  height: 35px;
  font-weight: ${(props) => props.theme.font.logoWeight};
  font-size: 15px;
  margin-left: 5px;
  background-color: transparent;
  border-radius: 50px;
  color: ${(props) => props.theme.color.mainText};
  border: 1.5px solid ${(props) => props.theme.color.mainText};
  cursor: pointer;
`;

function LogoutHeader() {
  const { isChange, changeMode }: any = useContext(MyContext);

  return (
    <LoginHeader.HeaderContainer>
      <LoginHeader.HeaderWrapper>
        <Link to='/'>
          <LoginHeader.Logo src={six} />
        </Link>
        <ButtonArea>
          <LoginHeader.ModeButton onClick={changeMode}>
            {isChange === "dark" ? (
              <BsFillMoonStarsFill className='darkIcon' size={20} />
            ) : (
              <BsFillSunFill className='lightIcon' size={25} />
            )}
          </LoginHeader.ModeButton>
          <Link to='/Login'>
            <LoginHeader.NewPost>새 다이어리 작성</LoginHeader.NewPost>
          </Link>
          <Link to='/Login'>
            <LoginButton>로그인</LoginButton>
          </Link>
        </ButtonArea>
      </LoginHeader.HeaderWrapper>
    </LoginHeader.HeaderContainer>
  );
}

export default LogoutHeader;