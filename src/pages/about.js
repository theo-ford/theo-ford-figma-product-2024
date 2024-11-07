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
// import PlayButton from "../../assets/Logo.jpg";
// import PlayButton from "../../public/icons/logo.jpg";
import { NavGrid } from "../components/tf/nav-grid/nav";

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
    max-width: 100vw;
  }
  p {
    letter-spacing: -0.2px;
  }

    
  
`;

/* BOTH */
const LogoGridCon = styled.div`
  width: calc(100% - 25px);
  margin-left: 12.5px;
  position: fixed;
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
  grid-column: span 2;
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
  p {
    color: white;
    span.bold {
      font-variation-settings: "wght" 600;
    }
  }
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

const PageCon = styled.div`
  background-color: black;
  min-height: 100vh;
  /* min-height: 100vh; */
  /* overflow: hidden; */
  /* padding-bottom: 18vh; */
  /* margin-top: 400px; */
  @media (max-width: 666px) {
    padding-bottom: 0vh;
  }
`;
const IntroCon = styled.div`
  width: calc(50% - 12.5px);
  margin-left: 12.5px;
  /* margin-top: 180px; */
  margin-top: 10px;

  /* margin-bottom: 165px; */
  p {
    color: white;
    letter-spacing: -0.2px;
    font-size: 16px;
    span.bold {
      font-variation-settings: "wght" 600;
    }
  }
  @media (max-width: 666px) {
    margin-top: 100px;
    width: calc(100% - 20px);
    margin-left: 10px;
    display: block;
    float: left;
  }
`;
const ImgCon = styled.div`
  width: calc(50% - 12.5px);
  margin-left: 12.5px;
  height: 94vh;
  display: grid;
  align-items: center;

  @media (max-width: 666px) {
    margin-top: 20px;
    width: calc(100% - 20px);
    margin-left: 10px;
    display: block;
    float: left;
    margin-top: 6px;
    height: auto;
  }
`;
const ImgCaptionCon = styled.div`
  width: calc(100%);

  margin-top: 6px;
  p {
    color: white;
    letter-spacing: -0.2px;
    font-size: 12px;
  }
`;

