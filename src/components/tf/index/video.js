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
import CarouselLengthContext from "./length-context";
import CarouselIndexClicked from "./slick-functions-context.js";
// import PauseButton from "../../../../public/icons/Pause.png";
// import PlayButton from "../../../../public/icons/Play.png";
// import PauseButton from "../../../../Pause.png";
// import PlayButton from "../../../../Play.png";
// import PauseButton from "../../../../Pause.png";
import { useOnScreen } from "../../hooks/useOnScreen";
import { ImageOrientation2 } from "../../utils/image-orientation2";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
/* - - - - - VIDEO WITH CONTROLS IMG - - - - - */

const VideoCon = styled.div`
  display: grid;
  top: 12.5px;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 4 */ 1fr 1fr 1fr 1fr /* 8 */ 1fr 1fr 1fr 1fr /* 12 */ 1fr 1fr 1fr 1fr /* 16 */ 1fr 1fr 1fr 1fr /* 20 */ 1fr 1fr 1fr 1fr /* 24 */ 1fr 1fr 1fr 1fr /* 28 */ 1fr 1fr 1fr 1fr /* 32 */ 1fr 1fr 1fr 1fr /* 36 */ 1fr 1fr 1fr 1fr /* 40 */ 1fr 1fr 1fr 1fr /* 44 */ 1fr 1fr 1fr 1fr /* 48 */;
  grid-column-gap: 12.5px;
  margin-left: 12.5px;
  grid-row-gap: 0;
  width: calc(100% - 25px);
  z-index: 20000;
  align-items: center;
  height: 110vh;
  @media (max-width: 666px) {
    grid-template-columns: 1fr 1fr 1fr 1fr /* 4 */ 1fr 1fr 1fr 1fr /* 8 */ 1fr 1fr 1fr 1fr /* 12 */ 1fr 1fr 1fr 1fr /* 16 */ 1fr 1fr 1fr 1fr /* 20 */ 1fr 1fr 1fr 1fr /* 24 */ 1fr 1fr 1fr 1fr /* 28 */ 1fr 1fr 1fr 1fr /* 32 */ 1fr 1fr 1fr 1fr /* 36 */;
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
  cursor: pointer;
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
  @media (max-width: 666px) {
    &.sml-portrait {
      /* grid-column: 5 / span 16; */
      /* grid-column: 4 / span 30; */
      grid-column: 6 / span 26;
    }
    &.lrg-portrait {
      /* grid-column: 5 / span 16; */
      grid-column: 7 / span 24;
    }
    &.square {
      /* grid-column: 4 / span 18; */
      /* grid-column: 3 / span 32; */
      /* grid-column: span 36; */
      grid-column: 5 / span 28;
    }
    &.landscape {
      /* grid-column: span 24; */
      grid-column: span 36;
    }
  }
`;
const VideoWithContolsSC = styled.video`
  width: 100%;
`;
const ControlsCon = styled.div`
  z-index: 1;
  padding-top: 4px;

  &.landscape {
    width: 50%;
  }
  @media (max-width: 666px) {
    padding-top: 3px;
  }
`;
const PlayButtonCon = styled.div`
  // margin-top: 5px;
  padding-left: 10px;
  width: calc(50%);
  float: left;
  display: inline-block;
  /* background-color: blue; */
  height: 13px;
  padding-top: 3px;

  p {
    color: white;
    font-size: 12px;
  }
`;
const PaginationCon = styled.div`
  // margin-top: 5px;
  width: calc(50%);
  display: inline-block;
  float: left;
  /* background-color: red; */
  height: 13px;
`;
const PaginationControlP = styled.p`
  display: inline-block;
  color: #545454;
  font-size: 12px;
  margin: 0;
  padding: 0;
  top: 0;
  /* position: absolute; */
  &.active {
    color: white;
  }
`;
const PlayPauseButtonCon = styled.div`
  height: 12px;
`;
const PauseButtonImgCon = styled.div`
  width: 8px;
  display: inline-block !important;
  /* margin-right: 5px; */
  margin-top: 2px;
  img {
    fill: #ff0000;
  }
`;
const PlayButtonText = styled.p`
  font-size: 12px;
  color: white;
  margin: 0;
  padding: 0;
  display: inline-block;
  position: absolute;
  margin-left: 5px;
  color: #545454 !important;
`;

const PlayButtonImgCon = styled.div`
  width: 8px;
  /* margin-right: 5px; */
  margin-top: 2px;
  display: inline-block !important;
  /* background-color: blue; */
`;
const VideoControlsImgCon = styled.div``;
const VideoControlsImg = styled.div`
  width: 100%;
  height: 100%;
`;
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
    color: white;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    background-color: black;
    margin-top: -1px;
    animation-name: ${breatheAnimation};
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  @media (min-width: 666px) {
    display: none;
  }
