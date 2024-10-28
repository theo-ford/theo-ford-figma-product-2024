// import React, {
//   useRef,
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   useMemo,
// } from "react";
// import styled, { createGlobalStyle, keyframes } from "styled-components";
// // import Slider from "react-slick";
// // import "../../../slick/slick.css";
// // import "../../../slick/slick-theme.css";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";

// const Grid16 = styled.div`
//   display: grid;
//   top: 12.5px;
//   grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
//   grid-column-gap: 12.5px;
//   margin-left: 12.5px;
//   grid-row-gap: 0;
//   width: calc(100% - 25px);
//   z-index: 20000;
// `;
// const TwoUpCarouselCounterNextCon = styled.div`
//   margin-bottom: 8px;
// `;
// const TwoUpCarouselCon = styled.div`
//   margin-left: 12.5px;
//   // cursor: e-resize;
//   // background-color: green;
// `;
// const TwoUpCarouselCounterOneCon = styled.div`
//   grid-column: span 8;
// `;
// const TwoUpCarouselCounterTwoCon = styled.div`
//   grid-column: span 6;
// `;
// const TwoUpCarouselNextButtonCon = styled.div`
//   grid-column: span 2;
//   p {
//     color: #878787;
//   }
// `;

// const CarouselButtonCon = styled.div`
//   width: 100%;
//   height: 100%;
//   // position: absolute;
//   // cursor: w-resize;

//   // background-color: red;
//   z-index: 1000;
// `;
// const CarouselCon = styled.div`
//   z-index: 0;
//   // position: absolute;
// `;
// const ForwardButton = styled.div`
//   width: 50%;
//   height: 100%;
//   cursor: e-resize;
//   float: right;
//   // background-color: blue;
// `;
// const BackButton = styled.div`
//   width: 50%;
//   height: 100%;
//   cursor: e-resize;
//   float: left;
//   // background-color: orange;
//   // position: absolute
// `;

// export const TwoUpProjectCarouselSlickDefault = ({
//   children,

//   projectLength,
// }) => {
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
//     // speed: 200,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     accessibility: true,
//     dots: false,
//     arrows: false,
//     swipe: false,
//     swipeToSlide: false,
//     adaptiveHeight: false,
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
//       <TwoUpCarouselCounterNextCon>
//         <Grid16>
//           <TwoUpCarouselCounterOneCon>
//             {/* <p>{("0" + (currentSlide + 1)).slice(-2)}</p> */}
//             <p>{("0" + (currentSlide + 1)).slice(-2)}</p>
//           </TwoUpCarouselCounterOneCon>
//           <TwoUpCarouselCounterTwoCon>
//             {/* <p>{("0" + (currentSlide + 1)).slice(-2)}</p> */}
//             <p>{("0" + (currentSlide + 2)).slice(-2)}</p>
//           </TwoUpCarouselCounterTwoCon>
//           <TwoUpCarouselNextButtonCon>
//             {projectLength > 1 ? (
//               <>
//                 <p
//                   onClick={projectCarouselNextImg}
//                   style={{ display: "inline-block" }}
//                 >
//                   Next
//                 </p>
//                 {/* <PVideoLoadingNext>&nbsp; (Video Loading)</PVideoLoadingNext> */}
//               </>
//             ) : (
//               ""
//             )}
//           </TwoUpCarouselNextButtonCon>
//         </Grid16>
//       </TwoUpCarouselCounterNextCon>

//       <TwoUpCarouselCon>
//         <CarouselButtonCon>
//           <CarouselCon onClick={projectCarouselNextImg}>
//             <Slider
//               {...settings}
//               ref={ProjectCarouselRef}
//               afterChange={index => updateCurrentSlide(index)}
//             >
//               {React.Children.map(children, child =>
//                 React.cloneElement(child, {
//                   changedSlide: changedSlide,
//                 })
//               )}
//             </Slider>
//             <BackButton></BackButton>
//             <ForwardButton></ForwardButton>
//           </CarouselCon>
//         </CarouselButtonCon>
//       </TwoUpCarouselCon>
//     </>
//   );
// };
