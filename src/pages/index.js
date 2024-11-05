import React, { useRef, useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { Helmet } from "react-helmet";
import { useMediaQuery } from "../components/tf/media-query";
import TheoFord from "../../assets/TheoFord.svg";
import S from "../../assets/S.svg";
import PortfolioForFigma from "../../assets/PortfolioForFigma.svg";

const fadeOut = keyframes`
  0% {
    opacity: 1
  }
  100% {
    opacity: 0;
  }
`;

const blackToWhite = keyframes`
  0% {
    background-color: black;
;  }
  100% {
    background-color: white;
  }
`;

const GlobalStyle = createGlobalStyle`
  html {
    background-color: white;
  }

  body {
    /* background-color: white; */
    overflow-x: clip;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  p {
    letter-spacing: -0.2px;
  }
  /* @media not all and (hover: none) {
  } */
  @media (hover:none) {
    body {
      /* background: black; */
      max-width: 100vw;
      /* height: 200vh; */
      overflow: scroll;
    }
  }
  @media (max-width: 1024px) {
    html {
      width: 100vw;
      overflow-x: hidden;
    }
    body {
      width: 100vw;
      overflow-x: hidden;
    }
    
  }
`;
const whiteToBlack = keyframes`
  0% {
    background-color: white
;  }
  100% {
    background-color: black
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1;
  }
`;
const BackgroundCon = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0%;
  background-color: black;

  animation-name: ${whiteToBlack};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
`;
/* - - - - - - - navigation */
const MenuCon = styled.div`
  position: fixed;
  top: 12.5px;
  left: calc(50vw + 12px);
  z-index: 50000;

  animation-name: ${fadeIn};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;

  @media (max-width: 1024px) {
    left: calc(50vw + 7px);
  }
  @media (max-width: 666px) {
    left: 10px;
    width: 100%;
    top: 10px;
    width: calc(100vw - 20px);
  }
`;
const DesktopNavP = styled.p`
  color: #878787;
  mix-blend-mode: exclusion;
  a.selected {
    color: white;
  }
`;

const PageTitleCon = styled.div`
  position: fixed;
  top: 12.5px;
  left: 12.5px;
  div {
    display: block;
  }
  @media (max-width: 1024px) {
    position: relative;
  }
  svg.s {
    animation-name: ${fadeIn};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  }
  svg.portfolio_for_figma {
    animation-name: ${fadeIn};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  }
  @media (max-width: 666px) {
    margin-top: 200px;
    position: relative;
    svg.theo_ford {
      height: 35px;
      margin-left: -108px;
    }
    svg.s {
      height: 35px;
      margin-left: -119px;
    }
    svg.portfolio_for_figma {
      height: 45px;
      margin-left: -185px;
    }
  }
`;

/* - - - - - - - ?????? */
const ProjectsCon = styled.div`
  display: block;
  float: left;
  position: fixed;
  z-index: 300;
  width: 100%;
  bottom: 12.5px;

  animation-name: ${fadeIn};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  @media (hover: none) {
    position: relative;
  }
`;

/* - - - - - - - content renders dependent on screen size */
const DesktopTableCon = styled.div`
  z-index: 3000;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (max-width: 1024px) {
    display: none;
  }
  @media (max-width: 666px) {
    display: none;
  }
`;

const TabletTableCon = styled.div`
  display: none;
  z-index: 3000;
  @media (max-width: 1024px) {
    display: block;
    margin-top: 400px;
    display: grid;
    top: 12.5px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 12.5px;
    margin-left: 12.5px;
    grid-row-gap: 0;
    width: calc(100% - 25px);
    z-index: 20000;
  }
  @media (max-width: 666px) {
    display: none;
  }
`;

const MobileTableCon = styled.div`
  display: none;
  z-index: 3000;
  @media (max-width: 1024px) {
    display: none;
  }
  @media (max-width: 666px) {
    display: block;
    margin-top: 200px;
    display: block;
    display: grid;
    top: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 10px;
    margin-left: 10px;
    grid-row-gap: 0;
    width: calc(100% - 20px);
    z-index: 20000;
  }
`;

/* - - - - - - - desktop : image hover */
const ImgConConCon = styled.div`
  display: block;
  float: left;
  position: fixed;
  z-index: 00;
  width: 100%;
  height: 100vh;
  @media (max-width: 666px) {
    display: none;
  }
`;
const ImgConCon = styled.div`
  position: relative;
  float: left;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 12.5px;
  margin-left: 12.5px;
  grid-row-gap: 0;
  width: calc(100% - 25px);
  display: grid;
  height: 100vh;
  width: 100vw;
  align-items: center;

  /* background-color: red; */
`;

const Grid16 = styled.div`
  display: grid;
  top: 12.5px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 12.5px;
  margin-left: 12.5px;
  grid-row-gap: 0;
  width: calc(100% - 25px);
  z-index: 20000;
  @media (max-width: 1025px) {
    width: calc(100% - 20px);
    margin-left: 10px;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 666px) {
    width: calc(100% - 20px);
    margin-left: 10px;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const TableHeaderCon = styled.div`
  @media (hover: none) {
    display: none;
  }
`;

const InformationCon = styled.div`
  height: 20px;
`;

const ProjectTitleCon = styled.div`
  grid-column: 9 / span 2;
  /* background-color: red; */
  @media (max-width: 1025px) {
    display: none;
  }
  @media (max-width: 666px) {
    grid-column: 1 / span 2;
  }
`;

const CategoryCon = styled.div`
  grid-column: 11 / span 3;
`;

const LocationCon = styled.div`
  grid-column: 14 / span 2;
  margin-top: -15px;
  @media (max-width: 1025px) {
    display: none;
  }
  @media (max-width: 666px) {
    grid-column: 3 / span 2;
    margin-top: 0px;
  }
`;

const YearCon = styled.div`
  grid-column: 16 / span 1;
  @media (max-width: 1025px) {
    display: none;
  }
  @media (max-width: 666px) {
    grid-column: 3 / span 2;
    margin-top: -10px;
  }
`;

const ImgCon = styled.div`
  display: none;
  grid-column: ${props => {
    const column = props.columnProp;

    if (column === "1") {
      return "1 / span 4";
    } else if (column === "2") {
      return "2 / span 4";
    } else if (column === "3") {
      return "3 / span 4";
    } else if (column === "4") {
      return "4 / span 4";
    } else if (column === "5") {
      return "5 / span 4";
    } else if (column === "6") {
      return "6 / span 4";
    } else if (column === "7") {
      return "7 / span 4";
    } else if (column === "8") {
      return "9 / span 4";
    } else if (column === "9") {
      return "9 / span 4";
    } else if (column === "10") {
      return "10 / span 4";
    } else if (column === "11") {
      return "11 / span 4";
    } else if (column === "12") {
      return "12 / span 4";
    } else if (column === "13") {
      return "13 / span 4";
    }
  }};
  /* grid-column: 9 / span 4; */

  ${({ activeProp }) =>
    activeProp &&
    `
    display: block;  
  `}
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (hover: none) {
    display: none;
  }
`;

/* - - - - - - - tablet */

const TabletIndexNum = styled.div`
  p {
    font-size: 85px;
    color: white;

    font-family: "HelveticaNowDisplay";
    font-weight: bold;
  }
`;
const TabletImage = styled.div`
  margin-bottom: 5px;
`;

const TabletTitle = styled.div`
  width: 50%;
  display: inline-block;
  float: left;
`;

const TabletLocationYear = styled.div`
  width: 50%;
  display: inline-block;
  float: left;
  padding-left: 6px;
`;

/* - - - - - - - mobile */

const MobileIndexNum = styled.div`
  p {
    font-size: 50px;
    color: white;

    font-family: "HelveticaNowDisplay";
    font-weight: bold;
  }
`;
const MobileImage = styled.div`
  margin-bottom: 5px;
`;

const MobileTitle = styled.div`
  width: 50%;
  display: inline-block;
  float: left;
`;

const MobileLocationYear = styled.div`
  width: 50%;
  display: inline-block;
  float: left;
  padding-left: 5px;
`;

/* - - - - - - - unviersal between screen sizes */
const ProjectCon = styled.div`
  z-index: 3000;

  opacity: ${props => {
    const activeProject = props.activeProject;
    const index = props.projectIndex;

    if (activeProject === index) {
      return "1";
    } else {
      return "0.5";
    }
  }};

  @media (max-width: 1024px) {
    grid-column: span 4;
    margin-bottom: 120px;
  }
  @media (max-width: 666px) {
  }
`;

const IndexBodyP = styled.p`
  color: white;
  font-size: 16px;
  /* opacity: 0.5; */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: -0.2px;
`;

const IndexTitleP = styled.p`
  font-size: 12px;
  opacity: 0.5;
  color: white;
  letter-spacing: -0.3px;
`;

const CategoryName = styled.span`
  text-transform: capitalize;
  font-size: 16px;
  letter-spacing: -0.3px;
`;

const NumCon = styled.div`
  p {
    font-size: 100px;
    color: white;
    font-family: "HelveticaNowDisplay";
    font-weight: bold;
  }

  animation-name: ${fadeIn};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  position: fixed;
  bottom: 12.5px;
  left: 12.5px;
  @media (hover: none) {
    display: none;
  }
`;

const SlideShowCon = styled.div``;
const ProjectIndex = ({ data }) => {
  let isMobile = useMediaQuery("(min-width: 667px)");
  let isTablet = useMediaQuery("(min-width: 667px)");
  const [activeCategory, setCategory] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(() => {
  //   console.log(activeIndex);
  // }, [activeIndex]);

  const Nav = () => {
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

    return (
      <MenuCon>
        <DesktopNavP>
          <Link to="/" className="selected">
            Index,{" "}
          </Link>
          <Link to="/resume">Resume, </Link>
          <Link
            to="/about"
            className={currentPage == "about" ? "selected" : ""}
          >
            About
          </Link>
        </DesktopNavP>
      </MenuCon>
    );
  };
  const projectIndexSelectArray = data.prismicProjectIndexSelect.data.project_relationship_group.map(
    (content, index) => {
      return { content };
    }
  );

  const activeIndexFunction = (e, index) => {
    e.persist();
    setActiveIndex(index);
  };

  const images = projectIndexSelectArray.map((content, index) => {
    const [imgState, setImgState] = useState(false);

    useEffect(() => {
      if (activeIndex === index) {
        setImgState(true);
      } else {
        setImgState(false);
      }
    }, [activeIndex]);

    var index_image = getImage(
      content.content.project_relationship_field.document.data.index_preview_img
    );

    return (
      <>
        <ImgCon
          columnProp={
            content.content.project_relationship_field.document.data
              .index_image_column_start
          }
          activeProp={imgState}
        >
          <GatsbyImage image={index_image} />
        </ImgCon>
      </>
    );
  });

  const desktopProjects = projectIndexSelectArray.map((content, index) => {
    var index_image = getImage(
      content.content.project_relationship_field.document.data.index_preview_img
    );
    return (
      <>
        <Link
          to={`/${content.content.project_relationship_field.document.uid}`}
        >
          <ProjectCon activeProject={activeIndex} projectIndex={index}>
            <InformationCon>
              <Grid16>
                <ProjectTitleCon
                  onMouseEnter={e => activeIndexFunction(e, index)}
                >
                  <IndexBodyP activeProject={activeIndex}>
                    {
                      content.content.project_relationship_field.document.data
                        .project_title.text
                    }
                  </IndexBodyP>
                </ProjectTitleCon>
                <CategoryCon>
                  <IndexBodyP>
                    {" "}
                    {content.content.project_relationship_field.document.data.categories.map(
                      (category, index) => {
                        return (
                          <CategoryName key={index}>
                            {(index ? ", " : "") + category.category.slug}
                          </CategoryName>
                        );
                      }
                    )}
                  </IndexBodyP>
                </CategoryCon>
                <LocationCon>
                  <IndexBodyP>
                    {
                      content.content.project_relationship_field.document.data
                        .location.text
                    }
                  </IndexBodyP>
                </LocationCon>
                <YearCon>
                  <IndexBodyP>
                    {" "}
                    {
                      content.content.project_relationship_field.document.data
                        .year.text
                    }
                  </IndexBodyP>
                </YearCon>
              </Grid16>
            </InformationCon>
          </ProjectCon>
        </Link>
      </>
    );
  });

  const tabletProjects = projectIndexSelectArray.map((content, index) => {
    var index_image = getImage(
      content.content.project_relationship_field.document.data.index_preview_img
    );
    return (
      <ProjectCon>
        <Link
          to={`/${content.content.project_relationship_field.document.uid}`}
        >
          <>
            <TabletIndexNum>
              <p>{index + 1}</p>
            </TabletIndexNum>
            <TabletImage>
              <GatsbyImage image={index_image} />
            </TabletImage>

            <TabletTitle>
              <IndexBodyP>
                {
                  content.content.project_relationship_field.document.data
                    .project_title.text
                }
              </IndexBodyP>
            </TabletTitle>
            <TabletLocationYear>
              <IndexBodyP>
                {
                  content.content.project_relationship_field.document.data
                    .location.text
                }
                <br></br>
                {
                  content.content.project_relationship_field.document.data.year
                    .text
                }
              </IndexBodyP>
            </TabletLocationYear>
          </>
        </Link>
      </ProjectCon>
    );
  });

  const mobileProjects = projectIndexSelectArray.map((content, index) => {
    var index_image = getImage(
      content.content.project_relationship_field.document.data.index_preview_img
    );
    return (
      <ProjectCon>
        <Link
          to={`/${content.content.project_relationship_field.document.uid}`}
        >
          <MobileIndexNum>
            <p>{index + 1}</p>
          </MobileIndexNum>
          <MobileImage>
            <GatsbyImage image={index_image} />
          </MobileImage>
          <MobileTitle>
            <IndexBodyP>
              {
                content.content.project_relationship_field.document.data
                  .project_title.text
              }
            </IndexBodyP>
          </MobileTitle>
          <MobileLocationYear>
            <IndexBodyP>
              {
                content.content.project_relationship_field.document.data
                  .location.text
              }
              <br></br>
              {
                content.content.project_relationship_field.document.data.year
                  .text
              }
            </IndexBodyP>
          </MobileLocationYear>
        </Link>
      </ProjectCon>
    );
  });

  return (
    <>
      <GlobalStyle />
      <Helmet>
        <title>Theo Ford – Index</title>
      </Helmet>
      <BackgroundCon>
        <Nav></Nav>

        <PageTitleCon>
          <div>
            <TheoFord className="theo_ford" />
            <S className="s"></S>
          </div>
          <div>
            <PortfolioForFigma className="portfolio_for_figma" />
          </div>
        </PageTitleCon>

        <ProjectsCon>
          <TableHeaderCon>
            <Grid16>
              <ProjectTitleCon>
                <IndexTitleP>Project</IndexTitleP>
              </ProjectTitleCon>
              <CategoryCon>
                <IndexTitleP>Category</IndexTitleP>
              </CategoryCon>
              <YearCon>
                <IndexTitleP>Year</IndexTitleP>
              </YearCon>
              <LocationCon>
                <IndexTitleP>Location</IndexTitleP>
              </LocationCon>
            </Grid16>
          </TableHeaderCon>
          <DesktopTableCon>{desktopProjects}</DesktopTableCon>
          <TabletTableCon>{tabletProjects}</TabletTableCon>
          <MobileTableCon>{mobileProjects}</MobileTableCon>
        </ProjectsCon>
        <ImgConConCon>
          <ImgConCon>{images}</ImgConCon>
        </ImgConConCon>

        <NumCon>
          <p>{activeIndex + 1}</p>
        </NumCon>
      </BackgroundCon>
    </>
  );
};

export default withPrismicPreview(ProjectIndex);

export const query = graphql`
  query ProjectIndexSelectQuery120 {
    prismicProjectIndexSelect {
      data {
        project_relationship_group {
          project_relationship_field {
            document {
              ... on PrismicProjectDesktop {
                id
                type
                uid
                data {
                  categories {
                    category {
                      slug
                      id
                    }
                  }
                  project_title {
                    text
                  }
                  year {
                    text
                  }
                  client {
                    text
                  }
                  location {
                    text
                  }
                  sector {
                    text
                  }
                  index_preview_img {
                    gatsbyImageData
                  }
                  index_image_column_start
                }
              }
            }
          }
        }
      }
    }
    allPrismicCategory {
      edges {
        node {
          data {
            name
          }
        }
      }
    }
  }
`;