`;

export const VideoWithControlsImg2 = ({ srcProps, posterProps, img }) => {
  const carouselLength = useContext(CarouselLengthContext);
  const { slideGoTo, setSlideGoTo } = useContext(CarouselIndexClicked);
  const value = useMemo(() => ({ slideGoTo, setSlideGoTo }), [slideGoTo]);

  const Pagination = ({ carouselLength }) => {
    const array = [...Array(carouselLength)];
    const handleClick = index => {
      setSlideGoTo(index);
    };
    const items = array.map((child, index) => {
      return (
        <>
          <CarouselLengthContext.Provider value={carouselLength}>
            <CarouselIndexClicked.Provider value={value}>
              <PaginationControlP
                className={slideGoTo == index ? "active" : ""}
                onClick={() => handleClick(index)}
              >
                {("0" + (index + 1)).slice(-2)}
              </PaginationControlP>
              {"    "}
            </CarouselIndexClicked.Provider>
          </CarouselLengthContext.Provider>
        </>
      );
    });
    return <div>{items}</div>;
  };

  const videoWithControlsRef = useRef(null);
  const isOnScreen = useOnScreen(videoWithControlsRef);
  const [videoSrcState, setVideoSrcState] = useState("");
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  const [isPlaying, setPlayingStatus] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  const onLoadedData = () => {
    setIsVideoLoaded(true);
    if (isPlaying) {
      setHasStartedPlaying(true);
    }
  };

  useEffect(() => {
    if (isOnScreen == true) {
      // console.log(srcProps);
      // console.log("on screen");
      // to load the video on scroll
      // comment out below two lines to make it load on click, test hosted
      setVideoSrcState(srcProps);
      videoWithControlsRef.current.load();
    } else if (isOnScreen === false) {
      setIsVideoLoaded(false);
      setVideoSrcState("");
      setPlayingStatus(false);
      setHasStartedPlaying(false);
    }
  }, [isOnScreen, videoSrcState]);

  const playVideo = () => {
    videoWithControlsRef.current.play();
    setPlayingStatus(true);
    if (isVideoLoaded) {
      setHasStartedPlaying(true);
    }
  };
  const pauseVideo = () => {
    videoWithControlsRef.current.pause();
    setPlayingStatus(false);
  };
  const playPause = () => {
    if (isPlaying) {
      videoWithControlsRef.current.pause();
      setPlayingStatus(false);
    } else {
      videoWithControlsRef.current.play();
      setPlayingStatus(true);
    }
  };

  const getPosterImg = getImage(posterProps);

  return (
    <>
      {/* <CarouselLengthContext.Provider> */}
      <VideoCon>
        <VideoConInner className={ImageOrientation2(img)} onClick={playPause}>
          <VideoControlsImgCon
            style={{
              opacity: hasStartedPlaying ? 0 : 1,
              position: hasStartedPlaying ? "absolute" : "relative",
            }}
          >
            {!isVideoLoaded && isPlaying ? (
              <AutoplayVideoTextCon>
                <p>Video Loading</p>
              </AutoplayVideoTextCon>
            ) : (
              " "
            )}

            <VideoControlsImg
              style={{
                opacity: hasStartedPlaying ? 0 : 1,
                position: hasStartedPlaying ? "absolute" : "relative",
              }}
              onClick={playVideo}
            >
              <GatsbyImage image={getPosterImg} />
            </VideoControlsImg>
          </VideoControlsImgCon>
          <VideoWithContolsSC
            playsInline
            muted
            loop
            preload="auto"
            ref={videoWithControlsRef}
            // onLoadedData={onLoadedData}
            onCanPlayThrough={onLoadedData}
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
              <Pagination carouselLength={carouselLength}></Pagination>
            </PaginationCon>
            <PlayButtonCon
              style={{
                zIndex: 1,
              }}
            >
              {isPlaying ? (
                <PlayPauseButtonCon onClick={pauseVideo}>
                  <PauseButtonImgCon>
                    <StaticImage src={"../../../img/Pause_54.svg"} />
                  </PauseButtonImgCon>

                  <PlayButtonText>Pause</PlayButtonText>
                </PlayPauseButtonCon>
              ) : (
                <PlayPauseButtonCon onClick={playVideo}>
                  <PlayButtonImgCon>
                    <StaticImage src={"../../../img/Play_54.svg"} />
                  </PlayButtonImgCon>
                  <PlayButtonText>Play</PlayButtonText>
                </PlayPauseButtonCon>
              )}
            </PlayButtonCon>
          </ControlsCon>
        </VideoConInner>
      </VideoCon>
      {/* </CarouselLengthContext.Provider> */}
    </>
  );
};
