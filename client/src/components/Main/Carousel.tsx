import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import firstcarousel from "../../assets/images/firstcarousel.png";
import secondcarousel from "../../assets/images/secondcarousel.png";

const StyledSlider = styled(Slider)`
  height: 325px;
  margin-bottom: 70px;

  @media screen and (max-width: 525px) {
    height: 245px;
  }
`;

const FirstSlide = styled.div`
  background-color: #ffdab9;
  height: 310px;
  padding: 0 15px 0 15px;

  @media screen and (max-width: 525px) {
    height: 230px;
  }
`;

const SecondSlide = styled.div`
  background-color: #faeac7;
  height: 310px;
  padding: 0 15px 0 15px;

  @media screen and (max-width: 525px) {
    height: 230px;
  }
`;

const ContentArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 310px;

  @media screen and (max-width: 525px) {
    height: 230px;
  }
`;

const PromotionTitle = styled.div`
  > .mainTitle {
    font-size: 31px;
    font-weight: 800;
    margin-bottom: 10px;

    @media screen and (max-width: 1084px) {
      font-size: 28px;
      margin-right: 50px;
    }

    @media screen and (max-width: 721px) {
      font-size: 24px;
    }
  }

  > .subTitle {
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: ${(props) => props.theme.font.contentWeight};

    @media screen and (max-width: 721px) {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 525px) {
    width: 100%;
  }
`;

const PromotionImg = styled.div`
  @media screen and (max-width: 525px) {
    display: none;
  }

  > img {
    height: 300px;
    object-fit: contain;

    @media screen and (max-width: 1084px) {
      height: 250px;
    }

    @media screen and (max-width: 721px) {
      height: 200px;
    }
  }
`;

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <StyledSlider {...settings}>
      <FirstSlide>
        <ContentArea>
          <PromotionTitle>
            <div className='mainTitle'>혼자 듣기 아까운 숨은 명곡들</div>
            <div className='subTitle'>이제 마리플에서 같이 들어요 🎵</div>
          </PromotionTitle>
          <PromotionImg>
            <img src={firstcarousel} alt='listen music' />
          </PromotionImg>
        </ContentArea>
      </FirstSlide>
      <SecondSlide>
        <ContentArea>
          <PromotionTitle>
            <div className='mainTitle'>
              평범한 플레이리스트가 아닌 추억이 담긴
              <br />
              나만의 음악 다이어리
            </div>
            <div className='subTitle'>소중했던 순간을 남겨보세요 ✏️</div>
          </PromotionTitle>
          <PromotionImg>
            <img src={secondcarousel} alt='love music' />
          </PromotionImg>
        </ContentArea>
      </SecondSlide>
    </StyledSlider>
  );
}

export default Carousel;
