import React, { useEffect, useState, useRef, useCallback } from "react";

import styled from "styled-components";
import ReactPlayer from "react-player";

const VideoGrid = styled.div`
  width: 100%;
`;
const VideoRow = styled.div``;
const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
`;

export const VideoComponentNoControls = ({ content, source }) => {
  const videoRef = useRef();

  return (
    <>
      <VideoGrid>
        <VideoRow>
          <PlayerWrapper>
            <ReactPlayer
              ref={videoRef}
              className="player"
              playing={true}
              muted={true}
              loop={true}
              controls={false}
              width="100%"
              height="100%"
              url={source}
              playsinline={true}
            ></ReactPlayer>
          </PlayerWrapper>
        </VideoRow>
      </VideoGrid>
    </>
  );
};
