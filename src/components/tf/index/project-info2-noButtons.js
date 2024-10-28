import styled, { createGlobalStyle, keyframes } from "styled-components";
import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import { graphql, Link, useScrollRestoration } from "gatsby";
import { useMediaQuery } from "../media-query";

/* - - - - - PROJECT INFO - - - - - */
const Grid16 = styled.div`
  display: grid;
  /* top: 12.5px; */
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 12.5px;
  margin-left: 12.5px;
  grid-row-gap: 0;
  width: calc(100% - 25px);
  z-index: 20000;
  @media (max-width: 666px) {
    width: calc(100% - 20px);
    margin-left: 10px;
    margin-bottom: 10px;
  }
`;
const Grid2 = styled.div`
  display: grid;
  top: 12.5px;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  margin-left: 10px;
  grid-row-gap: 0;
  width: calc(100% - 20px);
  z-index: 20000;
  margin-bottom: 8px;
`;

const ProjectInfoCon = styled.div`
  height: 80px;
  margin-top: 8px;
  @media (max-width: 666px) {
    margin-top: 4px;
  }
`;
const ProjectTitleCon = styled.div`
  grid-column: span 4;
  a {
    /* color: #878787; */
    /* color: #0047ff; */
  }
  @media (max-width: 666px) {
    grid-column: span 1;
    a {
      color: #878787;
      /* color: #0047ff; */
    }
  }
`;
const ProjectLocationYearCon = styled.div`
  grid-column: span 4;
  @media (max-width: 666px) {
    grid-column: span 1;
  }
`;

const ProjectIndexAbout = styled.div`
  grid-column: span 4;
  p {
    font-size: 12px;
  }
  @media (max-width: 666px) {
    display: none;
  }
`;
const ProjectLink = styled.div`
  grid-column: 15 / span 2;
  a {
    color: #878787 !important;
  }
  @media (max-width: 666px) {
    display: none;
  }
`;
const MoreButtonCon = styled.div`
  grid-column: 15 / span 1;
`;
const MoreButtonConP = styled.div`
  cursor: pointer;
  /* background-color: #c0baba;
  border-radius: 6px; */
  /* opacity: 0.5; */
  p {
    color: white;
    font-size: 16px;
    padding: 2px;
    padding-left: 4px;
    color: #878787;
  }
`;

export const ProjectInfo2NoButtons = ({ data2, uid }) => {
  let isPageWide = useMediaQuery("(min-width: 667px)");
  if (isPageWide) {
    return (
      <ProjectInfoCon>
        <Grid16>
          <ProjectTitleCon>
            <Link to={uid}>
              <p>
                {data2.project_title.text}
                <br></br>
                {data2.show_client_on_index ? (
                  <span>{data2.client.text}</span>
                ) : (
                  ""
                )}
              </p>
            </Link>
          </ProjectTitleCon>
          <ProjectLocationYearCon>
            <p>{data2.location.text}</p>
            <p>{data2.year.text}</p>
          </ProjectLocationYearCon>
          <ProjectIndexAbout>
            <p>{data2.homepage_intro.text}</p>
          </ProjectIndexAbout>
          <MoreButtonCon>
            <MoreButtonConP>
              <Link to={uid}>
                <p>More</p>
              </Link>
            </MoreButtonConP>
          </MoreButtonCon>
        </Grid16>
      </ProjectInfoCon>
    );
  } else {
    return (
      <ProjectInfoCon>
        <Grid2>
          <ProjectTitleCon>
            <Link to={uid}>
              <p>
                {data2.project_title.text}
                <br></br>
                {data2.show_client_on_index ? (
                  <span>{data2.client.text}</span>
                ) : (
                  ""
                )}
              </p>
            </Link>
          </ProjectTitleCon>
          <ProjectLocationYearCon>
            <p>{data2.location.text}</p>
            <p>{data2.year.text}</p>
          </ProjectLocationYearCon>
        </Grid2>
      </ProjectInfoCon>
    );
  }
};
