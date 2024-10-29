import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import ReactDOM, { findDOMNode } from "react-dom";
import { graphql, Link, useScrollRestoration } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { ImageOrientation } from "../components/utils/image-orientation";
import { Helmet } from "react-helmet";
import { useMediaQuery } from "../components/tf/media-query";
import Icon from "../../assets/WhiteLogo.svg";
import TheoFord from "../../assets/TheoFord.svg";
import S from "../../assets/S.svg";
import PortfolioForFigma from "../../assets/PortfolioForFigma.svg";
// import PlayButton from "../../assets/Logo.jpg";
// import PlayButton from "../../public/icons/logo.jpg";
import { NavGrid } from "../components/tf/nav-grid/nav";
// import Icon from "../../assets/WhiteLogo.svg";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: black;
  }
  body {
    background-color: black;
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
      background: black;
      max-width: 100vw;
      /* height: 200vh; */
      overflow: scroll;
    }
  }
`;

/* DESKTOP */

const DesktopNavP = styled.p`
  color: #878787;
  mix-blend-mode: exclusion;
  a.selected {
    color: white;
  }
`;

/* - - - - - - - top level container */
const MenuCon = styled.div`
  position: fixed;
  top: 12.5px;
  left: calc(50vw + 12px);
  z-index: 50000;
  @media (max-width: 666px) {
    left: 10px;
    width: 100%;
    top: 10px;
  }
`;

const ProjectsCon = styled.div`
  display: block;
  float: left;
  position: fixed;
  z-index: 300;
  width: 100%;
  /* height: 100vh;
  width: 100vw; */
  bottom: 12.5px;
  @media (max-width: 666px) {
    position: relative;
  }
`;

const ImgConConCon = styled.div`
  display: block;
  float: left;
  position: fixed;
  z-index: 00;
  width: 100%;
  height: 100vh;
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

/* - - - - - - - other page stuff */
const TableCon = styled.div`
  z-index: 3000;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (max-width: 666px) {
    margin-top: 200px;
  }
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
  @media (max-width: 666px) {
    width: calc(100% - 20px);
    margin-left: 10px;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const IndexImg = styled.div`
  width: 100%;
  opacity: 0;
`;
const IndexBodyP = styled.p`
  color: white;
  font-size: 16px;
  /* opacity: 0.5; */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: -0.2px;

  /* @media (hover) {
    color: red;
  } */
`;
const ProjectCon = styled.div`
  z-index: 3000;
  /* opacity: 0.5; */

  
  opacity: ${props => {
    console.log("hello");
    const activeProject = props.activeProject;
    const index = props.projectIndex;

    if (activeProject === index) {
      return "1";
    } else {
      return "0.5";
    }
  }};

  /* &:hover ${IndexBodyP} {
    opacity: 1;
  } */
  
    // ${({ activeProject }) => activeProject && console.log(activeProject)}
    
    @media (hover: none) {
      opacity: 1;
      /* height: 500px; */
      margin-top: 200px;
    }
`;
const InformationCon = styled.div`
  height: 20px;
  @media (hover: none) {
    height: auto;
  }
`;
const ImgSpacer = styled.div`
  grid-column: span 8;
  @media (max-width: 666px) {
    display: none;
  }
`;
const MobileIndexNumberCon = styled.div`
  display: none;
  p {
    font-size: 50px;
    color: white;
    font-family: "HelveticaNowDisplay";
    font-weight: bold;
  }
  margin-bottom: -5px;
  @media (hover: none) {
    grid-column: span 4;
    display: block;
  }
`;
const MobileProjectImgCon = styled.div`
  display: none;
  grid-column: span 4;
  @media (hover: none) {
    display: block;
  }
`;
const ProjectTitleCon = styled.div`
  grid-column: 9 / span 2;
  /* background-color: red; */
  @media (max-width: 666px) {
    grid-column: 1 / span 2;
  }
