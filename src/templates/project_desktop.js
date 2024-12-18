import React, {
  useEffect,
  useState,
  useRe,
  useContext,
  createContext,
} from "react";
import { graphql, Link, navigate, useMemo } from "gatsby";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { Helmet } from "react-helmet";
import { ImageOrientation } from "../components/utils/image-orientation";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import { useMediaQuery } from "../components/tf/media-query";
import Icon from "../../assets/WhiteLogo.svg";
import { AutoPlayVideo } from "../components/tf/autoplay-video";
import { AutoPlayVideoFullBleed } from "../components/tf/autoplay-video-full-bleed";
import { NavGrid } from "../components/tf/nav-grid/nav";
import { PageLoad } from "../components/tf/page-load";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { VideoProjectPage } from "../components/tf/project/video-project-page";
import Logo from "../../assets/WhiteLogo.svg";
import { AutoPlayVideoOriginalAuto } from "../components/tf/autoplay-video-OriginalAuto";
import TheoFord from "../../assets/TheoFord.svg";
import PrevPathContext from "../components/tf/prev-path-context";
import { NextProject2 } from "../components/tf/next-project";
import "../components/styles/index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { OneUpProjectCarouselSwiperOf1ProjectDesktop } from "../components/tf/index/one-up-carousel/one-up-carousel-swiper-of-1-project-desktop";

const blackToWhite = keyframes`
  0% {
    background-color: black;
;  }
  100% {
    background-color: white;
  }
`;

const GlobalStyle = createGlobalStyle`
  p {
    letter-spacing: -0.2px;
    margin-bottom: 16px;
  }
  body {
    width: calc(100vw);
    overflow-x: hidden;

    /* animation-name: ${blackToWhite};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-iteration-count: 1; */

    animation: ${props =>
      props.animateLogo &&
      css`
        ${blackToWhite} 2s ease 1 forwards
      `};
  }
  
`;

const logoScaleDown = keyframes`
   0% {
    padding-top: 0px;
    width: calc(24vw - 6.5px);
  }
  50% {
    padding-top: 0px;
    width: calc(24vw - 6.5px);
  }
  100% {
    padding-top: 3px;
    /* padding-top: -50px; */
    width: calc(68px);
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeInKeyFramesSlow = keyframes`
  0% {
    opacity: 0
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeInKeyFramesQuick = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1;
  }
`;

const fadeInQuickAnimation = css`
  animation: 4s ease ${fadeInKeyFramesQuick} 1 forwards;
`;

const fadeInSlowAnimation = css`
  animation: 8s ease ${fadeInKeyFramesSlow} 1 forwards;
`;

const LogoTitleCon = styled.div`
  position: sticky;
  top: 12.5px;
  z-index: 300000;
  width: calc(100% - 25px);
  margin-left: 12.5px;
  mix-blend-mode: exclusion;
  p {
    display: inline-block;
    float: left;
    position: relative;
    color: white;
  }
  svg.theo_ford {
    /* width: calc(24vw - 6.5px); */
    width: ${props => {
      const test = props.animateLogo;
      if (test) {
        return "calc(24vw - 6.5px)";
      } else {
        return "calc(68px)";
      }
    }};

    padding-top: ${props => {
      const test = props.animateLogo;
      if (test) {
        return "0px";
      } else {
        return "3px";
      }
    }};

    height: auto;
    display: inline-block;
    float: left;

    animation: ${props =>
      props.animateLogo &&
      css`
        ${logoScaleDown} 3s ease 1 forwards
      `};

    /* animation-name: ${logoScaleDown};
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-iteration-count: 1; */
  }
  .sentence {
    padding-left: 3px;
    padding-top: -10px;
    display: inline-block;
    float: left;

    ${props => (props.animateLogo ? fadeInSlowAnimation : fadeInQuickAnimation)}
  }
  @media (max-width: 666px) {
    display: none;
  }
