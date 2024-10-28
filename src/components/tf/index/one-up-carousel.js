// import React, {
//   useRef,
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   useMemo,
// } from "react";
// import styled, { createGlobalStyle, keyframes } from "styled-components";
// import Slider from "react-slick";
// import "../../slick/slick.css";
// import "../../slick/slick-theme.css";

// const Grid2 = styled.div`
//   display: grid;
//   top: 12.5px;
//   grid-template-columns: 1fr 1fr;
//   grid-column-gap: 10px;
//   margin-left: 10px;
//   grid-row-gap: 0;
//   width: calc(100% - 20px);
//   z-index: 20000;
// `;

// const CounterCon = styled.div`
//   grid-column: span 1;
//   margin-bottom: 5px;
// `;

// const NextButtonCon = styled.div`
//   grid-column: span 1;
//   p {
//     color: #cfcfcfcf;
//   }
// `;
// const SquareCarouselCon = styled.div`
//   grid-column: span 2;
// `;

// export const ProjectCarousel = ({
//   children,

//   projectLength,
//   videoLoad,
// }) => {
//   // SWIPE GESTURE
//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);
//   // the required distance between touchStart and touchEnd to be detected as a swipe
//   const minSwipeDistance = 50;
//   const onTouchStart = e => {
//     setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
//     setTouchStart(e.targetTouches[0].clientX);
//   };
//   const onTouchMove = e => setTouchEnd(e.targetTouches[0].clientX);
//   const onTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;
//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > minSwipeDistance;
//     const isRightSwipe = distance < -minSwipeDistance;
//     if (isLeftSwipe || isRightSwipe)
//       // console.log("swipe", isLeftSwipe ? "left" : "right");
//       // add your conditional logic here
//       ProjectCarouselRef.current.slickNext();
//   };

//   // COUNTER
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [totalSlides, setTotalSlides] = useState(null);
//   useEffect(() => {
//     setCurrentSlide(0);
//   }, []);
//   useEffect(() => {
//     setTotalSlides(projectLength);
//   }, []);
//   const updateCurrentSlide = index => {
//     if (currentSlide !== index) {
//       setCurrentSlide(index);
//     }
//   };

//   // SLIDER SETTINGS
//   const settings = {
//     infinite: true,
//     speed: 0,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     accessibility: true,
//     dots: false,
//     arrows: false,
//     swipe: false,
//     swipeToSlide: false,
//   };

//   // SLIDESHOW FUNCTION
//   const ProjectCarouselRef = React.useRef(null);

//   const [changedSlide, setChangedSlide] = useState(false);

//   function projectCarouselNextImg() {
//     ProjectCarouselRef.current.slickNext();
//     setChangedSlide(true);
//   }
//   return (
//     <>
//       <Grid2>
//         <CounterCon>
//           <p>{("0" + (currentSlide + 1)).slice(-2)}</p>
//         </CounterCon>
//         <NextButtonCon>
//           {projectLength > 1 ? (
//             <>
//               <p
//                 onClick={projectCarouselNextImg}
//                 style={{ display: "inline-block" }}
//               >
//                 Next
//               </p>
//               {/* <PVideoLoadingNext>&nbsp; (Video Loading)</PVideoLoadingNext> */}
//             </>
//           ) : (
//             ""
//           )}
//         </NextButtonCon>
//       </Grid2>
//       <Grid2>
//         <SquareCarouselCon
//           onClick={projectCarouselNextImg}
//           onTouchStart={onTouchStart}
//           onTouchMove={onTouchMove}
//           onTouchEnd={onTouchEnd}
//         >
//           <Slider
//             {...settings}
//             ref={ProjectCarouselRef}
//             afterChange={index => updateCurrentSlide(index)}
//           >
//             {React.Children.map(children, child =>
//               React.cloneElement(child, {
//                 changedSlide: changedSlide,
//               })
//             )}
//           </Slider>
//         </SquareCarouselCon>
//       </Grid2>
//     </>
//   );
// };
