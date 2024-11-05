import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useOnScreen } from "../hooks/useOnScreen";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ImageOrientation2 } from "../utils/image-orientation2";

const AutoplayVideoCon = styled.div`
  /* position: relative; */
  width: calc(100%);
  display: grid;
  top: 12.5px;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 4 */ 1fr 1fr 1fr 1fr /* 8 */ 1fr 1fr 1fr 1fr /* 12 */ 1fr 1fr 1fr 1fr /* 16 */ 1fr 1fr 1fr 1fr /* 20 */ 1fr 1fr 1fr 1fr /* 24 */ 1fr 1fr 1fr 1fr /* 28 */ 1fr 1fr 1fr 1fr /* 32 */ 1fr 1fr 1fr 1fr /* 36 */ 1fr 1fr 1fr 1fr /* 40 */ 1fr 1fr 1fr 1fr /* 44 */ 1fr 1fr 1fr 1fr /* 48 */;
  grid-column-gap: 12.5px;
  margin-left: 12.5px;
  grid-row-gap: 0;
  width: calc(100% - 25px);
  z-index: 20000;
  align-items: center;
  /* height: calc(100vh - 25px); */
  height: 110vh;
  /* &.landscape {
    height: auto;
    top: 0;
    width: calc(100%);
    margin-left: 0;
  } */
  /* display: ${props => {
    const columnWidth = props.fullBleed;
    if (columnWidth) {
      return "block";
    }
  }}; */

  @media (min-width: 666px) {
    height: ${props => {
      const fullBleed = props.fullBleed;
      console.log(fullBleed);
      if (fullBleed == true) {
        return "inherit !important";
      }
    }};
  width: ${props => {
    const fullBleed = props.fullBleed;
    console.log(fullBleed);
    if (fullBleed == true) {
      return "100vw";
    }
  }};
    margin: ${props => {
      const fullBleed = props.fullBleed;
      console.log(fullBleed);
      if (fullBleed == true) {
        return "0px";
      }
    }};
  }
  
  @media (max-width: 666px) {
    grid-template-columns: 1fr 1fr 1fr 1fr /* 4 */ 1fr 1fr 1fr 1fr /* 8 */ 1fr 1fr 1fr 1fr /* 12 */ 1fr 1fr 1fr 1fr /* 16 */ 1fr 1fr 1fr 1fr /* 20 */ 1fr 1fr 1fr 1fr /* 24 */ 1fr 1fr 1fr 1fr /* 28 */ 1fr 1fr 1fr 1fr /* 32 */ 1fr 1fr 1fr 1fr /* 36 */;
    grid-column-gap: 10px;
    margin-left: 10px;
    grid-row-gap: 0;
    width: calc(100% - 20px);
    z-index: 20000;
    align-items: center;
    height: 100vh;
    /* &.landscape {
      height: 100vh;
      top: 0;
      width: calc(100% - 20px);
      margin-left: 10px;
    } */
  }
`;
const AutoPlayVideoConInner = styled.div`
  &.sml-portrait {
    grid-column: 19 / span 12;
  }
  &.lrg-portrait {
    grid-column: 20 / span 10;
  }
  &.square {
    grid-column: 18 / span 14;
  }
  &.landscape {
    grid-column: 13 / span 24;
  }
  @media (min-width: 666px) {
    grid-column: ${props => {
      const fullBleed = props.fullBleed;
      console.log(fullBleed);
      if (fullBleed == true) {
        return "span 48 !important";
      }
    }};
  }

  @media (max-width: 666px) {
    &.sml-portrait {
      grid-column: 6 / span 26;
    }
    &.lrg-portrait {
      grid-column: 7 / span 24;
    }
    &.square {
      grid-column: 5 / span 28;
    }
    &.landscape {
      grid-column: span 36;
    }
  }
`;
const AutoplayVideoImg = styled.div`
  width: 100%;
  height: 100%;
  /* border-radius: 10px !important;
  overflow: hidden; */
`;
const AutoplayVideoVideo = styled.video`
  width: 100%;
  /* height: auto; */
  /* border-radius: 10px !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-collapse: separate;
  overflow: hidden !important;
  perspective: 1px; */
`;
const AutoplayVideoImgCon = styled.div``;
const breatheAnimation = keyframes`
  0% {opacity: 0} 
  50% {opacity: 1}
  100% {opacity:0}
`;
const AutoplayVideoTextCon = styled.div`
  position: absolute;
  z-index: 10000;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;

  p {
    color: black;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    background-color: white;
    border-radius: 10px !important;
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.13);
    overflow: hidden;
    margin-top: -1px;
    animation-name: ${breatheAnimation};
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  @media (min-width: 666px) {
    display: none;
  }
`;

export const AutoPlayVideoOriginalAuto = ({
  srcProps,
  posterProps,
  changedSlide,
  fullBleed,
}) => {
  // https://stackoverflow.com/questions/58341787/intersectionobserver-with-react-hooks
  // https://frontend-digest.com/responsive-and-progressive-video-loading-in-react-e8753315af51
  const autoplayVideoRef = useRef(null);
  const isOnScreen = useOnScreen(autoplayVideoRef);
  const [videoSrcState, setVideoSrcState] = useState("");
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };

  useEffect(() => {
    if (isOnScreen == true) {
      setVideoSrcState(srcProps);
      autoplayVideoRef.current.load();
      autoplayVideoRef.current.play();
    } else if (isOnScreen === false) {
      setIsVideoLoaded(false);
      setVideoSrcState("");
    }
  }, [isOnScreen]);
  const getPosterImage = getImage(posterProps);
  return (
    <>
      <AutoplayVideoCon
        className={ImageOrientation2(posterProps)}
        fullBleed={fullBleed}
      >
        <AutoPlayVideoConInner
          className={ImageOrientation2(posterProps)}
          fullBleed={fullBleed}
        >
          <AutoplayVideoImgCon
            style={{
              opacity: isVideoLoaded ? 0 : 1,
              position: isVideoLoaded ? "absolute" : "relative",
            }}
          >
            <AutoplayVideoTextCon>
              <p>Video Loading</p>
            </AutoplayVideoTextCon>
            <AutoplayVideoImg
              srcSet={posterProps}
              style={{
                opacity: isVideoLoaded ? 0 : 1,
                position: isVideoLoaded ? "absolute" : "relative",
              }}
            >
              <GatsbyImage image={getPosterImage} />
            </AutoplayVideoImg>
          </AutoplayVideoImgCon>

          <AutoplayVideoVideo
            playsInline
            autoPlay
            muted
            loop
            ref={autoplayVideoRef}
            // onCanPlayThrough={onLoadedData}
            onLoadedData={onLoadedData}
            style={{
              opacity: isVideoLoaded ? 1 : 0,
              position: isVideoLoaded ? "relative" : "absolute",
            }}
          >
            <source type="video/mp4" src={videoSrcState} />
          </AutoplayVideoVideo>
        </AutoPlayVideoConInner>
      </AutoplayVideoCon>
    </>
  );
};