`;
const MenuCon = styled.div`
  mix-blend-mode: exclusion;
  z-index: 300000;
  margin-left: calc(50% + 6.5px);
  position: sticky;
  top: 12.5px;
  width: 30%;

  /* animation-name: ${fadeIn};
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-iteration-count: 1; */

  ${props => (props.animateLogo ? fadeInSlowAnimation : fadeInQuickAnimation)}

  @media (max-width: 1024px) {
    margin-left: calc(50vw + 7px);
  }
  @media (max-width: 666px) {
    margin-left: 10px;
    width: 100%;
    top: 10px;
    width: calc(100vw - 20px);
  }
`;

const DesktopNavP = styled.p`
  color: #878787;
  mix-blend-mode: exclusion;
`;
const PaginationCon = styled.div`
  mix-blend-mode: exclusion;
  z-index: 300000;
  margin-right: calc(12.5px);
  float: right;
  position: sticky;
  top: 12.5px;
  margin-top: -4px;

  /* animation-name: ${fadeIn};
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-iteration-count: 1; */

  ${props => (props.animateLogo ? fadeInSlowAnimation : fadeInQuickAnimation)}
  p {
    color: white;
  }
`;

const PageCon = styled.div`
 /* animation-name: ${fadeIn};
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-iteration-count: 1; */

  ${props => (props.animateLogo ? fadeInSlowAnimation : fadeInQuickAnimation)}
`;

const IntroCon = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 1 */ 1fr 1fr 1fr 1fr /* 2 */ 1fr 1fr 1fr 1fr /* 3 */ 1fr 1fr 1fr 1fr /* 4 */;
  grid-gap: 12.5px;
  width: calc(100% - 25px);
  margin-left: 12.5px;
  align-items: center;
  height: 70vh;
  @media (max-width: 666px) {
    width: calc(100% - 20px);
    margin-left: 10px;
  }
`;

const IntroTextCon = styled.div`
  grid-column: span 8;
  p {
    font-size: 24px;
  }
  @media (max-width: 666px) {
    grid-column: span 16;
    p {
      width: calc(100%);
      margin-left: 0px;
      font-size: 16px;
    }
  }
`;
const CategoryName = styled.span`
  text-transform: capitalize;
`;
const MetaCon = styled.div`
  height: auto;
  width: calc(100% - 25px);
  margin-left: 12.5px;
  margin-bottom: 10px;
  @media (max-width: 666px) {
    p,
    span {
      font-size: 12px;
      margin-bottom: 0px;
    }
  }
`;
const Grid16 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 1 */ 1fr 1fr 1fr 1fr /* 2 */ 1fr 1fr 1fr 1fr /* 3 */ 1fr 1fr 1fr 1fr /* 4 */;
  grid-gap: 12.5px;
  width: calc(100% - 25px);
  margin-left: 12.5px;

  @media (max-width: 666px) {
    grid-template-columns: 1fr 1fr 1fr 1fr /* 1 */ 1fr 1fr 1fr 1fr /* 2 */ 1fr 1fr 1fr 1fr /* 3 */ 1fr 1fr 1fr 1fr /* 4 */;
    grid-gap: 10px;
    width: calc(100% - 20px);
    margin-left: 10px;
  }
`;
const BodyTextCon = styled.div`
  grid-column: span 16;

  p {
    width: calc(50% - 6.25px);
    margin-left: calc(50% + 6.25px);
    font-size: 24px;
  }
  margin-top: ${props => {
    const test = props.RowMarginTop;
    if (test === "120px") {
      return "120px";
    } else {
      return "0px";
    }
  }};

  @media (max-width: 666px) {
    p {
      width: calc(100%);
      margin-left: 0px;
      font-size: 16px;
    }
  }
  @media (max-width: 666px) {
    margin-top: 0;
    margin-bottom: 120px;
  }
`;

const FullBleedImgCon = styled.div`
  grid-column: span 16;
  width: calc(100% + 25px);
  margin-left: -12.5px;
  margin-top: ${props => {
    const test = props.RowMarginTop;
    if (test === "120px") {
      return "180px";
    } else {
      return "0px";
    }
  }};

  margin-bottom: ${props => {
    const test = props.RowMarginTop;
    if (test === "120px") {
      return "120px";
    } else {
      return "0px";
    }
  }};
  @media (max-width: 666px) {
    margin-top: 0;
    margin-bottom: 120px;
  }
