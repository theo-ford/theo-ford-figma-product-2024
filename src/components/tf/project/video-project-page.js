import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useOnScreen } from "../../hooks/useOnScreen";
import { ImageOrientation } from "../../utils/image-orientation";
import { ImageOrientation2 } from "../../utils/image-orientation2";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { playWhite } from "../../../img/Play_White.svg";

const VideoCon = styled.div`
  /* margin-bottom: 200px; */
  /* margin-bottom: 12.5px; */
  /* margin-top: 25px;
  margin-bottom: 25px; */
  margin-top: 100px;
  margin-bottom: 100px;
  position: relative;
  float: left;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 4 */ 1fr 1fr 1fr 1fr /* 8 */ 1fr 1fr 1fr 1fr /* 12 */ 1fr 1fr 1fr 1fr /* 16 */ 1fr 1fr 1fr 1fr /* 20 */ 1fr 1fr 1fr 1fr /* 24 */;
  grid-gap: 12.5px;
  width: 100%;
  /* background-color: red; */
  /* background-color: red; */
  @media (max-width: 666px) {
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr /* 4 */ 1fr 1fr 1fr 1fr /* 8 */ 1fr 1fr 1fr 1fr /* 12 */ 1fr 1fr 1fr 1fr /* 16 */ 1fr 1fr 1fr 1fr /* 20 */ 1fr 1fr 1fr 1fr /* 24 */ 1fr 1fr 1fr 1fr /* 28 */ 1fr 1fr 1fr 1fr /* 32 */ 1fr 1fr 1fr 1fr /* 36 */;
    grid-column-gap: 10px;
    grid-row-gap: 0;
    margin-top: 50px;
    margin-bottom: 50px;
    /* width: calc(100% - 20px); */
  }
`;
const VideoConInner = styled.div`
  /* &.portrait {
    grid-column: 4 / span 6;
  } */
  cursor: pointer;
  &.sml-portrait {
    grid-column: 7 / span 12;
  }
  &.lrg-portrait {
    grid-column: 8 / span 10;
  }
  &.square {
    grid-column: 6 / span 14;
  }
  &.landscape {
    grid-column: 1 / span 24;
  }
  @media (max-width: 666px) {
    &.sml-portrait {
      /* grid-column: 5 / span 16; */
      /* grid-column: 4 / span 30; */
      /* grid-column: 6 / span 26; */
      grid-column: span 36;
    }
    &.lrg-portrait {
      /* grid-column: 5 / span 16; */
      /* grid-column: 7 / span 24; */
      grid-column: span 36;
    }
    &.square {
      /* grid-column: 4 / span 18; */
      /* grid-column: 3 / span 32; */
      /* grid-column: span 36; */
      /* grid-column: 5 / span 28; */
      grid-column: span 36;
    }
    &.landscape {
      /* grid-column: span 24; */
      grid-column: span 36;
    }
  }
`;
const ControlsCon = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12.5px;
  width: 100%;
  margin-top: 5px;
`;
const LengthCon = styled.div`
  grid-column: span 1;
  p {
    font-size: 12px;
    color: #545454;
    color: ${props => (props.pageColour == "black" ? "#545454" : "#878787")};
  }
`;
const PlayPauseButtonCon = styled.div`
  height: 12px;
`;
const PlayCon = styled.div`
  grid-column: span 1;
  /* background-color: red; */
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
  color: #545454;
  color: white;
  margin: 0;
  padding: 0;
  display: inline-block;
  position: absolute;
  margin-left: 5px;
  color: ${props => (props.pageColour == "black" ? "#545454" : "#878787")};
`;

const PlayButtonImgCon = styled.div`
  width: 8px;
  /* margin-right: 5px; */
  margin-top: 2px;
  display: inline-block !important;
  /* background-color: blue; */
