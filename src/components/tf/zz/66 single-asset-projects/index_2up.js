// import React, {
//   useRef,
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   useMemo,
// } from "react";
// import ReactDOM, { findDOMNode } from "react-dom";
// import { graphql, Link, useScrollRestoration } from "gatsby";
// import styled, { createGlobalStyle, keyframes } from "styled-components";
// import { withPreview } from "gatsby-source-prismic";
// import { ImageOrientation } from "../components/utils/image-orientation";
// import { Helmet } from "react-helmet";
// import "../components/styles/index.css";
// import { useMediaQuery } from "../components/tf/media-query";
// // import Icon from "../../assets/White Logo No TF.svg";
// import Slider from "react-slick";
// import "../components/slick/slick.css";
// import "../components/slick/slick-theme.css";
// import { useOnScreen } from "../components/hooks/useOnScreen";
// import Icon from "../../assets/WhiteLogo.svg";
// import PauseButton from "../../public/icons/Pause.png";
// import PlayButton from "../../public/icons/Play.png";
// import TestVideo from "../../assets/G4C Web Desk 1500.mp4";
// import { AutoPlayVideo } from "../components/tf/autoplay-video";
// import { ImageOrientation2 } from "../components/utils/image-orientation2";
// import { PageLoad } from "../components/tf/page-load";
// import { Intro } from "../components/tf/index/intro";
// import { ProjectInfo } from "../components/tf/index/project-info";
// import { ProjectInfo2 } from "../components/tf/index/project-info2";
// import { ImgComponent } from "../components/tf/img-component";
// import { TwoUpProjectCarousel } from "../components/tf/index/two-up-carousel";
// import { ProjectCarousel } from "../components/tf/index/one-up-carousel";
// import { SingleAssetProject } from "../components/tf/index/single-asset-project1";
// import { FilmLeadCarousel2 } from "../components/tf/index/film-carousel";
// import { VideoWithControlsImg2 } from "../components/tf/index/video";
// import CarouselLengthContext from "../components/tf/index/length-context";
// import CarouselIndexClicked from "../components/tf/index/slick-functions-context.js";
// import { SingleAssetProject2 } from "../components/tf/index/single-asset-project2";
// import { ProjectInfo3 } from "../components/tf/index/project-info3";

// const GlobalStyle = createGlobalStyle`
//   html {
//     background-color: white;
//     overflow-x: clip;
//     max-width: 100vw;
//   }
//   body {
//     // https://stackoverflow.com/questions/47095596/body-overflow-x-hidden-breaks-position-sticky
//     background-color: white;
//     overflow-x: clip;
//     max-width: 100vw;
//     @media (min-width: 666px) {
//       position: fixed;
//     }
//   }
// `;

// /* - - - - - INTRO  - - - - -  */
// const IntroConCon = styled.div``;

// /* NAV */
// /* BOTH */
// const LogoGridCon = styled.div`
//   width: calc(100% - 25px);
//   margin-left: 12.5px;
//   position: sticky;
//   top: 12.5px;
//   z-index: 300000;
//   mix-blend-mode: exclusion;
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr;
//   grid-gap: 12.5px;

//   @media (max-width: 666px) {
//     width: calc(100% - 20px);
//     margin-left: 10px;
//     top: 10px;
//   }
// `;
// /* DESKTOP */
// const LogoConCon = styled.div`
//   grid-column: span 2;
//   mix-blend-mode: exclusion;
// `;
// const MenuCon = styled.div`
//   grid-column: 3 / span 2;
//   mix-blend-mode: exclusion;
// `;
// const LogoCon = styled.div`
//   mix-blend-mode: exclusion;
//   width: calc(100%);
//   vertical-align: top;
//   transition: all 2s;
//   vertical-align: top;
// `;
// const DesktopNavP = styled.p`
//   color: #878787;
//   mix-blend-mode: exclusion;
//   a.selected {
//     color: white;
//   }
//   @media (max-width: 666px) {
//     display: none;
//   }
// `;

// /* MOBILE */

// const MobileLeftCol = styled.div`
//   grid-column: span 2;
//   mix-blend-mode: exclusion;
// `;
// const MobileRightCol = styled.div`
//   grid-column: span 2;
//   mix-blend-mode: exclusion;
// `;
// const MobileNavP = styled.p`
//   display: none;
//   color: #878787;
//   mix-blend-mode: exclusion;
//   &.selected {
//     color: white;
//   }
//   @media (max-width: 666px) {
//     display: block;
//   }
// `;
// const LogoConMobile = styled.div`
//   display: none;
//   mix-blend-mode: exclusion;
//   @media (max-width: 666px) {
//     display: block;
//     width: calc(75% - 6.25px);
//     margin-top: 14vh;
//     margin-left: 10px;
//     .shrink {
//       width: calc(75% - 6.25px);
//     }
//   }
// `;