`;
const FullBleedImgConCon = styled.div`
  width: ${props => {
    const columnWidth = props.columnWidth;
    if (columnWidth === "16") {
      return "100%";
    } else if (columnWidth === "8") {
      return "calc(50% - 6.5px)";
    }
  }};

  margin-left: ${props => {
    const columnStart = props.columnStart;
    if (columnStart === "0") {
      return "0%";
    } else if (columnStart === "8") {
      return "calc(50% + 6.5px)";
    }
  }};
`;
const SquareImgCon = styled.div`
  margin-top: ${props => {
    const rowMarginTop = props.RowMarginTop;
    const imgMarginTop = props.ImgMarginTop;
    if (rowMarginTop === "120px" && imgMarginTop === "0vw") {
      return "120px";
    } else if (rowMarginTop === "120px" && imgMarginTop === "12.5vw") {
      return "calc(12.5vw + 120px)";
    } else if (rowMarginTop === "120px" && imgMarginTop === "25vw") {
      return "calc(25vw + 120px)";
    } else if (rowMarginTop === "0px" && imgMarginTop === "12.5vw") {
      return "calc(12.5vw)";
    } else if (rowMarginTop === "0px" && imgMarginTop === "25vw") {
      return "calc(25vw)";
    }
  }};

  grid-column: ${props => {
    const columnWidth = props.columnWidth;
    const columnStart = props.columnStart;
    if (columnWidth === "8" && columnStart === "0") {
      return "1 / span 8";
    } else if (columnWidth === "8" && columnStart === "4") {
      return "5 / span 8";
    } else if (columnWidth === "8" && columnStart === "8") {
      return "9 / span 8";
    } else if (columnWidth === "4" && columnStart === "0") {
      return "1 / span 4";
    } else if (columnWidth === "4" && columnStart === "4") {
      return "5 / span 4";
    } else if (columnWidth === "4" && columnStart === "8") {
      return "9 / span 4";
    } else if (columnWidth === "4" && columnStart === "12") {
      return "13 / span 4";
    }
  }};

  @media (max-width: 666px) {
    grid-column: span 16;
    margin-top: 0;
    margin-bottom: 120px;
  }
`;

const Caption = styled.div`
  width: 100%;
  margin-top: 6px;
  p {
    max-width: 50vw;
    font-size: ${props => {
      const captionFontSize = props.CaptionFontSize;
      if (captionFontSize === "16px") {
        return "16px";
      } else if (captionFontSize === "12px") {
        return "12px";
      }
    }};
    margin-top: ${props => {
      const captionFontSize = props.CaptionFontSize;
      if (captionFontSize === "16px") {
        return "6px";
      } else if (captionFontSize === "12px") {
        return "8px";
      }
    }};
  }
  @media (max-width: 666px) {
    p {
      max-width: 100%;
      font-size: 12px;
    }
  }
`;

const BlackFilmsModuleCon = styled.div`
  grid-column: span 16;
  width: calc(100% + 25px);
  margin-left: -12.5px;
  background-color: black;
  height: 110vh;

  margin-top: ${props => {
    const test = props.RowMarginTop;
    if (test === "120px") {
      return "120px";
    } else {
      return "0px";
    }
  }};
  @media (min-width: 666px) {
    height: ${props => {
      const fullBleed = props.fullBleed;

      if (fullBleed == true) {
        return "inherit !important";
      }
    }};
    background-color: ${props => {
      const fullBleed = props.fullBleed;

      if (fullBleed == true) {
        return "white";
      }
    }};
  }
  @media (max-width: 666px) {
    margin-top: 0;
    margin-bottom: 120px;
  }
`;
const BlackFilmsModuleConCon = styled.div`
  width: ${props => {
    const columnWidth = props.columnWidth;
    if (columnWidth === "16") {
      return "100%";
    } else if (columnWidth === "8") {
      return "calc(50% - 6.5px)";
    }
  }};

  margin-left: ${props => {
    const columnStart = props.columnStart;
    if (columnStart === "0") {
      return "0%";
    } else if (columnStart === "8") {
      return "calc(50% + 6.5px)";
    }
  }};
