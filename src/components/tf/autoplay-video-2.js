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

const AutoplayVideoCon = styled.div`
  position: relative;
  width: calc(100%);
  @media (max-width: 666px) {
    width: 100%;
  }
`;
const AutoplayVideoImg = styled.div`
  /* position: absolute; */
  width: 100%;
  height: 100%;
`;
const AutoplayVideoVideo = styled.video`
  /* position: absolute; */
  width: 100%;
  height: 100%;
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
    margin-top: -1px;
    animation-name: ${breatheAnimation};
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
`;

export const AutoPlayVideo = ({ srcProps, posterProps, changedSlide }) => {
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
      <AutoplayVideoCon>
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
      </AutoplayVideoCon>
    </>
  );
};
