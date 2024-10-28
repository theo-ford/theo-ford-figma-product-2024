import React, { useEffect, useState, useRef } from "react";
import { withPreview } from "gatsby-source-prismic";
import styled, { createGlobalStyle } from "styled-components";
import { useMediaQuery } from "../media-query";
import Icon from "../../../../assets/WhiteLogo.svg";
import { graphql, Link } from "gatsby";
import { PageLoad } from "../page-load";

/* BOTH */
const LogoGridCon = styled.div`
  width: calc(100% - 25px);
  margin-left: 12.5px;
  position: sticky;
  top: 12.5px;
  z-index: 300000;
  mix-blend-mode: exclusion;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 12.5px;
  @media (max-width: 666px) {
    width: calc(100% - 20px);
    margin-left: 10px;
    top: 10px;
    /* width: calc(100% - 2px);
    margin-left: 12.5px;
    top: 12.5px; */
  }
`;
/* DESKTOP */
const LogoConCon = styled.div`
  grid-column: span 1;
  mix-blend-mode: exclusion;
`;
const MenuCon = styled.div`
  grid-column: 3 / span 2;
  mix-blend-mode: exclusion;
`;
const LogoCon = styled.div`
  mix-blend-mode: exclusion;
  width: calc(100%);
  vertical-align: top;
  transition: all 2s;
  vertical-align: top;
`;
const DesktopNavP = styled.p`
  color: #878787;
  mix-blend-mode: exclusion;
  a.selected {
    color: white;
  }
  @media (max-width: 666px) {
    display: none;
  }

  &aria-current {
    color: white;
  }
  /* a {
    color: white;
  } */
`;

/* MOBILE */
const MobileLeftCol = styled.div`
  grid-column: span 2;
  mix-blend-mode: exclusion;
`;
const MobileRightCol = styled.div`
  grid-column: span 2;
  mix-blend-mode: exclusion;
`;
const MobileNavP = styled.p`
  display: none;
  color: #878787;
  mix-blend-mode: exclusion;
  &.selected {
    color: white;
  }
  @media (max-width: 666px) {
    display: block;
  }
`;

export const NavGrid = () => {
  let isPageWide = useMediaQuery("(min-width: 667px)");
  var [currentPage, setCurrentPage] = useState(null);
  const LogoConRef = useRef(null);

  useEffect(() => {
    var inputString = window.location.href;
    if (inputString.includes("project_index")) {
      setCurrentPage("project_index");
    } else if (inputString.includes("office")) {
      setCurrentPage("office");
    } else {
      setCurrentPage(null);
    }
  }, [setCurrentPage]);

  if (isPageWide) {
    return (
      <>
        <LogoGridCon style={{ opacity: PageLoad ? 1 : 0 }}>
          <LogoConCon>
            <LogoCon ref={LogoConRef}>
              <Link to="/">
                <Icon />
              </Link>
            </LogoCon>
          </LogoConCon>
          <MenuCon>
            <DesktopNavP>
              <Link
                to="/"
                className={currentPage == "project_index" ? "selected" : ""}
              >
                Index,{" "}
              </Link>
              <Link
                to="/about"
                className={currentPage == "about" ? "selected" : ""}
              >
                About
              </Link>
              {/* <br></br>Instagram, Twitter */}
            </DesktopNavP>
          </MenuCon>
        </LogoGridCon>
      </>
    );
  }
  if (!isPageWide) {
    return (
      <>
        <LogoGridCon>
          <MobileLeftCol>
            <Link to="/">
              <MobileNavP
                className={currentPage == "project_index" ? "selected" : ""}
              >
                Index
              </MobileNavP>
            </Link>
          </MobileLeftCol>

          <MobileRightCol>
            <Link to="/about">
              <MobileNavP className={currentPage == "about" ? "selected" : ""}>
                About
              </MobileNavP>
            </Link>
            <MobileNavP>
              <Link target="_blank" to="https://www.instagram.com/tf.public/">
                <span style={{ marginLeft: "0px" }}>Instagram</span>
              </Link>
            </MobileNavP>
          </MobileRightCol>
        </LogoGridCon>
      </>
    );
  }
};