`;

const MoreProjects = styled.div`
  grid-template-columns: 1fr 1fr 1fr 1fr /* 1 */ 1fr 1fr 1fr 1fr /* 2 */ 1fr 1fr 1fr 1fr /* 3 */ 1fr 1fr 1fr 1fr /* 4 */;
  grid-gap: 12.5px;
  width: calc(100% - 25px);
  display: grid;
  margin-top: 120px;
  margin-left: 12.5px;
  margin-bottom: 120px;

  div {
    grid-column: span 4;
  }

  @media (max-width: 1024px) {
    div {
      grid-column: span 8;
    }
  }

  @media (max-width: 666px) {
    div {
      grid-column: span 16;
    }
  }

  img {
    width: 100%;
  }
  p.header {
    padding-bottom: 6px;
    font-size: 24px;
  }
  p.project_title {
    opacity: 50%;
    padding-top: 6px;
    padding-bottom: 12.5px;
  }
`;

const ResumeImage = styled.div`
  width: 100%;
  height: 418px;
  margin-top: 32px;
  background-color: black;
`;
const MobileProjectTitleYearLocation = styled.div`
  margin-bottom: 100px;
  display: none;
  @media (max-width: 666px) {
    display: block;
  }
`;
const CarouselCon = styled.div`
  margin-top: 50px;
