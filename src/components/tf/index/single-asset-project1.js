import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

const Grid16 = styled.div`
  display: grid;
  top: 12.5px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 12.5px;
  margin-left: 12.5px;
  grid-row-gap: 0;
  width: calc(100% - 25px);
  z-index: 20000;
  @media (max-width: 666px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const SingleImgProjectAssetCon = styled.div`
  grid-column: span 8;
  @media (max-width: 666px) {
    grid-column: span 4;
  }
  div {
    width: 100% !important;
  }
`;
const Counter = styled.p`
  margin-bottom: 5px;
`;
export const SingleAssetProject = ({ children }) => {
  return (
    <Grid16>
      <SingleImgProjectAssetCon>
        <Counter>01</Counter>
        {children}
      </SingleImgProjectAssetCon>
    </Grid16>
  );
};
