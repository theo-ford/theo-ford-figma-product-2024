import React, { useEffect, useState, useRef } from "react";
import { graphql, Link } from "gatsby";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { Helmet } from "react-helmet";
import { ImageOrientation } from "../components/utils/image-orientation";
import styled, { createGlobalStyle } from "styled-components";
import { useMediaQuery } from "../components/tf/media-query";
import Icon from "../../assets/WhiteLogo.svg";
import { AutoPlayVideo } from "../components/tf/autoplay-video";
import { NavGrid } from "../components/tf/nav-grid/nav";
import { PageLoad } from "../components/tf/page-load";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { VideoProjectPage } from "../components/tf/project/video-project-page";
import Logo from "../../assets/WhiteLogo.svg";
import { AutoPlayVideoOriginalAuto } from "../components/tf/autoplay-video-OriginalAuto";

const GlobalStyle = createGlobalStyle`
  p {
    letter-spacing: -0.2px;
  }
  body {
    width: calc(100vw);
    overflow-x: hidden;
  }
  
`;
const PageConCon = styled.div`
  width: calc(100% - 25px);
  margin: 12.5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 1 */ 1fr 1fr 1fr 1fr /* 2 */ 1fr 1fr 1fr 1fr /* 3 */ 1fr 1fr 1fr 1fr /* 4 */;
  grid-gap: 12.5px;
  @media (max-width: 666px) {
    /* width: calc(100% - 25px);
    margin-left: 12.5px;
    top: 10px; */
    width: calc(100% - 20px);
    margin-left: 10px;
    top: 10px;
    grid-gap: 10px;
  }
`;
const LogoTitleCon = styled.div`
  position: sticky;
  top: 12.5px;
  z-index: 300000;
  width: calc(100% - 25px);
  margin-left: 12.5px;
  mix-blend-mode: exclusion;
  p {
    display: inline-block;
    float: left;
    position: relative;
    color: white;
    /* margin-left: 63px; */
  }
`;
const LogoCon = styled.div`
  mix-blend-mode: exclusion;
  display: inline-block;
  width: calc(65px);
  top: 0;
  float: left;
  position: relative;
`;
const MenuCon = styled.div`
  mix-blend-mode: exclusion;
  z-index: 300000;
  margin-left: calc(50% + 6.5px);
  position: sticky;
  top: 12.5px;
  width: 30%;
`;

const DesktopNavP = styled.p`
  color: #878787;
  mix-blend-mode: exclusion;
`;
const PaginationCon = styled.div`
  mix-blend-mode: exclusion;
  z-index: 300000;
  margin-right: calc(12.5px);
  float: right;
  position: sticky;
  top: 12.5px;
  margin-top: -4px;
  p {
    color: white;
  }
`;
const PageCon = styled.div``;

const IntroCon = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 1 */ 1fr 1fr 1fr 1fr /* 2 */ 1fr 1fr 1fr 1fr /* 3 */ 1fr 1fr 1fr 1fr /* 4 */;
  grid-gap: 12.5px;
  width: calc(100% - 25px);
  margin-left: 12.5px;
  align-items: center;
  height: 70vh;
`;
const IntroTextCon = styled.div`
  grid-column: span 8;
  p {
    font-size: 24px;
  }
`;
const CategoryName = styled.span`
  text-transform: capitalize;
`;
const MetaCon = styled.div`
  height: auto;
  width: calc(100% - 25px);
  margin-left: 12.5px;
  /* background-color: red; */
  margin-bottom: 10px;
`;
const Grid16 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 1 */ 1fr 1fr 1fr 1fr /* 2 */ 1fr 1fr 1fr 1fr /* 3 */ 1fr 1fr 1fr 1fr /* 4 */;
  grid-gap: 12.5px;
  width: calc(100% - 25px);
  margin-left: 12.5px;
`;
const BodyTextCon = styled.div`
  grid-column: span 16;
  p {
    width: calc(50% - 6.25px);
    margin-left: calc(50% + 6.25px);
    font-size: 24px;
  }
  margin-top: ${props => {
    const test = props.RowMarginTop;
    if (test === "120px") {
      return "120px";
    } else {
      return "0px";
    }
  }};
`;

