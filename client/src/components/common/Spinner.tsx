import styled from "styled-components";
import MainIcon from "../../assets/images/mainIcon.png";

export default function Spinner() {
  return (
    <LoadingContainer>
      <MainIconImg src={MainIcon} alt='loading' />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  margin: -8px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.background};
`;

const MainIconImg = styled.img`
  width: 250px;
  height: 250px;
  margin-bottom: 30px;
  animation: shake 1.5s infinite;

  @media screen and (max-width: 721px) {
    width: 150px;
    height: 150px;
  }

  @keyframes shake {
    0% {
      transform: rotate(10deg);
    }
    50% {
      transform: rotate(-10deg);
    }
    100% {
      transform: rotate(10deg);
    }
  }
`;