`;
const CategoryCon = styled.div`
  grid-column: 11 / span 3;
  @media (hover: none) {
    display: none;
  }
`;
const LocationCon = styled.div`
  grid-column: 14 / span 2;
  margin-top: -15px;
  /* background-color: green; */
  @media (max-width: 666px) {
    grid-column: 3 / span 2;
    margin-top: 0px;
  }
`;
const YearCon = styled.div`
  /* background-color: yellow; */
  grid-column: 16 / span 1;
  @media (max-width: 666px) {
    grid-column: 3 / span 2;
    margin-top: -10px;
  }
`;

const TableHeaderCon = styled.div`
  @media (hover: none) {
    display: none;
  }
`;

const IndexTitleP = styled.p`
  font-size: 12px;
  opacity: 0.5;
  color: white;
  letter-spacing: -0.3px;
`;

const CategoryItem = styled.span`
  font-size: 16px;
  color: #878787;
  &.active {
    color: white;
  }
`;
const CategoryName = styled.span`
  text-transform: capitalize;
  font-size: 16px;
  letter-spacing: -0.3px;
`;
const PageTitleCon = styled.div`
  position: fixed;
  top: 12.5px;
  left: 12.5px;
  div {
    display: block;
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
const NumCon = styled.div`
  p {
    font-size: 100px;
    color: white;
    font-family: "HelveticaNowDisplay";
    font-weight: bold;
  }
  position: fixed;
  bottom: 12.5px;
  left: 12.5px;
  @media (hover: none) {
    display: none;
  }
`;

const ImgCon = styled.div`
  /* grid-column: span 4; */
  /* grid-column-start: 8; */
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

const SlideShowCon = styled.div``;
const ProjectIndex = ({ data }) => {
  let isPageWide = useMediaQuery("(min-width: 667px)");
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

  const organisedArrayMap = projectIndexSelectArray
    .filter(project => {
      if (activeCategory === null) {
        return project;
      } else {
        return project.content.project_relationship_field.document.data.categories
          .map(category => textTransfrom(category.category.slug))
          .includes(activeCategory);
      }
    })
    .map((content, index) => {
      var index_image = getImage(
        content.content.project_relationship_field.document.data
          .index_preview_img
      );
      return (
        <>
          <Link
            to={`/${content.content.project_relationship_field.document.uid}`}
          >
            <ProjectCon activeProject={activeIndex} projectIndex={index}>
              <InformationCon>
                <Grid16>
                  <MobileIndexNumberCon>
                    <p>{index + 1}</p>
                  </MobileIndexNumberCon>
                  <MobileProjectImgCon>
                    <GatsbyImage image={index_image} />
                  </MobileProjectImgCon>
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

  function textTransfrom(y) {
    return y.replace("-", " ").replace(/(?:^|\s)\S/g, a => a.toUpperCase());
  }

  const Categories = () => {
    return (
      <>
        <CategoryItem
          onClick={() => setCategory(null)}
          className={activeCategory === null ? `active` : ``}
        >
          All,{" "}
        </CategoryItem>

        {categoriesList}
      </>
    );
  };

  const categoriesList = data.allPrismicCategory.edges.map((content, index) => {
    return (
      <>
        <CategoryItem>{index ? ", " : ""}</CategoryItem>

        <CategoryItem
          className={activeCategory === content.node.data.name ? `active` : ``}
          key={index}
          onClick={() => {
            setCategory(content.node.data.name);
          }}
        >
          {content.node.data.name}
        </CategoryItem>
      </>
    );
  });

  return (
    <>
      <GlobalStyle />
      <Helmet>
        <title>Theo Ford – Index</title>
      </Helmet>

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
            <ImgSpacer></ImgSpacer>
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
        <TableCon>{organisedArrayMap}</TableCon>
      </ProjectsCon>
      <ImgConConCon>
        <ImgConCon>{images}</ImgConCon>
      </ImgConConCon>

      <NumCon>
        <p>{activeIndex + 1}</p>
      </NumCon>
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