const FullBleedImgCon = styled.div`
  grid-column: span 16;
  width: calc(100% + 25px);
  margin-left: -12.5px;
`;
const FullBleedImgConCon = styled.div`
  width: ${props => {
    const columnWidth = props.columnWidth;

    if (columnWidth === "16") {
      return "100%";
    } else if (columnWidth === "8") {
      return "calc(50% - 6.5px)";
    }
  }};

  margin-left: ${props => {
    const columnStart = props.columnStart;

    if (columnStart === "0") {
      return "0%";
    } else if (columnStart === "8") {
      return "calc(50% + 6.5px)";
    }
  }};
`;
const SquareImgCon = styled.div`
  margin-top: ${props => {
    const rowMarginTop = props.RowMarginTop;
    const imgMarginTop = props.ImgMarginTop;

    if (rowMarginTop === "120px" && imgMarginTop === "0vw") {
      return "120px";
    } else if (rowMarginTop === "120px" && imgMarginTop === "12.5vw") {
      return "calc(12.5vw + 120px)";
    } else if (rowMarginTop === "120px" && imgMarginTop === "25vw") {
      return "calc(25vw + 120px)";
    } else if (rowMarginTop === "0px" && imgMarginTop === "12.5vw") {
      return "calc(12.5vw)";
    } else if (rowMarginTop === "0px" && imgMarginTop === "25vw") {
      return "calc(25vw)";
    }
  }};

  grid-column: ${props => {
    const columnWidth = props.columnWidth;
    const columnStart = props.columnStart;

    if (columnWidth === "8" && columnStart === "0") {
      return "1 / span 8";
    } else if (columnWidth === "8" && columnStart === "4") {
      return "5 / span 8";
    } else if (columnWidth === "8" && columnStart === "8") {
      return "9 / span 8";
    } else if (columnWidth === "4" && columnStart === "0") {
      return "1 / span 4";
    } else if (columnWidth === "4" && columnStart === "4") {
      return "5 / span 4";
    } else if (columnWidth === "4" && columnStart === "8") {
      return "9 / span 4";
    } else if (columnWidth === "4" && columnStart === "12") {
      return "13 / span 4";
    }
  }};

  /* margin-top: calc(10vw + 100px); */
`;

const Caption = styled.div`
  width: 100%;
  margin-top: 6px;
  p {
    max-width: 50vw;
    font-size: ${props => {
      const captionFontSize = props.CaptionFontSize;

      if (captionFontSize === "16px") {
        return "16px";
      } else if (captionFontSize === "12px") {
        return "12px";
      }
    }};
    margin-top: ${props => {
      const captionFontSize = props.CaptionFontSize;

      if (captionFontSize === "16px") {
        return "6px";
      } else if (captionFontSize === "12px") {
        return "8px";
      }
    }};
  }
`;

const BlackFilmsModuleCon = styled.div`
  grid-column: span 16;
  width: calc(100% + 25px);
  margin-left: -12.5px;
  background-color: black;
  height: 110vh;
  margin-top: ${props => {
    const test = props.RowMarginTop;
    if (test === "120px") {
      return "120px";
    } else {
      return "0px";
    }
  }};
`;
const BlackFilmsModuleConCon = styled.div`
  width: ${props => {
    const columnWidth = props.columnWidth;

    if (columnWidth === "16") {
      return "100%";
    } else if (columnWidth === "8") {
      return "calc(50% - 6.5px)";
    }
  }};

  margin-left: ${props => {
    const columnStart = props.columnStart;

    if (columnStart === "0") {
      return "0%";
    } else if (columnStart === "8") {
      return "calc(50% + 6.5px)";
    }
  }};
`;

const MoreProjects = styled.div`
  grid-template-columns: 1fr 1fr 1fr 1fr /* 1 */ 1fr 1fr 1fr 1fr /* 2 */ 1fr 1fr 1fr 1fr /* 3 */ 1fr 1fr 1fr 1fr /* 4 */;
  grid-gap: 12.5px;
  width: calc(100% - 25px);
  display: grid;
  margin-top: 120px;
  margin-left: 12.5px;
  margin-bottom: 120px;

  div {
    grid-column: span 4;
    /* display: inline-block;
    float: left;
    position: relative;
    width: 25%; */
  }
  p {
    /* font-size: 100px; */
  }

  /* font-weight: bold;
  font-family: "HelveticaNowDisplay"; */
  img {
    width: 100%;
  }
  p.header {
    padding-bottom: 6px;
    font-size: 24px;
  }
  p.project_title {
    opacity: 50%;
    padding-top: 6px;
    padding-bottom: 12.5px;
  }
`;
const ResumeImage = styled.div`
  width: 100%;
  height: 418px;
  margin-top: 32px;
  background-color: black;
`;

