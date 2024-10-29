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
    overflow-x: clip;
    max-width: 100vw;
  }
  body {
    // https://stackoverflow.com/questions/47095596/body-overflow-x-hidden-breaks-position-sticky
    background-color: black;
    overflow-x: clip;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

  }
  p {
    letter-spacing: -0.2px;
  }
`;

/* BOTH */

/* DESKTOP */

const DesktopNavP = styled.p`
  color: #878787;
  mix-blend-mode: exclusion;
  a.selected {
    color: white;
  }
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

/* - - - - - - - top level container */
const MenuCon = styled.div`
  position: fixed;
  top: 12.5px;
  left: calc(50vw + 12px);
`;

const ProjectsCon = styled.div`
  display: block;
  float: left;
  position: fixed;
  z-index: 300;
  /* height: 100vh;
  width: 100vw; */
  bottom: 12.5px;
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
  }
`;
const IndexImg = styled.div`
  width: 100%;
  opacity: 0;
`;
const IndexBodyP = styled.p`
  color: white;
  font-size: 16px;
  opacity: 0.5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: -0.2px;
`;
const ProjectCon = styled.div`
  z-index: 3000;
  &:hover ${IndexImg} {
    opacity: 1;
  }
  &:hover ${IndexBodyP} {
    opacity: 1;
  }
  /* &:nth-child(1) .index_img {
    opacity: 1;
  } */
`;
const InformationCon = styled.div`
  height: 20px;
`;
const ImgSpacer = styled.div`
  grid-column: span 8;
  @media (max-width: 666px) {
    display: none;
  }
`;
const ProjectTitleCon = styled.div`
  grid-column: 9 / span 2;
  /* background-color: red; */
  @media (max-width: 666px) {
    grid-column: span 8;
  }
`;
const CategoryCon = styled.div`
  grid-column: 11 / span 3;
  /* background-color: blue; */
  @media (max-width: 666px) {
    grid-column: span 8;
  }
`;
const LocationCon = styled.div`
  grid-column: 14 / span 2;
  margin-top: -15px;
  /* background-color: green; */
  @media (max-width: 666px) {
    display: none;
  }
`;
const YearCon = styled.div`
  /* background-color: yellow; */
  grid-column: 16 / span 1;
  @media (max-width: 666px) {
    display: none;
  }
`;

const TableHeaderCon = styled.div``;

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
`;

const handlePosition = columnProp => {
  switch (columnProp) {
    case 1:
      return "1";
    case 2:
      return "2";
    case 3:
      return "3";
    case 4:
      return "4";
    case 5:
      return "5";
    case 6:
      return "6";
    case 7:
      return "7";
    case 8:
      return "8";
    case 9:
      return "9";
    case 10:
      return "10";
    case 11:
      return "11";
    case 12:
      return "12";
  }
};

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
`;

const SlideShowCon = styled.div``;
const ProjectIndex = ({ data }) => {
  let isPageWide = useMediaQuery("(min-width: 667px)");
  const LogoConRef = useRef(null);
  const [activeCategory, setCategory] = useState(null);
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

    if (isPageWide) {
      return (
        <>
          <>
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
          </>
        </>
      );
    }
    if (!isPageWide) {
      return (
        <>
          <>
            <MobileLeftCol>
              <Link to="">
                <MobileNavP
                  className={currentPage == "project_index" ? "selected" : ""}
                >
                  Index
                </MobileNavP>
              </Link>
            </MobileLeftCol>

            <MobileRightCol>
              <Link to="/about">
                <MobileNavP
                  className={currentPage == "about" ? "selected" : ""}
                >
                  About
                </MobileNavP>
              </Link>
              <MobileNavP>
                <Link target="_blank" to="https://www.instagram.com/tf.public/">
                  <span style={{ marginLeft: "0px" }}>Instagram</span>
                </Link>
              </MobileNavP>
            </MobileRightCol>
          </>
        </>
      );
    }
  };
  const projectIndexSelectArray = data.prismicProjectIndexSelect.data.project_relationship_group.map(
    (content, index) => {
      return { content };
    }
  );

  const activeIndexFunction = (e, index) => {
    console.log("Hello");
    e.persist();
    setActiveIndex(index);
  };

  const images = projectIndexSelectArray.map((content, index) => {
    const [imgState, setImgState] = useState(false);
    const videoRef = useRef(null);

    // console.log(
    //   content.content.project_relationship_field.document.data
    //     .index_image_column_start
    // );

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
    console.log(
      content.content.project_relationship_field.document.data
        .index_image_column_start
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
            <ProjectCon>
              <InformationCon>
                <Grid16>
                  <ImgSpacer></ImgSpacer>
                  <ProjectTitleCon
                    onMouseEnter={e => activeIndexFunction(e, index)}
                  >
                    <IndexBodyP>
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
                  <YearCon>
                    <IndexBodyP>
                      {" "}
                      {
                        content.content.project_relationship_field.document.data
                          .year.text
                      }
                    </IndexBodyP>
                  </YearCon>
                  <LocationCon>
                    <IndexBodyP>
                      {
                        content.content.project_relationship_field.document.data
                          .location.text
                      }
                    </IndexBodyP>
                  </LocationCon>
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
          <TheoFord />
          <S></S>
        </div>
        <div>
          <PortfolioForFigma />
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
        <p>1</p>
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