`;

const ProjectDesktop = ({ data, location, props }) => {
  let isPageWide = useMediaQuery("(min-width: 667px)");
  const [animateLogo, setAnimateLogo] = useState(false);
  const [leavePage, setLeavePage] = useState(false);
  const { currentPath, setCurrentPath } = useContext(PrevPathContext);

  console.log(currentPath);

  // const { prevPathContextVal } = useContext(prevPathContext);

  // ANIMATE LOGO BASED ON STATE OF PREVIOUS URL
  useEffect(() => {
    // console.log(prevPath);
    if (currentPath === "/") {
      setAnimateLogo(true);
    }
  }, [setAnimateLogo]);

  // console.log("CURRENT PATH STATE" + currentPath);
  // console.log("CONTEXT" + prevPathContextVal);

  // console.log(window.history);

  const projects = data.prismicProjectIndexSelect.data.project_relationship_group.map(
    project => project.project_relationship_field.document.uid
  );

  // Next Project link
  // where in the array the current projects sits. finds uid in that array and tells you what number that is in the list.
  const currentProjectPageNumber = projects.indexOf(
    data.prismicProjectDesktop.uid
  );

  const nextProjectUid =
    // if the current page + 1 is less than total projects
    currentProjectPageNumber + 1 < projects.length
      ? // looks in the projects array for current project number + 1
        projects[currentProjectPageNumber + 1]
      : projects[0];

  // filter for next project uid in all the projects
  // but this is the things that allows you to pull content from that project
  // returns all the data that matches the uid for the next project
  const nextProjectContent = data.prismicProjectIndexSelect.data.project_relationship_group.filter(
    project =>
      project.project_relationship_field.document.uid === nextProjectUid
  );

  var y = undefined;
  if (currentProjectPageNumber === projects.length - 1) {
    y = true;
  } else {
    y = false;
  }

  const Resume = () => {
    return (
      <div>
        <Link to="/resume">
          <ResumeImage />
        </Link>
        <p className="project_title">View Resume</p>
      </div>
    );
  };
  const projectBody = data.prismicProjectDesktop.data.body2.map(
    (content, index) => {
      if (content.slice_type == "full_bleed_image") {
        const image = getImage(content.primary.image1);
        const mobileImage = getImage(content.primary.mobile_image);
        if (isPageWide) {
          return (
            <>
              <FullBleedImgCon RowMarginTop={content.primary.row_margin_top}>
                <FullBleedImgConCon
                  columnStart={content.primary.column_start}
                  columnWidth={content.primary.column_width}
                >
                  <GatsbyImage image={image} />
                  <Caption
                    style={{ marginLeft: "12.5px" }}
                    CaptionFontSize={content.primary.caption_font_size}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content.primary.caption.html,
                      }}
                    />
                  </Caption>
                </FullBleedImgConCon>
              </FullBleedImgCon>
            </>
          );
        } else {
          return (
            <SquareImgCon
              RowMarginTop={content.primary.row_margin_top}
              ImgMarginTop={content.primary.margin_top}
            >
              <GatsbyImage image={mobileImage} />
              <Caption CaptionFontSize={content.primary.caption_font_size}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: content.primary.caption.html,
                  }}
                />
              </Caption>
            </SquareImgCon>
          );
        }
      }
      if (content.slice_type == "image") {
        const image = getImage(content.primary.image);
        return (
          <>
            <SquareImgCon
              columnStart={content.primary.column_start}
              columnWidth={content.primary.column_width}
              RowMarginTop={content.primary.row_margin_top}
              ImgMarginTop={content.primary.margin_top}
            >
              <GatsbyImage image={image} />
              <Caption CaptionFontSize={content.primary.caption_font_size}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: content.primary.caption.html,
                  }}
                />
              </Caption>
            </SquareImgCon>
          </>
        );
      }

      if (content.slice_type == "text") {
        return (
          <BodyTextCon RowMarginTop={content.primary.row_margin_top}>
            <div
              dangerouslySetInnerHTML={{
                __html: content.primary.text.html,
              }}
            />
          </BodyTextCon>
        );
      }
      if (content.slice_type == "video") {
        if (isPageWide) {
          const posterImgProps = content.primary.index_image;
          return (
            <SquareImgCon
              columnStart={content.primary.column_start}
              columnWidth={content.primary.column_width}
              RowMarginTop={content.primary.row_margin_top}
              ImgMarginTop={content.primary.margin_top}
            >
              <AutoPlayVideo
                srcProps={content.primary.video.url}
                posterProps={posterImgProps}
              />
              <Caption CaptionFontSize={content.primary.caption_size}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: content.primary.caption.html,
                  }}
                />
              </Caption>
            </SquareImgCon>
          );
        } else {
          const posterImgProps = content.primary.index_image;
          return (
            <SquareImgCon
              columnStart={content.primary.column_start}
              columnWidth={content.primary.column_width}
              RowMarginTop={content.primary.row_margin_top}
              ImgMarginTop={content.primary.margin_top}
            >
              <AutoPlayVideo
                srcProps={content.primary.sml_video.url}
                posterProps={posterImgProps}
              />
              <Caption CaptionFontSize={content.primary.caption_font_size}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: content.primary.caption.html,
                  }}
                />
              </Caption>
            </SquareImgCon>
          );
        }
      }
      if (content.slice_type == "carousel") {
        // const image = getImage(content.primary.image);
        console.log("Carousel");
        const carouselLength = content.items.length;
        console.log(carouselLength);
        const x = content.items.map(index => {
          // console.log(image);
          //  const image = getImage(index.image);
          const image = getImage(index.image);

          return (
            <SwiperSlide>
              <GatsbyImage image={image} />
            </SwiperSlide>
          );
        });
        return (
          <>
            <SquareImgCon
              columnStart={content.primary.column_start}
              columnWidth={content.primary.column_width}
              RowMarginTop={content.primary.row_margin_top}
              ImgMarginTop={content.primary.margin_top}
            >
              <CarouselCon>
                <OneUpProjectCarouselSwiperOf1ProjectDesktop
                  projectLength={carouselLength}
                  captionFontSize={content.primary.caption_font_size}
                  caption={content.primary.caption}
                >
                  {x}
                </OneUpProjectCarouselSwiperOf1ProjectDesktop>
              </CarouselCon>
            </SquareImgCon>
          </>
        );
      }
      if (content.slice_type == "full_bleed_video") {
        const posterImgProps = content.primary.poster_image;
        if (isPageWide) {
          return (
            <>
              <FullBleedImgCon RowMarginTop={content.primary.row_margin_top}>
                <FullBleedImgConCon
                  columnStart={content.primary.column_start}
                  columnWidth={content.primary.column_width}
                >
                  <AutoPlayVideoFullBleed
                    srcProps={content.primary.video.url}
                    posterProps={posterImgProps}
                  />
                  <Caption
                    style={{ marginLeft: "12.5px" }}
                    CaptionFontSize={content.primary.caption_font_size}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content.primary.caption.html,
                      }}
                    />
                  </Caption>
                </FullBleedImgConCon>
              </FullBleedImgCon>
            </>
          );
        } else {
          const posterImgProps = content.primary.mobile_poster;
          return (
            <SquareImgCon
              columnStart={content.primary.column_start}
              columnWidth={content.primary.column_width}
              RowMarginTop={content.primary.row_margin_top}
              ImgMarginTop={content.primary.margin_top}
            >
              <AutoPlayVideo
                srcProps={content.primary.small_video.url}
                posterProps={posterImgProps}
              />
              <Caption CaptionFontSize={content.primary.caption_font_size}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: content.primary.caption.html,
                  }}
                />
              </Caption>
            </SquareImgCon>
          );
        }
      }

      if (content.slice_type == "black_films_module") {
        const posterImage = content.primary.poster_image;

        return (
          <>
            <BlackFilmsModuleCon
              RowMarginTop={content.primary.row_margin_top}
              fullBleed={content.primary.full_bleed}
            >
              <BlackFilmsModuleConCon
                columnStart={content.primary.column_start}
                columnWidth={content.primary.column_width}
              >
                <AutoPlayVideoOriginalAuto
                  srcProps={content.primary.video.url}
                  posterProps={posterImage}
                  img={posterImage}
                  fullBleed={content.primary.full_bleed}
                />
                <Caption
                  style={{ marginLeft: "12.5px" }}
                  CaptionFontSize={content.primary.caption_font_size}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content.primary.caption.html,
                    }}
                  />
                </Caption>
              </BlackFilmsModuleConCon>
            </BlackFilmsModuleCon>
          </>
        );
      }
    }
  );

  return (
    <>
      <GlobalStyle animateLogo={animateLogo} />
      <Helmet>
        <title>
          Theo Ford – {data.prismicProjectDesktop.data.project_title.text}
        </title>
        <meta name="project page" content="project page"></meta>
      </Helmet>
      {/* <prevPathContext.Provider value={{ currentPath, setCurrentPath }}> */}
      <LogoTitleCon animateLogo={animateLogo}>
        {/* <LogoTitleCon> */}
        <p>
          {" "}
          {/* <span style={{ fontWeight: "bold" }}>Theo Ford</span> */}
          <TheoFord className="theo_ford" />
          <span className="sentence">
            &nbsp;for {data.prismicProjectDesktop.data.project_title.text} in{" "}
            {data.prismicProjectDesktop.data.location.text}.{" "}
            {data.prismicProjectDesktop.data.year.text}.
          </span>
        </p>
      </LogoTitleCon>

      <MenuCon animateLogo={animateLogo}>
        <DesktopNavP>
          <Link to="/">Index, </Link>
          <Link to="/resume">Resume, </Link>
          <Link to="/about">About</Link>
          {/* <br></br>Instagram, Twitter */}
        </DesktopNavP>
      </MenuCon>
      <PaginationCon animateLogo={animateLogo}>
        <DesktopNavP>
          Project {currentProjectPageNumber + 1} of {projects.length}
        </DesktopNavP>
      </PaginationCon>
      <PageCon animateLogo={animateLogo}>
        <IntroCon>
          <IntroTextCon>
            <MobileProjectTitleYearLocation>
              <p>
                Project: {data.prismicProjectDesktop.data.project_title.text}
                <br></br>
                Year: {data.prismicProjectDesktop.data.year.text}
                <br></br>
                Location: {data.prismicProjectDesktop.data.location.text}
              </p>
            </MobileProjectTitleYearLocation>
            <div
              dangerouslySetInnerHTML={{
                __html: data.prismicProjectDesktop.data.intro_text.html,
              }}
            />
          </IntroTextCon>
        </IntroCon>
        <MetaCon>
          <p>
            <br></br>
            Team: {data.prismicProjectDesktop.data.team.text}
            <br></br>
            Sector: {data.prismicProjectDesktop.data.sector.text}
            <br></br>
            Services:{" "}
            {data.prismicProjectDesktop.data.categories.map(
              (category, index) => {
                return (
                  <CategoryName key={index}>
                    {(index ? ", " : "") + category.category.slug}
                  </CategoryName>
                );
              }
            )}
          </p>
        </MetaCon>

        <Grid16>{projectBody}</Grid16>
        <MoreProjects>
          {/* {x ? "" : <PrevProject />} */}
          {y ? (
            <Resume />
          ) : (
            <NextProject2
              image={
                nextProjectContent[0].project_relationship_field.document.data
                  .index_preview_img.gatsbyImageData
              }
              title={
                nextProjectContent[0].project_relationship_field.document.data
                  .project_title.text
              }
              url={
                nextProjectContent[0].project_relationship_field.document.uid
              }
            />
          )}
          {/* <NextProject></NextProject> */}
        </MoreProjects>
      </PageCon>
      {/* </prevPathContext.Provider> */}
    </>
  );
};

export default withPrismicPreview(ProjectDesktop);

export const query = graphql`
  query Artists($uid: String!) {
    prismicProjectIndexSelect {
      data {
        project_relationship_group {
          project_relationship_field {
            document {
              ... on PrismicProjectDesktop {
                id
                type
                uid
                data {
                  project_title {
                    text
                  }
                  index_preview_img {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
    }
    allPrismicProjectDesktop {
      edges {
        node {
          uid
          data {
            categories {
              category {
                slug
                id
              }
            }
            project_title {
              text
            }
            year {
              text
            }
            client {
              text
            }
            location {
              text
            }
            sector {
              text
            }
            index_preview_img {
              gatsbyImageData
            }
          }
        }
      }
    }
    prismicProjectDesktop(uid: { eq: $uid }) {
      uid
      id
      data {
        project_title {
          html
          text
        }
        client {
          html
          text
        }
        location {
          html
          text
        }
        project_title {
          html
          text
        }
        team {
          html
          text
        }
        year {
          html
          text
        }
        sector {
          html
          text
        }
        categories {
          category {
            slug
            id
          }
        }
        intro_text {
          html
        }
        body2 {
          ... on PrismicProjectDesktopDataBody2Image {
            id
            slice_type
            primary {
              column_start
              column_width
              margin_top
              row_margin_top
              image {
                gatsbyImageData
              }
              caption {
                html
              }
              caption_font_size
            }
          }
          ... on PrismicProjectDesktopDataBody2FullBleedImage {
            id
            slice_type
            primary {
              column_start
              column_width
              margin_top
              row_margin_top
              image1 {
                gatsbyImageData
              }
              mobile_image {
                gatsbyImageData
              }
              caption {
                html
              }
              caption_font_size
            }
          }
          ... on PrismicProjectDesktopDataBody2Text {
            id
            slice_type
            primary {
              text {
                html
              }
              row_margin_top
            }
          }
          ... on PrismicProjectDesktopDataBody2Video {
            id
            slice_type
            primary {
              video {
                url
              }
              sml_video {
                url
              }
              row_margin_top
              margin_top
              index_image {
                gatsbyImageData
              }
              column_width
              column_start
              caption_size
              caption {
                html
                text
              }
            }
          }
          ... on PrismicProjectDesktopDataBody2FullBleedVideo {
            id
            slice_type
            primary {
              video {
                url
              }
              small_video {
                url
              }
              mobile_poster {
                gatsbyImageData
              }
              row_margin_top
              poster_image {
                gatsbyImageData
              }
              margin_top
              column_width
              column_start
              caption_font_size
              caption {
                html
                text
              }
            }
          }
          ... on PrismicProjectDesktopDataBody2BlackFilmsModule {
            id
            slice_type
            primary {
              video {
                url
              }
              poster_image {
                gatsbyImageData
                dimensions {
                  height
                  width
                }
              }
              full_bleed
              row_margin_top
              caption {
                html
                text
              }
              caption_font_size
            }
          }
          ... on PrismicProjectDesktopDataBody2Carousel {
            id
            slice_type
            items {
              image {
                gatsbyImageData
              }
            }
            primary {
              caption {
                text
                html
              }
              caption_font_size
              column_start
              column_width
              margin_top
              row_margin_top
              caption {
                text
              }
            }
          }
        }
      }
    }
  }
`;