// const NavSpacer = styled.div`
//   height: 25vh;
//   width: 100%;
//   @media (max-width: 666px) {
//     display: none;
//   }
// `;

// /* - - - - - PAGE  - - - - - */
// const PageCon = styled.div`
//   margin-top: 30vh;
// `;

// const ProjectCon = styled.div`
//   margin-bottom: 100px;
//   /* 2up */
//   display: block;
//   position: relative;
//   float: left;
//   width: 100%;
//   /* 2up end */
//   @media (max-width: 666px) {
//     margin-bottom: 200px;
//   }
// `;

// const FilmProjectCon = styled.div`
//   margin-bottom: 100px;
//   /* 2up */
//   display: block;
//   position: relative;
//   float: left;
//   width: 100%;
//   /* 2up end */
//   @media (max-width: 666px) {
//     margin-bottom: 200px;
//   }
// `;
// const SingleImgProjectAssetCon = styled.div`
//   /* width: calc(50%); */
//   // width: calc(50% - 6.25px);
//   width: calc(50% - 12.5px);
//   width: calc(50% - 18.75px);
//   /* margin-left: 6.25px; */
//   margin-left: 12.5px;
//   display: inline-block;
//   float: left;
//   position: relative;
//   margin-bottom: 200px;
// `;

// /* - - - - - INDEX AUTOPLAT VIDEO FORMATTING - - - - - */
// /* - - perhaps in the autoplay video component you put a conditional saying if page index apply this  - - */
// const IndexAutoPlayVideoCon = styled.div`
//   position: relative;
//   width: calc(100% - 12.5px) !important;
//   @media (max-width: 666px) {
//     width: 100%;
//   }
// `;
// const ImgComponent2Con = styled.div`
//   width: 100%;
//   float: left;
//   display: block;
//   position: relative;
// `;

// const ImgComponent2 = styled.img`
//   width: 100%;
// `;

// const Index = ({ data }) => {
//   const [pageLoad, setPageLoad] = useState(null);
//   let isPageWide = useMediaQuery("(min-width: 667px)");
//   const LogoConRef2 = useRef(null);

//   // page load useEffect
//   // https://stackoverflow.com/questions/57729504/is-there-a-way-to-tell-when-your-react-app-page-is-done-loading-the-page-asset
//   useEffect(() => {
//     // callback function to call when event triggers
//     const onPageLoad = () => {
//       console.log("page loaded");
//       setPageLoad(true);
//       // do something else
//     };

//     // Check if the page has already loaded
//     if (document.readyState === "complete") {
//       onPageLoad();
//     } else {
//       window.addEventListener("load", onPageLoad, false);
//       // Remove the event listener when component unmounts
//       return () => window.removeEventListener("load", onPageLoad);
//     }
//   }, []);

//   const FourSeconds = setTimeout(overflowAllow, 4000);

//   function overflowAllow() {
//     document.body.style.position = "relative";
//   }

//   const NavIndexGridIndex = () => {
//     let isPageWide = useMediaQuery("(min-width: 667px)");
//     var [currentPage, setCurrentPage] = useState(null);
//     const LogoConRef = useRef(null);

//     const handleScroll = () => {
//       const position = window.pageYOffset;
//       // console.log(position);
//       if (position > 25) {
//         // console.log("greater than 100");
//         LogoConRef.current.classList.add("shrink");
//       } else if (position < 25) {
//         // console.log("less than 100");
//         LogoConRef.current.classList.remove("shrink");
//       }
//     };
//     // scroll use effect
//     useEffect(() => {
//       window.addEventListener("scroll", handleScroll, {
//         passive: true,
//       });

//       return () => {
//         window.removeEventListener("scroll", handleScroll);
//       };
//     }, []);

