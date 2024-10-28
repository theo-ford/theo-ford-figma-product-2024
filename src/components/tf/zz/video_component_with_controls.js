import React, { useEffect, useState, useRef, useCallback } from "react";
import { graphql, Link } from "gatsby";
import { withPreview } from "gatsby-source-prismic";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { set } from "lodash";
// import screenfull from "screenfull";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const VideoGrid = styled.div`
  /* display: grid;
  grid-column-gap: 0px; */
  width: 100%;
  /* grid-template-columns: auto auto auto auto; */
`;
const VideoRow = styled.div`
  /* grid-column-start: 1;
  grid-column-end: 4; */
`;
const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
`;

const ReactPlayerButton = styled.p`
  position: absolute;
  z-index: 10;
  font-size: 2em;
  color: black;
  top: 0;
  left: 0;
  margin-left: 0;
  margin-top: 9px;
  margin-bottom: 9px;
  padding: 0;
`;

const VolumeSlider = styled.input`
  position: absolute;
  z-index: 10;
  font-size: 2em;
  color: white;
  top: 100px;
  /* left: 400px; */
  margin-left: 0;
  margin-top: 9px;
  margin-bottom: 9px;
  padding: 0;
`;

const MuteButton = styled.p`
  position: absolute;
  z-index: 10;
  font-size: 2em;
  color: black;
  top: 0;
  left: 150px;
  margin-left: 0;
  margin-top: 9px;
  margin-bottom: 9px;
  padding: 0;
`;

const ProgressBar = styled.input`
  position: absolute;
  z-index: 10;
  font-size: 2em;
  bottom: 0;
  left: 0;
  margin-left: 0;
  margin-top: 9px;
  margin-bottom: 9px;
  padding: 0;
  width: 100%;

  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;

  background: white;
  height: 5px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 5px;
    height: 30px;
    background: white;
  }
`;

const VideoProgressTime = styled.p`
  position: absolute;
  z-index: 10;
  font-size: 2em;
  color: white;
  top: 0;
  left: 0px;
`;

const FullScreenButton = styled.p`
  position: absolute;
  z-index: 10;
  font-size: 2em;
  color: white;
  top: 40px;
  left: 0px;
`;
const ReactPlayerWrapper = styled.div`
  display: none;
`;

export const VideoComponent = ({ content, source }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muteState, setMuteStatus] = useState(true);
  const [playedState, setPlayedState] = useState(0);
  const [seeking, setSeek] = useState(false);
  const [durationState, durationSetState] = useState(null);

  const videoRef = useRef();

  const handle = useFullScreenHandle();
  // useEffect(() => {
  //   console.log(videoRef.current);
  //   var duration = videoRef.current.getDuration();
  //   console.log(duration);
  // }, [videoRef.current]);

  //

  function volumeChange(e) {
    var rangeValue = e.target.value;
    var valueForVolumeControl = rangeValue / 100;
    setVolume(valueForVolumeControl);
  }

  function progressFunc(progress) {
    var videoProgress = progress.playedSeconds;
    console.log(videoProgress);
    if (!seeking) {
      setPlayedState(videoProgress);
    }
  }

  function handleSeekChange(e) {
    setPlayedState(e.target.value);
  }

  function mouseDownSeek(e) {
    setSeek(true);
  }

  function mouseUpSeek(e) {
    setSeek(false);
    videoRef.current.seekTo(e.target.value);
  }

  return (
    <>
      <p> React Player</p>
      <VideoGrid>
        <VideoRow>
          <PlayerWrapper>
            <FullScreen handle={handle}>
              <ReactPlayer
                ref={videoRef}
                className="player"
                playing={playing}
                muted={muteState}
                loop={true}
                volume={volume}
                // controls={true}
                width="100%"
                height="100%"
                onProgress={progressFunc}
                url={source}
                onReady={reactPlayer => {
                  console.log(reactPlayer.getDuration());
                  durationSetState(reactPlayer.getDuration());
                }}
              ></ReactPlayer>

              {playing ? (
                <ReactPlayerButton onClick={() => setPlaying(false)}>
                  Pause
                </ReactPlayerButton>
              ) : (
                <ReactPlayerButton onClick={() => setPlaying(true)}>
                  Play
                </ReactPlayerButton>
              )}
              <VideoProgressTime>{playedState};</VideoProgressTime>
              <FullScreenButton onClick={handle.enter}>
                Full Screen
              </FullScreenButton>
              {muteState ? (
                <MuteButton onClick={() => setMuteStatus(false)}>
                  Un Mute
                </MuteButton>
              ) : (
                <MuteButton onClick={() => setMuteStatus(true)}>
                  Mute
                </MuteButton>
              )}
              <VolumeSlider
                type="range"
                min="0"
                max="100"
                onChange={volumeChange}
              ></VolumeSlider>
              <ProgressBar
                type="range"
                min={0}
                max={durationState}
                step="any"
                value={playedState}
                onChange={handleSeekChange}
                onMouseDown={mouseDownSeek}
                onMouseUp={mouseUpSeek}
              ></ProgressBar>
            </FullScreen>
          </PlayerWrapper>
        </VideoRow>
      </VideoGrid>
    </>
  );
};
