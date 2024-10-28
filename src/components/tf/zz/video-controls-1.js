import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import ReactDOM, { findDOMNode } from "react-dom";
import { graphql, Link, useScrollRestoration } from "gatsby";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { withPreview } from "gatsby-source-prismic";
import { ImageOrientation } from "../utils/image-orientation";
import { Helmet } from "react-helmet";
import "../styles/index.css";
// import { useMediaQuery } from "../media-query";
// import "../components/slick/slick.css";
// import "../components/slick/slick-theme.css";
import { useOnScreen } from "../hooks/useOnScreen";
import PauseButton from "../../../public/icons/Pause.png";
import PlayButton from "../../../public/icons/Play.png";

const VideoCon = styled.div`
  // grid-column: ${props => (props.portrait ? "7 / span 4;" : "5 / span 8;")};
  display: grid;
  top: 12.5px;
  grid-template-columns: 1fr 1fr 1fr 1fr  1fr 1fr 1fr 1fr  1fr 1fr 1fr 1fr  1fr 1fr 1fr 1fr  1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 12.5px;
  margin-left: 12.5px;
  grid-row-gap: 0;
  width: calc(100% - 25px);
  z-index: 20000;
  align-items: center;
  height: 110vh;
  @media (max-width: 666px) {
    grid-template-columns: 1fr 1fr 1fr 1fr  1fr 1fr 1fr 1fr  1fr 1fr 1fr 1fr  1fr 1fr 1fr 1fr  1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 10px;
    margin-left: 10px;
    grid-row-gap: 0;
    width: calc(100% - 20px);
    z-index: 20000;
    align-items: center;
    height: 110vh;
  }
`;

const VideoConInner = styled.div`
  /* grid-column: ${props =>
    props.portrait ? "7 / span 4;" : "5 / span 8;"}; */
 
  &.sml-portrait {
    grid-column:  10 / span 6;
  }
  &.lrg-portrait {
    grid-column:  10 / span 6;
  }  
  &.square {
    grid-column:  9 / span 8;
  }
  &.landscape {
    grid-column: 7 / span 12;
  }
  
  
  @media (max-width: 666px) {
    
    
    &.sml-portrait {
    grid-column:  5 / span 16;
    }
    &.lrg-portrait {
      grid-column:  6 / span 14;
    }  
    &.square {
      grid-column:  4 / span 18;
    }
    &.landscape {
      grid-column: span 24;
    }    
  }

`;
const VideoWithContolsSC = styled.video`
  // grid-column: 5 / span 8;
  // grid-column: ${props => (props.portrait ? "7 / span 4;" : "5 / span 8;")};
  width: 100%;
`;

const ControlsCon = styled.div`
  z-index: 1;
  /* position: absolute; */
  /* background-color: blue; */

  &.landscape {
    width: 50%;
  }
`;
const PlayButtonCon = styled.div`
  /* background-color: red; */
  margin-top: 5px;
  /* grid-column: 5 / span 1; */
  /* height: 10px; */
  width: calc(50%);
  /* margin-left: calc(6.25px); */
  display: inline-block;

  /* background-color: green; */
  p {
    color: #d4d4d4;
    font-size: 12px;
  }
`;
const PaginationCon = styled.div`
  /* background-color: red; */
  margin-top: 5px;
  width: calc(50%);
  /* grid-column: 5 / span 1; */
  /* height: 10px; */
  /* width: calc(50%); */
  display: inline-block;
  /* background-color: red; */
`;