`;
// const Poster = styled.div`
//   width: 100%;
//   /* height: 100%; */
// `;
const VideoWithContolsSC = styled.video`
  width: 100%;
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

export const VideoProjectPage = ({
  srcProps,
  posterProps,
  img,
  pageColour,
}) => {
  function format(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + String(mins).padStart(2, "0") + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  const handleLoadedMetadata = () => {
    console.log(VideoRef.current.duration);
    console.log(format(VideoRef.current.duration));
    setVidDuration(format(VideoRef.current.duration));
  };

  const PlayButtonImg = pageColour => {
    if (pageColour.pageColour === "white") {
      return <StaticImage src={"../../../img/Play_87.svg"} />;
    } else if (pageColour.pageColour === "black") {
      return <StaticImage src={"../../../img/Play_54.svg"} />;
    }
  };

  const PauseButtonImg = pageColour => {
    if (pageColour.pageColour === "white") {
      return <StaticImage src={"../../../img/Pause_87.svg"} />;
    } else if (pageColour.pageColour === "black") {
      return <StaticImage src={"../../../img/Pause_54.svg"} />;
    }
  };

  const VideoRef = useRef(null);
  const isOnScreen = useOnScreen(VideoRef);
  const imgRef = useRef(null);
  const [isPlaying, setPlayingStatus] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [vidDuration, setVidDuration] = useState("");
  const [videoSrcState, setVideoSrcState] = useState("");
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  useEffect(() => {
    if (isOnScreen == true) {
      setVideoSrcState(srcProps);
      VideoRef.current.load();
      // if (!isVideoLoaded) {
      //   VideoRef.current.load();
      // }
    } else if (isOnScreen === false) {
      setIsVideoLoaded(false);
      setVideoSrcState("");
      setPlayingStatus(false);
      setHasStartedPlaying(false);
    }
  }, [isOnScreen, videoSrcState]);

  const onLoadedData = () => {
    setIsVideoLoaded(true);
    if (isPlaying) {
      setHasStartedPlaying(true);
    }
  };

  const playVideo = () => {
    VideoRef.current.play();
    setPlayingStatus(true);
    if (isVideoLoaded) {
      setHasStartedPlaying(true);
    }
  };
  const pauseVideo = () => {
    VideoRef.current.pause();
    setPlayingStatus(false);
  };
  const getImageVal = getImage(posterProps);

  const playPause = () => {
    if (isPlaying) {
      VideoRef.current.pause();
      setPlayingStatus(false);
    } else {
      VideoRef.current.play();
      setPlayingStatus(true);
    }
  };
  return (
    <>
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
            <VideoControlsImgCon
              style={{
                opacity: hasStartedPlaying ? 0 : 1,
                position: hasStartedPlaying ? "absolute" : "relative",
              }}
              onClick={playVideo}
            >
              {!isVideoLoaded && isPlaying ? (
                <AutoplayVideoTextCon>
                  <p>Video Loading</p>
                </AutoplayVideoTextCon>
              ) : (
                " "
              )}
              <GatsbyImage image={getImageVal} />
              {/* <Poster
            ref={imgRef}
            style={{
              opacity: hasStartedPlaying ? 0 : 1,
              position: hasStartedPlaying ? "absolute" : "relative",
              zIndex: hasStartedPlaying ? -100 : 0,
              display: hasStartedPlaying ? "none" : "block",
            }}
            onClick={playVideo}
          > 
            
          </Poster> */}
            </VideoControlsImgCon>
          </VideoControlsImgCon>
          <VideoWithContolsSC
            playsInline
            // muted
            loop
            preload="auto"
            ref={VideoRef}
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
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source type="video/mp4" src={videoSrcState} />
          </VideoWithContolsSC>
          <ControlsCon>
            <LengthCon pageColour={pageColour}>
              <p>{vidDuration}</p>
              {/* <p>TEST</p> */}
            </LengthCon>
            <PlayCon>
              {isPlaying ? (
                <PlayPauseButtonCon onClick={pauseVideo}>
                  <PauseButtonImgCon>
                    <PauseButtonImg pageColour={pageColour} />
                  </PauseButtonImgCon>

                  <PlayButtonText pageColour={pageColour}>Pause</PlayButtonText>
                </PlayPauseButtonCon>
              ) : (
                <PlayPauseButtonCon onClick={playVideo}>
                  <PlayButtonImgCon>
                    <PlayButtonImg pageColour={pageColour} />
                  </PlayButtonImgCon>
                  <PlayButtonText pageColour={pageColour}>Play</PlayButtonText>
                </PlayPauseButtonCon>
              )}
            </PlayCon>
          </ControlsCon>
        </VideoConInner>
      </VideoCon>
    </>
  );
};
