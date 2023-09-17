import styled from "styled-components";
import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollTopButton() {
  const [showButton, setShowButton] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const showPosition = () => {
    if (window.scrollY > 1000) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", showPosition);
    return () => {
      window.removeEventListener("scroll", showPosition);
    };
  }, []);

  return (
    <>
      {showButton ? (
        <TopButton onClick={scrollToTop}>
          <ButtonText>
            <IoIosArrowUp className='arrowIcon' size={35} />
            <div className='topText'>TOP</div>
          </ButtonText>
        </TopButton>
      ) : null}
    </>
  );
}

const TopButton = styled.button`
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  width: 60px;
  height: 60px;
  border: none;
  z-index: 999;
  border-radius: 50px;
  background-color: ${(props) => props.theme.color.background};
  border: 4px solid ${(props) => props.theme.color.signature};
  cursor: pointer;

  @media screen and (max-width: 721px) {
    right: 1rem;
    bottom: 1rem;
  }
`;

const ButtonText = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: -10px;

  > .arrowIcon {
    color: #ffe5ca;
  }

  > .topText {
    margin-top: -7px;
    color: ${(props) => props.theme.color.thirdText};
    font-size: 11px;
    font-weight: ${(props) => props.theme.font.titleWeight};
  }
`;
