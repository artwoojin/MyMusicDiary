import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useContext } from "react";
import { myContext } from "../theme";
import mainIcon from "../util/img/mainIcon.png";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 15px 0 15px;
  justify-content: space-between;

  .buttonArea {
    display: flex;
    align-items: center;
  }
`;

const Logo = styled.div`
  font-weight: ${(props) => props.theme.font.logoWeight};
  font-size: 20px;

  a {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.logo};
    text-decoration: none;

    > img {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      margin-bottom: 4px;
    }
  }
`;

const ModeButton = styled.button`
  padding-top: 3px;
  width: 40px;
  border: none;
  background-color: transparent;
  margin-right: 10px;
  cursor: pointer;

  > .lightIcon {
    color: ${(props) => props.theme.color.mainText};
  }

  > .darkIcon {
    color: ${(props) => props.theme.color.mainText};
  }
`;

const NewDiaryPostButton = styled.button`
  width: 150px;
  height: 35px;
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: ${(props) => props.theme.color.mainText};
  font-weight: ${(props) => props.theme.font.logoWeight};
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 80px;
  height: 35px;
  font-weight: ${(props) => props.theme.font.logoWeight};
  font-size: 15px;
  background-color: transparent;
  border-radius: 50px;
  color: ${(props) => props.theme.color.mainText};
  border: 1.5px solid ${(props) => props.theme.color.mainText};
  margin: 0 10px 0 15px;
  cursor: pointer;
`;

function LogoutHeader() {
  const { isChange, changeMode }: any = useContext(myContext);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo>
          <Link to='/'>
            {" "}
            <img src={mainIcon} alt='mainIcon' />
            나만의 작은 음악 다이어리
          </Link>
        </Logo>
        <div className='buttonArea'>
          <ModeButton onClick={changeMode}>
            {isChange === "dark" ? (
              <BsFillMoonStarsFill className='darkIcon' size={20} />
            ) : (
              <BsFillSunFill className='lightIcon' size={25} />
            )}
          </ModeButton>
          <div className='buttonArea'>
            <Link to='/Login'>
              <NewDiaryPostButton>새 다이어리 등록</NewDiaryPostButton>
            </Link>
            <Link to='/Login'>
              <LoginButton>로그인</LoginButton>
            </Link>
          </div>
        </div>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default LogoutHeader;
