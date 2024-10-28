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
  background-color: blue;
  @media (max-width: 666px) {
    width: calc(100% - 20px);
    margin-left: 10px;
    top: 10px;
  }
`;
/* DESKTOP */
const LogoConCon = styled.div`
  grid-column: span 2;
  mix-blend-mode: exclusion;
  background-color: green;
`;
const MenuCon = styled.div`
  grid-column: 3 / span 2;
  mix-blend-mode: exclusion;
  background-color: orange;
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
  /* a:[aria-current] : {
    color: white;
  } */

  @media (max-width: 666px) {
    display: none;
  }
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
const LogoConMobile = styled.div`
  display: none;
  mix-blend-mode: exclusion;
  @media (max-width: 666px) {
    /* display: none; */
    display: block;
    width: calc(75% - 6.25px);
    margin-top: 14vh;
    margin-left: 10px;
    .shrink {
      width: calc(75% - 6.25px);
    }
  }
`;

export const NavIndexGrid = () => {
  let isPageWide = useMediaQuery("(min-width: 667px)");
  var [currentPage, setCurrentPage] = useState(null);
  const LogoConRef = useRef(null);

  useEffect(() => {
    var inputString = window.location.href;
    var outputString = inputString.replace(/.*\//, "");
    console.log(outputString);
    if (outputString == "project_index") {
      setCurrentPage(outputString);
    } else if (outputString == "office") {
      setCurrentPage(outputString);
    } else {
      setCurrentPage(null);
    }
  }, [setCurrentPage]);

  const handleScroll = () => {
    const position = window.pageYOffset;
    // console.log(position);
    if (position > 25) {
      // console.log("greater than 100");
      LogoConRef.current.classList.add("shrink");
    } else if (position < 25) {
      // console.log("less than 100");
      LogoConRef.current.classList.remove("shrink");
    }
  };
  // scroll use effect
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <MenuCon style={{ opacity: PageLoad ? 1 : 0 }}>
            <DesktopNavP>
              <Link to="/" className="selected">
                Select,{" "}
              </Link>
              <Link to="/project_index">Index, </Link>
              <Link to="/about">Abouut</Link>
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
              <MobileNavP className="selected">Selected</MobileNavP>
            </Link>
            <Link to="/project_index">
              <MobileNavP>Index</MobileNavP>
            </Link>
          </MobileLeftCol>

          <MobileRightCol>
            <Link to="/about">
              <MobileNavP>About</MobileNavP>
            </Link>
            <MobileNavP>Instagram</MobileNavP>
          </MobileRightCol>
        </LogoGridCon>
        <LogoConMobile ref={LogoConRef}>
          <Icon />
        </LogoConMobile>
      </>
    );
  }
};