const ProjectDesktop = ({ data }) => {
  let isPageWide = useMediaQuery("(min-width: 667px)");

  const projects = data.prismicProjectIndexSelect.data.project_relationship_group.map(
    project => project.project_relationship_field.document.uid
  );

  // Next Project link
  // where in the array the current projects sits. finds uid in that array and tells you what number that is in the list.
  const currentProjectPageNumber = projects.indexOf(
    data.prismicProjectDesktop.uid
  );
  // console.log(currentProjectPageNumber);

  const nextProjectUid =
    // if the current page + 1 is less than total projects
    currentProjectPageNumber + 1 < projects.length
      ? // looks in the projects array for current project number + 1
        projects[currentProjectPageNumber + 1]
      : projects[0];
  // console.log(nextProjectUid);

  // filter for next project uid in all the projects
  // but this is the things that allows you to pull content from that project
  // returns all the data that matches the uid for the next project
  const nextProjectContent = data.prismicProjectIndexSelect.data.project_relationship_group.filter(
    project =>
      project.project_relationship_field.document.uid === nextProjectUid
  );

  const prevProjectUid =
    // if the current page + 1 is less than total projects
    currentProjectPageNumber + 1 < projects.length
      ? // looks in the projects array for current project number + 1
        projects[currentProjectPageNumber - 1]
      : projects[0];

  console.log(prevProjectUid);

  const prevProjectContent = data.prismicProjectIndexSelect.data.project_relationship_group.filter(
    project =>
      project.project_relationship_field.document.uid === prevProjectUid
  );

  var x = undefined;
  if (currentProjectPageNumber === 0) {
    // console.log(true);
    x = true;
  } else {
    // console.log(false);
    x = false;
  }

  var y = undefined;
  if (currentProjectPageNumber === projects.length - 1) {
    // console.log(true);
    y = true;
  } else {
    // console.log(false);
    y = false;
  }
  console.log("y = " + y);
  // console.log(nextProjectContent);
  // console.log(nextProjectContent[0]);
  // console.log(nextProjectContent[0].project_relationship_field.document.uid);
  // console.log(
  //   nextProjectContent[0].project_relationship_field.document.data.project_title
  //     .text
  // );

  const PrevProject = () => {
    return (
      <div>
        <Link
          to={`/${prevProjectContent[0].project_relationship_field.document.uid}`}
        >
          <p className="header">Previous Project</p>
          <GatsbyImage
            image={
              prevProjectContent[0].project_relationship_field.document.data
                .index_preview_img.gatsbyImageData
            }
          />
          <p className="project_title">
            {
              prevProjectContent[0].project_relationship_field.document.data
                .project_title.text
            }
          </p>
        </Link>
      </div>
    );
  };

  const NextProject = () => {
    return (
      <div>
        <Link
          to={`/${nextProjectContent[0].project_relationship_field.document.uid}`}
        >
          <p className="header">Next Project</p>
          <GatsbyImage
            image={
              nextProjectContent[0].project_relationship_field.document.data
                .index_preview_img.gatsbyImageData
            }
          />
          <p className="project_title">
            {
              nextProjectContent[0].project_relationship_field.document.data
                .project_title.text
            }
          </p>
        </Link>
      </div>
    );
  };

  const Resume = () => {
    return (
      <div>
        <Link to="/resume">
          <ResumeImage />
        </Link>
        <p className="project_title">View Resume</p>
      </div>
    );
  };
  const projectBody = data.prismicProjectDesktop.data.body2.map(
    (content, index) => {
      if (content.slice_type == "full_bleed_image") {
        const image = getImage(content.primary.image1);

        return (
          <>
            <FullBleedImgCon>
              <FullBleedImgConCon
                columnStart={content.primary.column_start}
                columnWidth={content.primary.column_width}
              >
                <GatsbyImage image={image} />
                <Caption
                  style={{ marginLeft: "12.5px" }}
                  CaptionFontSize={content.primary.caption_font_size}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content.primary.caption.html,
                    }}
                  />
                </Caption>
              </FullBleedImgConCon>
            </FullBleedImgCon>
          </>
        );
      }
      if (content.slice_type == "image") {
        const image = getImage(content.primary.image);
        // console.log(content.primary.margin_top);
        // console.log(content.primary.row_margin_top);
        // console.log(content.primary.column_start);
        // console.log(content.primary.column_width);
        return (
          <>
            <SquareImgCon
              columnStart={content.primary.column_start}
              columnWidth={content.primary.column_width}
              RowMarginTop={content.primary.row_margin_top}
              ImgMarginTop={content.primary.margin_top}
            >
              <GatsbyImage image={image} />
              <Caption CaptionFontSize={content.primary.caption_font_size}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: content.primary.caption.html,
                  }}
                />
              </Caption>
            </SquareImgCon>
          </>
        );
      }
      if (content.slice_type == "text") {
        return (
          <>
            <BodyTextCon RowMarginTop={content.primary.row_margin_top}>
              <div
                dangerouslySetInnerHTML={{
                  __html: content.primary.text.html,
                }}
              />
            </BodyTextCon>
          </>
        );
      }
      if (content.slice_type == "video") {
        if (isPageWide) {
          const posterImgProps = content.primary.index_image;
          return (
            <SquareImgCon
              columnStart={content.primary.column_start}
              columnWidth={content.primary.column_width}
              RowMarginTop={content.primary.row_margin_top}
              ImgMarginTop={content.primary.margin_top}
            >
              <AutoPlayVideo
                srcProps={content.primary.video.url}
                posterProps={posterImgProps}
              />
              <Caption CaptionFontSize={content.primary.caption_font_size}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: content.primary.caption.html,
                  }}
                />
              </Caption>
            </SquareImgCon>
          );
        } else {
          const posterImgProps = content.primary.index_image;
          return (
            <SquareImgCon
              columnStart={content.primary.column_start}
              columnWidth={content.primary.column_width}
              RowMarginTop={content.primary.row_margin_top}
              ImgMarginTop={content.primary.margin_top}
            >
              <AutoPlayVideo
                srcProps={content.primary.sml_video.url}
                posterProps={posterImgProps}
              />
              <Caption CaptionFontSize={content.primary.caption_font_size}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: content.primary.caption.html,
                  }}
                />
              </Caption>
            </SquareImgCon>
          );
        }
      }
      if (content.slice_type == "full_bleed_video") {
        const posterImgProps = content.primary.poster_image;

        return (
          <>
            <FullBleedImgCon>
              <FullBleedImgConCon
                columnStart={content.primary.column_start}
                columnWidth={content.primary.column_width}
                RowMarginTop={content.primary.row_margin_top}
              >
                <AutoPlayVideo
                  srcProps={content.primary.video.url}
                  posterProps={posterImgProps}
                />
                <Caption
                  style={{ marginLeft: "12.5px" }}
                  CaptionFontSize={content.primary.caption_font_size}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content.primary.caption.html,
                    }}
                  />
                </Caption>
              </FullBleedImgConCon>
            </FullBleedImgCon>
          </>
        );
      }
      if (content.slice_type == "black_films_module") {
        const posterImage = content.primary.poster_image;
        // console.log(posterImage);
        return (
          <>
            <BlackFilmsModuleCon RowMarginTop={content.primary.row_margin_top}>
              <BlackFilmsModuleConCon
                columnStart={content.primary.column_start}
                columnWidth={content.primary.column_width}
              >
                <AutoPlayVideoOriginalAuto
                  srcProps={content.primary.video.url}
                  posterProps={posterImage}
                  img={posterImage}
                />
                <Caption
                  style={{ marginLeft: "12.5px" }}
                  CaptionFontSize={content.primary.caption_font_size}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content.primary.caption.html,
                    }}
                  />
                </Caption>
              </BlackFilmsModuleConCon>
            </BlackFilmsModuleCon>
          </>
        );
      }
    }
  );

  return (
    <>
      <GlobalStyle />
      <Helmet>
        <title>
          Theo Ford – {data.prismicProjectDesktop.data.project_title.text}
        </title>
      </Helmet>
      <LogoTitleCon>
        {/* <LogoCon>
          <Link to="/">
            <Logo />
          </Link>
        </LogoCon> */}
        <p>
          {" "}
          <span style={{ fontWeight: "bold" }}>Theo Ford</span>
          &nbsp;for {data.prismicProjectDesktop.data.project_title.text} in{" "}
          {data.prismicProjectDesktop.data.location.text}.{" "}
          {data.prismicProjectDesktop.data.year.text}.
        </p>
      </LogoTitleCon>

      <MenuCon>
        <DesktopNavP>
          <Link to="/">Index, </Link>
          <Link to="/resume">Resume, </Link>
          <Link to="/about">About</Link>
          {/* <br></br>Instagram, Twitter */}
        </DesktopNavP>
      </MenuCon>
      <PaginationCon>
        <DesktopNavP>
          Project {currentProjectPageNumber + 1} of {projects.length}
        </DesktopNavP>
      </PaginationCon>
      <PageCon>
        <IntroCon>
          <IntroTextCon>
            <div
              dangerouslySetInnerHTML={{
                __html: data.prismicProjectDesktop.data.intro_text.html,
              }}
            />
          </IntroTextCon>
        </IntroCon>
        <MetaCon>
          <p>
            Client: {data.prismicProjectDesktop.data.client.text}
            <br></br>
            Team: {data.prismicProjectDesktop.data.team.text}
            <br></br>
            Sector: {data.prismicProjectDesktop.data.sector.text}
            <br></br>
            Services:{" "}
            {data.prismicProjectDesktop.data.categories.map(
              (category, index) => {
                return (
                  <CategoryName key={index}>
                    {(index ? ", " : "") + category.category.slug}
                  </CategoryName>
                );
              }
            )}
          </p>
        </MetaCon>

        <Grid16>{projectBody}</Grid16>
        <MoreProjects>
          {/* {x ? "" : <PrevProject />} */}
          {y ? <Resume /> : <NextProject />}
          {/* <NextProject></NextProject> */}
        </MoreProjects>
      </PageCon>
    </>
  );
};