const BodyTextCon = styled.div`
  width: calc(50% - 12.5px);
  margin-left: 12.5px;
  /* margin-top: 100px; */
  margin-bottom: 12.5px;
  p,
  a {
    color: white;
    letter-spacing: -0.2px;
    font-size: 16px;
    span.bold {
      font-variation-settings: "wght" 600;
    }
  }
  .can {
    /* margin-top: 100px; */
  }
  .experience {
    margin-top: 100px;
  }

  .contact {
    margin-top: 100px;
  }
  @media (max-width: 666px) {
    margin-top: 20px;
    width: calc(100% - 20px);
    margin-left: 10px;
    display: block;
    float: left;
    margin-top: 6px;
    height: auto;
    margin-top: 100px;
    p,
    a {
      color: white;
      letter-spacing: -0.2px;
      font-size: 12px;
      span.bold {
        font-variation-settings: "wght" 600;
        font-size: 12px;
      }
    }
    .can {
      margin-top: 0px;
    }
    .experience {
      margin-top: 0px;
    }

    .contact {
      margin-top: 0px;

      p,
      a {
        font-size: 16px !important;
      }
    }
  }
`;
const ContactBlock = styled.div`
  margin-top: 100px;
  margin-bottom: 12.5px;
`;
const ContactCon = styled.div`
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  display: grid;
  margin-left: 12.5px;

  p,
  a {
    color: white;
    letter-spacing: -0.2px;
    font-size: 16px;
  }
  .title {
    grid-column: span 1;
  }
  .link {
    grid-column: span 2;
  }
`;
const ProjectIndex = ({ data, location }) => {
  let isPageWide = useMediaQuery("(min-width: 667px)");
  const LogoConRef = useRef(null);
  const [activeCategory, setCategory] = useState(null);
  const [categoriesVisible, setCategoriesVisible] = useState(false);

  console.log(location);

  const CopyNav = () => {
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
          <LogoGridCon>
            <LogoConCon>
              <LogoCon ref={LogoConRef}>
                <Link to="/">
                  {/* <p>
                    <span>Theo Ford</span> is an Indian/British art-director &
                    programmer currently in New York.
                  </p> */}
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
                <Link to="/resume">Resume, </Link>
                <Link to="/about" className="selected">
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
              <Link to="/index">
                <MobileNavP
                  className={currentPage == "project_index" ? "selected" : ""}
                >
                  Index
                </MobileNavP>
              </Link>
            </MobileLeftCol>

            <MobileRightCol>
              <Link to="/about">
                <MobileNavP className="selected">About</MobileNavP>
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
  const image = getImage(data.prismicAbout.data.image);
  return (
    <>
      <GlobalStyle />
      <Helmet>
        <title>Theo Ford – Office</title>
      </Helmet>

      <PageCon>
        <CopyNav></CopyNav>

        <div>
          <IntroCon>
            <p>
              <span className="bold">Theo Ford</span> is an Indian British
              designer, programmer & art-director currently in New York.
            </p>
          </IntroCon>
          <ImgCon>
            <div>
              <GatsbyImage image={image} />
              {/* <ImgCaptionCon>
                <p>
                  This is an A0 photo of me in Philadelphia when I was two.
                  Mutaji (Grandma) had it hanging in her living room next to a
                  portrait of her other great love Guru Nanak. When she passed,
                  it was the only thing I received in the inheritance. At the
                  time I was bitter because my sister got money, but with age
                  this feels priceless.
                </p>
              </ImgCaptionCon> */}
            </div>
          </ImgCon>
          <div>
            <BodyTextCon>
              <div className="can">
                <p>
                  <span className="bold">Theo Ford</span> believes in...
                  <br></br>
                  <br></br>
                  meaningful improvement<br></br>
                  fun, joy, humour and playfulness<br></br>
                  {/* the everyday<br></br> */}
                  efficient use of resources<br></br>
                  intuition + logic + play + strategy<br></br>
                  {/* listening to people<br></br> */}
                  doing things yourself<br></br>
                  curiosity<br></br>
                  tools<br></br>
                </p>
              </div>
            </BodyTextCon>

            <ContactBlock>
              <ContactCon>
                <div className="title">
                  <p>Website</p>
                </div>
                <div className="link">
                  <p>theoford.com</p>
                </div>
              </ContactCon>
              <ContactCon>
                <div className="title">
                  <p>Email</p>
                </div>
                <div className="link">
                  <p>info@theoford.com</p>
                </div>
              </ContactCon>
              <ContactCon>
                <div className="title">
                  <p>LinkedIn</p>
                </div>
                <div className="link">
                  <p>linkedin.com/in/theoford</p>
                </div>
              </ContactCon>
              <ContactCon>
                <div className="title">
                  <p>Instagram</p>
                </div>
                <div className="link">
                  <p>tf.public</p>
                </div>
              </ContactCon>
            </ContactBlock>
          </div>
        </div>
      </PageCon>
    </>
  );
};

export default withPrismicPreview(ProjectIndex);

export const query = graphql`
  query aboutQuery90 {
    prismicAbout {
      data {
        website_url {
          html
          text
        }
        upcoming_locations {
          html
          text
        }
        services {
          html
          text
        }
        previous_locations {
          html
          text
        }
        previous_employers {
          html
          text
        }
        phone_number {
          html
          text
        }
        instagram {
          html
          text
        }
        homepage_intro {
          html
          text
        }
        email {
          url
        }
        instagram_office_link {
          url
        }
        linked_in {
          url
        }
        twitter {
          url
        }
        current_location {
          html
          text
        }
        collaborators {
          html
          text
        }
        clients {
          html
          text
        }
        address {
          html
          text
        }
        about_page_intro {
          html
          text
        }
        press {
          html
        }
        image {
          gatsbyImageData(placeholder: NONE, backgroundColor: "#D6D6D6")
        }
      }
    }
  }
`;
