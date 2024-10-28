import React, { useEffect, useState, useRef, useCallback } from "react";
import { graphql, Link } from "gatsby";
import styled, { keyframes } from "styled-components";

const Selected = styled.h1`
  font-size: 24px;
  position: fixed;
  bottom: 0;
  z-index: 20000;
  left: 10px;
  mix-blend-mode: exclusion;
  color: white;
`;

const Archive = styled.h1`
  font-size: 24px;
  position: fixed;
  mix-blend-mode: exclusion;
  color: white;
  bottom: 0;
  z-index: 40000;
  text-align: center;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const Now = styled.h1`
  font-size: 24px;
  position: fixed;
  bottom: 0;
  z-index: 30000;
  right: 10px;
  mix-blend-mode: exclusion;
  color: white;
`;

export const NavSelected = ({ content, source }) => {
  console.log("hellow");

  return (
    <>
      <Link to="/">
        <Selected>Selected</Selected>
      </Link>
      <Link to="/projects_index_toggle">
        <Archive>Archive</Archive>
      </Link>
      <Link to="/now">
        <Now>Now</Now>
      </Link>
    </>
  );
};