export default withPrismicPreview(ProjectDesktop);

export const query = graphql`
  query Artists($uid: String!) {
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
                  project_title {
                    text
                  }
                  index_preview_img {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
    }
    allPrismicProjectDesktop {
      edges {
        node {
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
          }
        }
      }
    }
    prismicProjectDesktop(uid: { eq: $uid }) {
      uid
      id
      data {
        project_title {
          html
          text
        }
        client {
          html
          text
        }
        location {
          html
          text
        }
        project_title {
          html
          text
        }
        team {
          html
          text
        }
        year {
          html
          text
        }
        sector {
          html
          text
        }
        categories {
          category {
            slug
            id
          }
        }
        intro_text {
          html
        }
        body2 {
          ... on PrismicProjectDesktopDataBody2Image {
            id
            slice_type
            primary {
              column_start
              column_width
              margin_top
              row_margin_top
              image {
                gatsbyImageData
              }
              caption {
                html
              }
              caption_font_size
            }
          }
          ... on PrismicProjectDesktopDataBody2FullBleedImage {
            id
            slice_type
            primary {
              column_start
              column_width
              margin_top
              row_margin_top
              image1 {
                gatsbyImageData
              }
              caption {
                html
              }
              caption_font_size
            }
          }
          ... on PrismicProjectDesktopDataBody2Text {
            id
            slice_type
            primary {
              text {
                html
              }
              row_margin_top
            }
          }
          ... on PrismicProjectDesktopDataBody2Video {
            id
            slice_type
            primary {
              video {
                url
              }
              sml_video {
                url
              }
              row_margin_top
              margin_top
              index_image {
                gatsbyImageData
              }
              column_width
              column_start
              caption_size
              caption {
                html
                text
              }
            }
          }
          ... on PrismicProjectDesktopDataBody2FullBleedVideo {
            id
            slice_type
            primary {
              video {
                url
              }
              small_video {
                url
              }
              row_margin_top
              poster_image {
                gatsbyImageData
              }
              margin_top
              column_width
              column_start
              caption_font_size
              caption {
                html
                text
              }
            }
          }
          ... on PrismicProjectDesktopDataBody2BlackFilmsModule {
            id
            slice_type
            primary {
              video {
                url
              }
              poster_image {
                gatsbyImageData
                dimensions {
                  height
                  width
                }
              }
              full_bleed
              row_margin_top
              caption {
                html
                text
              }
              caption_font_size
            }
          }
        }
      }
    }
  }
`;
