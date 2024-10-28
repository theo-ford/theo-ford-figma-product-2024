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
const SwiperCarouselCon = styled.div`
  /* margin-left: 12.5px;
  width: calc(100%-12.5px); */

  position: relative;

  width: calc(100%);
  /* margin-left: 4px; */

  margin-top: 6px;
  margin-bottom: -10px;
  /* @media (max-width: 666px) {
    
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
  @media (max-width: 666px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: calc(100% - 20px);
    margin-left: 10px;
    top: 10px;
    grid-gap: 10px;
  }
`;
const CarouselHeaderCon = styled.div`
  width: 100%;
  background-color: red;
  /* height: 200px; */
  /* margin-top: -23px; */
  margin-top: -24px;
  position: absolute;
`;
const CarouselCounterCon = styled.div`
  grid-column: span 2;
`;
const breatheAnimation = keyframes`
  0% {opacity: 0.4} 
  50% {opacity: 1}
  100% {opacity: 0.4}
`;

const NextButtonCon = styled.div`
  grid-column: span 1;
`;
const NextButtonConP = styled.div`
  cursor: pointer;
  background-color: #c0baba;
  border-radius: 6px;
  opacity: 0.5;
  p {
    color: white;
    font-size: 12px;
    padding: 2px;
    padding-left: 4px;
  }
  animation-name: ${breatheAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`;
const NextButtonConPBlur = styled.div`
  /* position: absolute; */
  filter: blur(5px);
  cursor: pointer;
  background-color: #c0baba;
  border-radius: 6px;
  opacity: 0.5;
  margin-top: -16px;
  p {
    color: white;
    font-size: 12px;
    padding: 2px;
    padding-left: 4px;
  }
`;
const MoreButtonCon = styled.div`
  grid-column: span 1;
`;
const MoreButtonConP = styled.div`
  cursor: pointer;
  background-color: #c0baba;
  border-radius: 6px;
  opacity: 0.5;
  p {
    color: white;
    font-size: 12px;
    padding: 2px;
    padding-left: 4px;
  }
  /* animation-name: ${breatheAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite; */
`;
const MoreButtonConPBlur = styled.div`
  /* position: absolute; */
  filter: blur(5px);
  cursor: pointer;
  background-color: #c0baba;
  border-radius: 6px;
  opacity: 0.5;
  margin-top: -16px;
  p {
    color: white;
    font-size: 12px;
    padding: 2px;
    padding-left: 4px;
  }
`;

export const OneUpProjectCarouselSwiperOf1 = ({
  children,

  projectLength,
}) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [currentSlide1, setCurrentSlide1] = useState(null);
  const [swiper, setSwiper] = React.useState(null);
  // the required distance between touchStart and touchEnd to be detected as a swipe

  useEffect(() => {
    // initSwiper(index);
    if (swiper) {
      // console.log(swiper);
      setCurrentSlide1(swiper.realIndex + 1);
    }
  }, [swiper]);
  const updateCurrentSlide = index => {
    // console.log("testing 2234");
    // console.log(index);
    setCurrentSlide1(index.realIndex + 1);
  };
  const minSwipeDistance = 50;

  const onTouchStart = e => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = e => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe)
      if (isLeftSwipe) {
        // console.log("swipe", isLeftSwipe ? "left" : "right");
        // add your conditional logic here
        swiperRef.current.swiper.slideNext();
      } else if (isRightSwipe) {
        swiperRef.current.swiper.slidePrev();
      }
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
      <CarouselHeaderCon>
        <Grid16>
          <CarouselCounterCon>
            {/* <p>{("0" + currentSlide1).slice(-2)}</p> */}
            <p>
              {currentSlide1} of {projectLength}
            </p>
          </CarouselCounterCon>
          <NextButtonCon>
            <NextButtonConP>
              <p onClick={forwardFunc}>Next</p>
            </NextButtonConP>
            <NextButtonConPBlur>
              <p onClick={forwardFunc}>Next</p>
            </NextButtonConPBlur>
          </NextButtonCon>
          <MoreButtonCon>
            <MoreButtonConP>
              <p>More</p>
            </MoreButtonConP>
            <MoreButtonConPBlur>
              <p>More</p>
            </MoreButtonConPBlur>
          </MoreButtonCon>
        </Grid16>
      </CarouselHeaderCon>

      <SwiperCarouselCon
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <ButtonCon>
          <PrevButton onClick={prevFunc}></PrevButton>
          <NextButton onClick={forwardFunc}></NextButton>
        </ButtonCon>
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={1.5}
          loop={true}
          speed={1}
          onSlideChange={index => updateCurrentSlide(index)}
          // pagination={{
          //   clickable: true,
          // }}
          // navigation={{
          //   prevEl: ".swiper-slide-active",
          //   nextEl: ".swiper-slide-next",
          // }}
          onSwiper={s => {
            // console.log(s);
            setSwiper(s);
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {children}
        </Swiper>
      </SwiperCarouselCon>
    </>
  );
};