const PauseButtonImg = styled.img`
  width: 8px;
  display: inline-block !important;
  margin-right: 5px;
`;
const PlayButtonImg = styled.img`
  width: 8px;
  display: inline-block !important;
`;
const PaginationControlP = styled.p`
  display: inline-block;
  color: #545454;
  font-size: 12px;
  &.active {
    color: white;
  }
`;
const VideoControlsImgCon = styled.div``;
const VideoControlsImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const VideoWithControlsImg1 = ({ srcProps, posterProps }) => {
  //console.log(srcProps);
  const CarouselLengthContext = createContext();
  const CarouselIndexClicked = createContext({
    slideGoTo: 0,
    setSlideGoTo: () => {},
  });

  const videoWithControlsRef = useRef(null);
  // const height = videoWithControlsRef.current.dimensions.height;
  const imgRef = useRef(null);
  const isOnScreen = useOnScreen(videoWithControlsRef);
  const [videoSrcState, setVideoSrcState] = useState("");
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  const [imgOrientation, setOrientationState] = useState("");
  const [isPlaying, setPlayingStatus] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const VideoConInnerRef = useRef(null);
  const carouselLength = useContext(CarouselLengthContext);
  const { slideGoTo, setSlideGoTo } = useContext(CarouselIndexClicked);
  // console.log(carouselLength);
  // console.log(CarouselLengthContext);

  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };

  const Pagination = ({ carouselLength }) => {
    // console.log(carouselLength);
    const array = [...Array(carouselLength)];
    // console.log(array);
    const handleClick = index => {
      // console.log(index);
      setSlideGoTo(index);
    };
    const items = array.map((child, index) => {
      // console.log(index);
      return (
        <>
          <PaginationControlP
            className={slideGoTo == index ? "active" : ""}
            onClick={() => handleClick(index)}
          >
            {/* {index + 1} */}
            {("0" + (index + 1)).slice(-2)}
          </PaginationControlP>
          {"    "}
        </>
      );
    });
    return <div>{items}</div>;
  };

  useEffect(() => {
    // console.log(imgRef.current.height);
    // console.log(imgRef.current.width);
    var width = imgRef.current.width;
    var height = imgRef.current.height;
    // var smlPortrait = width * 1.25;
    // var lrgPortrait = width * 1.777;
    var x = height / width;
    // console.log(srcProps);
    // console.log(x);
    if (x > 1.7) {
      setOrientationState("lrg-portrait");
      // VideoConInnerRef.current.classList.add("lrg-portrait");
    } else if (x > 1.2) {
      setOrientationState("sml-portrait");
    } else if (height >= width) {
      setOrientationState("square");
      // VideoConInnerRef.current.classList.add("square");
    } else if (width > height) {
      setOrientationState("landscape");
      // VideoConInnerRef.current.classList.add("landscape");
    }
  }, [imgRef, srcProps]);
  // console.log(imgRef);

  useEffect(() => {
    if (isOnScreen == true) {
      console.log(srcProps);
      console.log("on screen");
      setVideoSrcState(srcProps);
      videoWithControlsRef.current.load();
      // videoWithControlsRef.current.play();
    } else if (isOnScreen === false) {
      // console.log(srcProps);
      // console.log("off screen");
      setIsVideoLoaded(false);
      setVideoSrcState("");
    }
  }, [isOnScreen, videoSrcState]);

  const playVideo = () => {
    videoWithControlsRef.current.play();
    setPlayingStatus(true);
    setHasStartedPlaying(true);
  };
  const pauseVideo = () => {
    videoWithControlsRef.current.pause();
    setPlayingStatus(false);
  };
  const handleClick = event => {
    // console.log("pagination clicked");
  };
  return (
    <>
      <CarouselLengthContext.Provider>
        <VideoCon>
          <VideoConInner className={imgOrientation}>
            <VideoControlsImgCon
              style={{
                opacity: hasStartedPlaying ? 0 : 1,
                position: hasStartedPlaying ? "absolute" : "relative",
              }}
            >
              <VideoControlsImg
                ref={imgRef}
                srcSet={posterProps}
                style={{
                  opacity: hasStartedPlaying ? 0 : 1,
                  position: hasStartedPlaying ? "absolute" : "relative",
                }}
              ></VideoControlsImg>
            </VideoControlsImgCon>
            <VideoWithContolsSC
              playsInline
              muted
              loop
              preload="auto"
              ref={videoWithControlsRef}
              onLoadedData={onLoadedData}
              style={{
                zIndex: 0,

                opacity: hasStartedPlaying ? 1 : 0,
                position: hasStartedPlaying ? "relative" : "absolute",
                // https://stackoverflow.com/questions/3680429/click-through-div-to-underlying-elements
                // click through video to controls
                pointerEvents: "none",
              }}
            >
              <source type="video/mp4" src={videoSrcState} />
            </VideoWithContolsSC>
            <ControlsCon>
              <PaginationCon>
                {/* <p onClick={handleClick}>
                  <span className="active">01</span> 02 03
                </p> */}
                <Pagination carouselLength={carouselLength}></Pagination>
              </PaginationCon>
              <PlayButtonCon
                style={{
                  zIndex: 1,
                }}
              >
                {isPlaying ? (
                  <p onClick={pauseVideo}>
                    <PauseButtonImg src={PauseButton} />
                    Pause
                  </p>
                ) : (
                  <p onClick={playVideo}>
                    <PlayButtonImg src={PlayButton} /> Play
                  </p>
                )}
              </PlayButtonCon>
            </ControlsCon>
          </VideoConInner>
        </VideoCon>
      </CarouselLengthContext.Provider>
    </>
  );
};
