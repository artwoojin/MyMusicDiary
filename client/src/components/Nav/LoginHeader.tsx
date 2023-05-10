import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { BASE_API } from "../../util/API";
import { GoTriangleDown } from "react-icons/go";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { FiLogOut, FiEdit3, FiUser, FiSearch } from "react-icons/fi";
import { MyContext } from "../../util/MyContext";
import defaultProfile from "../../assets/images/defaultProfile.png";
import logo_black from "../../assets/images/logo_black.png";
import logo_white from "../../assets/images/logo_white.png";
import { useAppSelector } from "../../redux/hooks/hooks";

export const HeaderContainer = styled.nav`
  display: flex;
  justify-content: center;
`;

export const HeaderWrapper = styled.div`
  width: 100vw;
  max-width: 1440px;
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 15px 0 15px;
  justify-content: space-between;
`;

export const Logo = styled.img`
  width: 150px;
  height: 70px;
  margin-left: -20px;
  object-fit: contain;

  // 721px 이하에서 로고 크기 축소
  @media screen and (max-width: 721px) {
    width: 130px;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  column-gap: 10px;

  // 721px 이하에서 각 버튼 간격 축소
  @media screen and (max-width: 721px) {
    column-gap: 7px;
  }
`;

export const SearchButton = styled.button`
  padding-top: 4px;
  width: 35px;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.color.mainText};
  cursor: pointer;
`;

export const ModeButton = styled.button`
  padding-top: 3px;
  width: 35px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  > .lightIcon {
    color: ${(props) => props.theme.color.mainText};
  }

  > .darkIcon {
    color: ${(props) => props.theme.color.mainText};
  }
`;

export const NewPost = styled.button`
  width: 130px;
  height: 35px;
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: ${(props) => props.theme.color.mainText};
  font-weight: ${(props) => props.theme.font.logoWeight};
  cursor: pointer;

  // 721px 이하에서 헤더의 새 다이어리 작성 버튼 숨김 적용
  @media screen and (max-width: 721px) {
    display: none;
  }
`;

const ProfileButton = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  margin-right: -20px;
  cursor: pointer;

  > .triangleDown {
    color: #787f84;
  }

  &:hover {
    > .triangleDown {
      color: ${(props) => props.theme.color.subText};
    }
  }
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.086) 0px 0px 8px;
`;

const Dropdown = styled.ul`
  width: 170px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
  background-color: ${(props) => props.theme.color.inputBackground};
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 55px;
  right: 1px;
  list-style: none;
  z-index: 999;
  cursor: pointer;

  > a {
    padding: 12px;
    text-decoration: none;

    &:hover {
      border-radius: 4px;
      background-color: ${(props) => props.theme.color.dropDownHover};
    }
  }

  > li {
    padding: 12px;
    text-decoration: none;

    &:hover {
      border-radius: 4px;
      background-color: ${(props) => props.theme.color.dropDownHover};
    }
  }

  // 722px 이상에서 드롭다운의 새 다이어리 작성 버튼 숨김 적용
  > a:nth-child(2) {
    @media screen and (min-width: 722px) {
      display: none;
    }
  }
`;

const DropdownMyPageButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: ${(props) => props.theme.font.contentWeight};
  background-color: transparent;
  color: ${(props) => props.theme.color.mainText};
  border: none;
  cursor: pointer;

  > .myPageIcon {
    margin-right: 12px;
    margin-left: -0.5px;
  }
`;

const DropdownNewWriteButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: ${(props) => props.theme.font.contentWeight};
  background-color: transparent;
  color: ${(props) => props.theme.color.mainText};
  border: none;
  cursor: pointer;

  > .newWriteIcon {
    margin-right: 12px;
  }
`;

const DropdownLogoutButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: ${(props) => props.theme.font.contentWeight};
  background-color: transparent;
  color: ${(props) => props.theme.color.mainText};
  border: none;
  cursor: pointer;

  > .logoutIcon {
    margin-right: 12px;
  }
`;

function LoginHeader() {
  const [imageData, setImageData] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isChange, changeMode }: any = useContext(MyContext);
  const currentUserInfo = useAppSelector((state) => state.loginReducer.currentUserInfo);
  const navigate = useNavigate();
  const dropMenuRef = useRef<HTMLDivElement | null>(null);

  // 내 유저 정보 get 요청
  const getImageData = async () => {
    try {
      const res = await BASE_API.get(`/users/${currentUserInfo.userId}`);
      setImageData(res.data.imageUrl);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getImageData();
  }, []);

  // 드롬다운 오픈 이벤트
  const openDropdown = (e: any) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleOutsideClose = (e: any) => {
      if (isOpen && !dropMenuRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("click", handleOutsideClose);
    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isOpen]);

  // 로그아웃
  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("CURRENT_USER");
    navigate("/");
    window.location.reload();
  };

  const replaceImg = (e: any) => {
    e.target.src = defaultProfile;
  };

  // 검색 페이지 이동
  const moveSearch = () => {
    navigate("/Search");
    localStorage.removeItem("searchText");
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Link to='/'>
          {isChange === "dark" ? <Logo src={logo_white} /> : <Logo src={logo_black} />}
        </Link>
        <ButtonArea>
          <SearchButton onClick={moveSearch}>
            <FiSearch size={22} />
          </SearchButton>
          <ModeButton onClick={changeMode}>
            {isChange === "dark" ? (
              <BsFillMoonStarsFill className='darkIcon' size={20} />
            ) : (
              <BsFillSunFill className='lightIcon' size={25} />
            )}
          </ModeButton>
          <Link to='/NewDiary'>
            <NewPost>새 다이어리 작성</NewPost>
          </Link>
          <ProfileButton onClick={openDropdown}>
            <Profile
              src={imageData ? imageData : defaultProfile}
              alt='헤더 프로필 이미지'
              onError={replaceImg}
            />
            <GoTriangleDown className='triangleDown' size={14} />
          </ProfileButton>
          <div ref={dropMenuRef}>
            {isOpen ? (
              <Dropdown>
                <Link to='/Mypage'>
                  <li>
                    <DropdownMyPageButton>
                      <FiUser className='myPageIcon' size={19} />
                      <div className='myPageText'>마이페이지</div>
                    </DropdownMyPageButton>
                  </li>
                </Link>
                <Link to='/NewDiary'>
                  <li>
                    <DropdownNewWriteButton>
                      <FiEdit3 className='newWriteIcon' size={18} />
                      <div className='newWriteText'>새 다이어리 작성</div>
                    </DropdownNewWriteButton>
                  </li>
                </Link>
                <li onClick={logOut}>
                  <DropdownLogoutButton>
                    <FiLogOut className='logoutIcon' size={18} />
                    <div className='logoutText'>로그아웃</div>
                  </DropdownLogoutButton>
                </li>
              </Dropdown>
            ) : null}
          </div>
        </ButtonArea>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

export default LoginHeader;
