import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import SwiperIndexContext from "./swiper-index-context";

const SwiperCarouselCon = styled.div`
  margin-left: 12.5px;
  width: calc(100%-12.5px);
  /* background-color: red; */
  position: relative;
  /* cursor: e-resize; */
  /* .swiper-slide-active {
    cursor: w-resize;
  }
  .swiper-slide-next {
    cursor: e-resize;
  } */
`;
const ButtonCon = styled.div`
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* background-color: blue; */
  position: absolute;
  z-index: 200;
`;
const PrevButton = styled.div`
  width: 50%;
  height: 100%;
  /* background-color: orange; */
  float: left;
  cursor: w-resize;
`;
const NextButton = styled.div`
  width: 50%;
  height: 100%;
  /* background-color: pink; */
  float: right;
  cursor: e-resize;
`;

const Grid16 = styled.div`
  display: grid;
  /* top: 12.5px; */
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 12.5px;
  margin-left: 12.5px;
  grid-row-gap: 0;
  width: calc(100% - 25px);
  z-index: 20000;
  position: absolute;
`;
const CarouselHeader = styled.div`
  /* background-color: red; */
  position: absolute;
  width: 100%;
  height: 20px;
  margin-top: -23px;
`;

const TwoUpCarouselCounterOneCon = styled.div`
  grid-column: span 8;
`;
const TwoUpCarouselCounterTwoCon = styled.div`
  grid-column: span 6;
`;
const breatheAnimation = keyframes`
  0% {opacity: 0.4} 
  50% {opacity: 1}
  100% {opacity: 0.4}
`;
const NextButtonConP = styled.div`
  grid-column: span 2;
  cursor: pointer;
  p {
    color: #878787;
    /* color: #ff0000; */
  }
  animation-name: ${breatheAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`;

export const TwoUpProjectCarouselSwiperOf1 = ({
  children,

  projectLength,
}) => {
  const [currentSlide1, setCurrentSlide1] = useState(null);
  const [currentSlide2, setCurrentSlide2] = useState(null);
  const [swiper, setSwiper] = React.useState(null);
  const [currentSlide3, setCurrentSlide3] = useState();
  const carouselIndex = useContext(SwiperIndexContext);
  console.log("HELLO");
  console.log(carouselIndex);

  useEffect(() => {
    // initSwiper(index);
    if (swiper) {
      // console.log(swiper);
      setCurrentSlide1(swiper.realIndex + 1);
      setCurrentSlide2(swiper.realIndex + 2);
      setCurrentSlide3(swiper.snapIndex);
    }
  }, [swiper]);

  const updateCurrentSlide = index => {
    // console.log("testing 2234");
    // console.log(index);
    setCurrentSlide1(index.realIndex + 1);
    setCurrentSlide2(index.realIndex + 2);
    setCurrentSlide3(index.snapIndex);
  };

  const initSwiper = index => {
    // console.log("init swiper");
    setCurrentSlide1(index.previousRealIndex);
    setCurrentSlide2(index.realIndex);
  };

  const swiperRef = useRef(null);
  function forwardFunc() {
    swiperRef.current.swiper.slideNext();
  }
  function prevFunc() {
    swiperRef.current.swiper.slidePrev();
  }
  return (
    <>
      <CarouselHeader>
        <Grid16>
          <TwoUpCarouselCounterOneCon>
            {/* <p>{("0" + (currentSlide + 1)).slice(-2)}</p> */}
            {/* <p>{("0" + (currentSlide1 + 1)).slice(-2)}</p> */}
            {/* <p>{("0" + currentSlide1).slice(-2)}</p> */}
            <p>
              {currentSlide1} of {projectLength + 1}
            </p>
          </TwoUpCarouselCounterOneCon>
          <TwoUpCarouselCounterTwoCon>
            {/* <p>{("0" + (currentSlide + 1)).slice(-2)}</p> */}
            {/* <p>{("0" + (currentSlide2 + 2)).slice(-2)}</p> */}
            {/* <p>{("0" + currentSlide2).slice(-2)}</p> */}
            <p>
              {/* {currentSlide3} of {projectLength} */}
              {currentSlide2} of {projectLength + 1}
            </p>
          </TwoUpCarouselCounterTwoCon>
          <NextButtonConP>
            <p onClick={forwardFunc}>Next</p>
          </NextButtonConP>
        </Grid16>
      </CarouselHeader>

      <SwiperCarouselCon>
        <ButtonCon>
          <PrevButton onClick={prevFunc}></PrevButton>
          <NextButton onClick={forwardFunc}></NextButton>
        </ButtonCon>
        <Swiper
          ref={swiperRef}
          slidesPerView={2}
          slidesPerGroup={1}
          spaceBetween={1.5}
          loop={true}
          onSlideChange={index => updateCurrentSlide(index)}
          // pagination={{
          //   clickable: true,
          // }}
          // navigation={{
          //   prevEl: ".swiper-slide-active",
          //   nextEl: ".swiper-slide-next",
          // }}
          modules={[Navigation]}
          className="mySwiper"
          onSwiper={s => {
            // console.log(s);
            setSwiper(s);
          }}
        >
          {children}
        </Swiper>
      </SwiperCarouselCon>
    </>
  );
};