//     if (isPageWide) {
//       return (
//         <>
//           <LogoGridCon style={{ opacity: pageLoad ? 1 : 0 }}>
//             <LogoConCon>
//               <LogoCon ref={LogoConRef}>
//                 <Link to="/">
//                   <Icon />
//                 </Link>
//               </LogoCon>
//             </LogoConCon>
//             <MenuCon style={{ opacity: pageLoad ? 1 : 0 }}>
//               <DesktopNavP>
//                 <Link to="/" className="selected">
//                   Select,{" "}
//                 </Link>
//                 <Link to="/project_index">Index, </Link>
//                 <Link to="/office">Office</Link>
//                 {/* <br></br>Instagram, Twitter */}
//               </DesktopNavP>
//             </MenuCon>
//           </LogoGridCon>
//         </>
//       );
//     }
//     if (!isPageWide) {
//       return (
//         <>
//           <LogoGridCon>
//             <MobileLeftCol>
//               <Link to="/">
//                 <MobileNavP className="selected">Selected</MobileNavP>
//               </Link>
//               <Link to="/project_index">
//                 <MobileNavP>Index</MobileNavP>
//               </Link>
//             </MobileLeftCol>

//             <MobileRightCol>
//               <Link to="/office">
//                 <MobileNavP>Office</MobileNavP>
//               </Link>
//               <MobileNavP>Instagram</MobileNavP>
//             </MobileRightCol>
//           </LogoGridCon>
//           <LogoConMobile ref={LogoConRef}>
//             <Icon />
//           </LogoConMobile>
//         </>
//       );
//     }
//   };

//   const overview = data.prismicFeaturedProjects.data.project_relationship_group.map(
//     (content, index) => {
//       if (
//         content.project_relationship_field.document.type == "film_lead_project"
//       ) {
//         const filmLeadProject = content.project_relationship_field.document.data.body.map(
//           (content_three, index) => {
//             if (content_three.slice_type == "video_with_play_button") {
//               return (
//                 <VideoWithControlsImg2
//                   srcProps={content_three.primary.video_with_play_button.url}
//                   posterProps={
//                     content_three.primary.video_thumbnail.fluid.srcSetWebp
//                   }
//                   img={content_three.primary.video_thumbnail}
//                 ></VideoWithControlsImg2>
//               );
//             }
//           }
//         );
//         return (
//           <>
//             <FilmProjectCon>
//               <FilmLeadCarousel2>
//                 {React.Children.map(filmLeadProject, child =>
//                   React.cloneElement(child, {})
//                 )}
//               </FilmLeadCarousel2>
//               <ProjectInfo3
//                 projectType="films_carousel"
//                 data2={content.project_relationship_field.document.data}
//                 uid={content.project_relationship_field.document.uid}
//               ></ProjectInfo3>
//             </FilmProjectCon>
//           </>
//         );
//       }
//       if (content.project_relationship_field.document.type == "project") {
//         const projectLength =
//           content.project_relationship_field.document.data.body.length;
//         const project = content.project_relationship_field.document.data.body.map(
//           (content_four, index) => {
//             // console.log("CONSOLE");
//             // console.log(projectLength);
//             if (content_four.slice_type == "image") {
//               if (projectLength > 1) {
//                 return (
//                   <ImgComponent
//                     srcProps={content_four.primary.image.fluid.srcSetWebp}
//                   />
//                 );
//               } else if (projectLength <= 1) {
//                 return (
//                   <ImgComponent2Con>
//                     {" "}
//                     <ImgComponent2
//                       srcSet={content_four.primary.image.fluid.srcSetWebp}
//                     />
//                   </ImgComponent2Con>
//                 );
//               }
//             }
//             if (content_four.slice_type == "video") {
//               if (isPageWide && projectLength > 1) {
//                 return (
//                   <IndexAutoPlayVideoCon>
//                     <AutoPlayVideo
//                       srcProps={content_four.primary.video.url}
//                       posterProps={
//                         content_four.primary.index_image.fluid.srcSetWebp
//                       }
//                     />
//                   </IndexAutoPlayVideoCon>
//                 );
//               } else if (projectLength <= 1) {
//                 return (
//                   <AutoPlayVideo
//                     srcProps={content_four.primary.video.url}
//                     posterProps={
//                       content_four.primary.index_image.fluid.srcSetWebp
//                     }
//                   />
//                 );
//               } else if (!isPageWide) {
//                 return (
//                   <AutoPlayVideo
//                     srcProps={content_four.primary.sml_video.url}
//                     posterProps={
//                       content_four.primary.index_image.fluid.srcSetWebp
//                     }
//                   />
//                 );
//               }
//             }
//           }
//         );
//         if (isPageWide && projectLength > 1) {
//           return (
//             <ProjectCon>
//               <TwoUpProjectCarousel
//                 projectLength={
//                   content.project_relationship_field.document.data.body.length
//                 }
//               >
//                 {React.Children.map(project, child =>
//                   React.cloneElement(child, {
//                     changedSlide: false,
//                   })
//                 )}
//                 {/* {project} */}
//               </TwoUpProjectCarousel>
//               <ProjectInfo3
//                 projectType="two_up_carousel"
//                 data2={content.project_relationship_field.document.data}
//                 uid={content.project_relationship_field.document.uid}
//               ></ProjectInfo3>
//             </ProjectCon>
//           );
//         } else if (isPageWide && projectLength <= 1) {
//           return (
//             <>
//               <SingleImgProjectAssetCon>
//                 <SingleAssetProject2>{project}</SingleAssetProject2>
//                 <ProjectInfo3
//                   projectType="single_asset"
//                   data2={content.project_relationship_field.document.data}
//                   uid={content.project_relationship_field.document.uid}
//                 ></ProjectInfo3>
//               </SingleImgProjectAssetCon>
//             </>
//           );
//         } else if (isPageWide == false) {
//           return (
//             <ProjectCon>
//               <ProjectCarousel projectLength={projectLength}>
//                 {React.Children.map(project, child =>
//                   React.cloneElement(child, {
//                     changedSlide: false,
//                   })
//                 )}
//                 {/* {project} */}
//               </ProjectCarousel>
//               <ProjectInfo3
//                 projectType="one_up_carousel"
//                 data2={content.project_relationship_field.document.data}
//                 uid={content.project_relationship_field.document.uid}
//               ></ProjectInfo3>
//             </ProjectCon>
//           );
//         }
//       }
//     }
//   );

