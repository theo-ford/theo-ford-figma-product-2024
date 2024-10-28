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
const Poster = styled.div`
  width: 100%;
  /* height: 100%; */
`;
export const VideoProjectPage = ({
  srcProps,
  posterProps,
  img,
  pageColour,
}) => {
  const VideoRef = useRef(null);
  const imgRef = useRef(null);
  const [isPlaying, setPlayingStatus] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [imgOrientation, setOrientationState] = useState("");
  const [vidDuration, setVidDuration] = useState("");

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   console.log(VideoRef.current.duration);
  //   console.log(format(VideoRef.current.duration));
  //   setVidDuration(format(VideoRef.current.duration));
  // }, [VideoRef, vidDuration]);
  // function y(seconds) {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = time - minutes * 60;

  //   function str_pad_left(string, pad, length) {
  //     return (new Array(length + 1).join(pad) + string).slice(-length);
  //   }

  //   const finalTime =
  //     str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
  //   return finalTime;
  // }

  // console.log(y(VideoRef.current.duration));

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
  const playVideo = () => {
    VideoRef.current.play();
    setPlayingStatus(true);
    setHasStartedPlaying(true);
  };
  const pauseVideo = () => {
    VideoRef.current.pause();
    setPlayingStatus(false);
  };
  const getImageVal = getImage(posterProps);

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
          <Poster
            ref={imgRef}
            style={{
              opacity: hasStartedPlaying ? 0 : 1,
              position: hasStartedPlaying ? "absolute" : "relative",
              zIndex: hasStartedPlaying ? -100 : 0,
              display: hasStartedPlaying ? "none" : "block",
            }}
            onClick={playVideo}
          >
            <GatsbyImage image={getImageVal} />
          </Poster>
          <video
            playsInline
            loop
            ref={VideoRef}
            style={{
              zIndex: 0,

              opacity: hasStartedPlaying ? 1 : 0,
              position: hasStartedPlaying ? "relative" : "absolute",
              display: hasStartedPlaying ? "block" : "none",
              // https://stackoverflow.com/questions/3680429/click-through-div-to-underlying-elements
              // click through video to controls
              pointerEvents: "none",
            }}
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source src={srcProps}></source>
          </video>
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
