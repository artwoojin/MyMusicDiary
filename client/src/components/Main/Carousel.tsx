import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import firstCarousel from "../../assets/images/firstCarousel.png";
import secondCarousel from "../../assets/images/secondCarousel.png";

const StyledSlider = styled(Slider)`
  height: 325px;

  @media screen and (max-width: 525px) {
    height: 245px;
  }
`;

const FirstSlide = styled.div`
  background-color: #ffedd3;
  height: 310px;
  padding: 0 15px 0 15px;

  @media screen and (max-width: 525px) {
    height: 230px;
  }
`;

const SecondSlide = styled.div`
  background-color: #ecf2ff;

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
    max-width: 500px;
    font-size: 31px;
    font-weight: 800;
    margin-bottom: 10px;
    word-break: keep-all;

    @media screen and (max-width: 1084px) {
      font-size: 28px;
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
            <div className='mainTitle'>
              평범한 플레이리스트가 아닌 추억이 담긴 나만의 음악 다이어리
            </div>
            <div className='subTitle'>소중했던 순간을 남겨보세요 ✏️</div>
          </PromotionTitle>
          <PromotionImg>
            <img src={firstCarousel} alt='listen music' />
          </PromotionImg>
        </ContentArea>
      </FirstSlide>
      <SecondSlide>
        <ContentArea>
          <PromotionTitle>
            <div className='mainTitle'>다른 사람들은 어떤 음악을 좋아할까?</div>
            <div className='subTitle'>이제 마리플에서 같이 들어요 🎵</div>
          </PromotionTitle>
          <PromotionImg>
            <img src={secondCarousel} alt='love music' />
          </PromotionImg>
        </ContentArea>
      </SecondSlide>
    </StyledSlider>
  );
}

export default Carousel;
