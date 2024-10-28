import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

const SquareImage = styled.img`
  width: calc(100% - 12.5px);
  @media (max-width: 666px) {
    width: 100%;
  }
`;

export const ImgComponent = ({ srcProps, videoLoad }) => {
    // console.log(srcProps);
    var x = srcProps;
    // console.log("x");
    // console.log(x);
    var y = x.replace(
      /\?auto=&w=(800|1400|1600|2400|3600)&h=(800|1400|1600|2400|3600)/g,
      ""
    );
    // console.log("y");
    // console.log(y);
    return <SquareImage srcSet={y} />;
    //return <SquareImage src={srcProps} />;
  };