//   return (
//     <>
//       <GlobalStyle />
//       <Helmet>
//         <head></head>
//         <title>(10) Pagination 1</title>
//       </Helmet>
//       <IntroConCon style={{ opacity: pageLoad ? 1 : 0 }}>
//         <Intro></Intro>
//       </IntroConCon>

//       <NavSpacer></NavSpacer>
//       <NavIndexGridIndex></NavIndexGridIndex>

//       <PageCon style={{ opacity: pageLoad ? 1 : 0 }}>{overview}</PageCon>
//     </>
//   );
// };

// export default withPreview(Index);

// export const query = graphql`
//   query IndexQuery43 {
//     prismicFeaturedProjects {
//       data {
//         project_relationship_group {
//           project_relationship_field {
//             document {
//               ... on PrismicProject {
//                 id
//                 type
//                 uid
//                 data {
//                   project_title {
//                     html
//                     text
//                   }
//                   location {
//                     html
//                     text
//                   }
//                   year {
//                     html
//                     text
//                   }
//                   homepage_intro {
//                     text
//                   }
//                   client {
//                     text
//                   }
//                   body {
//                     ... on PrismicProjectBodyImage {
//                       id
//                       slice_type
//                       primary {
//                         image {
//                           fluid(
//                             srcSetBreakpoints: [1400, 1600, 2400, 3600]
//                             imgixParams: { auto: "" }
//                           ) {
//                             srcWebp
//                             srcSetWebp
//                           }
//                         }
//                       }
//                     }
//                     ... on PrismicProjectBodyVideo {
//                       id
//                       slice_type
//                       primary {
//                         video {
//                           url
//                         }
//                         sml_video {
//                           url
//                         }
//                         index_image {
//                           fluid(
//                             srcSetBreakpoints: [1400, 1600, 2400, 3600]
//                             imgixParams: { auto: "" }
//                           ) {
//                             src
//                             srcSetWebp
//                             srcWebp
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//               ... on PrismicFilmLeadProject {
//                 id
//                 type
//                 uid
//                 data {
//                   project_title {
//                     html
//                     text
//                   }
//                   location {
//                     html
//                     text
//                   }
//                   year {
//                     html
//                     text
//                   }
//                   client {
//                     html
//                     text
//                   }
//                   homepage_intro {
//                     text
//                   }
//                   body {
//                     ... on PrismicFilmLeadProjectBodyVideoWithPlayButton {
//                       id
//                       slice_type
//                       primary {
//                         video_with_play_button {
//                           url
//                         }
//                         video_thumbnail {
//                           fluid {
//                             src
//                             srcSetWebp
//                             srcWebp
//                           }
//                           dimensions {
//                             height
//                             width
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
