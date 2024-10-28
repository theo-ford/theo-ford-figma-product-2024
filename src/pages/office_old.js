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
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { ImageOrientation } from "../components/utils/image-orientation";
import { Helmet } from "react-helmet";
import "../components/styles/index.css";
import { useMediaQuery } from "../components/tf/media-query";
// import Icon from "../../assets/White Logo No TF.svg";
import { useOnScreen } from "../components/hooks/useOnScreen";
import ReactPlayer from "react-player";
import Icon from "../../assets/WhiteLogo.svg";
import { NavGrid } from "../components/tf/nav-grid/nav";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";

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
    top: 10px;
    grid-gap: 10px;
  }
`;
const PageConCon = styled.div`
  background-color: black;
`;
const PageCon = styled.div`
  /* margin-top: 34vh; */
  /* margin-top: 25px; */
  /* overflow-x: hidden;
  max-width: 100vw; */
  /* background-color: red; */
  padding-bottom: 100px;
  margin-top: 140px;
  @media (max-width: 666px) {
    margin-top: 40px;
    padding-bottom: 50px;
  }
`;
const AboutTextCon = styled.div`
  grid-column: 3 / span 12;
  p {
    font-size: 36px;
    margin: auto;
    line-height: 110%;
    color: white;
    font-family: "Times Now";

    font-weight: 300;
    font-style: normal;
    /* text-indent: 50px; */
    letter-spacing: -0.8px !important;
    margin-top: 10px;
    margin-bottom: 10px;
    float: left;
  }
  @media (max-width: 666px) {
    /* display: none; */
    grid-column: span 16;
    p {
      font-size: 22px;
      /* font-size: 24px; */
    }
  }
`;

const CopyrightSpan = styled.span`
  font-family: "Helvetica Now Var Roman";
  font-variation-settings: "wght" 390;
  color: white;
  font-size: 12px;
  margin: 0;
  padding: 0;
  line-height: 110%;
  letter-spacing: -0.5px;
  display: inline-block;
  text-indent: 0px;
  float: left;
  @media (max-width: 666px) {
    display: none;
  }
`;
const ContactCon = styled.div`
  grid-column: 0 / span 3;
  h5 {
    font-family: "HelveticaNowText";
    font-weight: bold;
    color: white;
    font-size: 16px;
  }
  p {
    color: white;
  }
  a {
    color: white;
  }
`;
const ContactCon2 = styled.div`
  grid-column: 3 / span 3;
  h5 {
    font-family: "HelveticaNowText";
    font-weight: bold;
    color: white;
    font-size: 16px;
  }
  p {
    color: white;
  }
  a {
    color: white;
  }
`;
const AddressCon = styled.div`
  grid-column: 6 / span 3;
  h5 {
    font-family: "HelveticaNowText";
    font-weight: bold;
    color: white;
    font-size: 16px;
  }
  p {
    color: white;
  }
  a {
    color: white;
  }
`;

const FollowCon = styled.div`
  grid-column: 9 / span 3;
  h5 {
    font-family: "HelveticaNowText";
    font-weight: bold;
    color: white;
    font-size: 16px;
  }
  a {
    color: #878787;
  }
`;
const TRXCon = styled.div`
  grid-column: 12 / span 3;
  h5 {
    font-family: "HelveticaNowText";
    font-weight: bold;
    color: white;
    font-size: 16px;
  }
  p {
    color: white;
  }
  a {
    color: white;
  }
`;
const ListCol1 = styled.div`
  grid-column: 3 / span 3;
  color: white;
  font-family: "Helvetica Now Var Roman";
  font-variation-settings: "wght" 390;
  color: white;
  line-height: 110%;
  letter-spacing: -0.5px;

  h5 {
    font-family: "HelveticaNowText";
    font-weight: bold;
    color: white;
    font-size: 16px;
  }

  a {
    color: white;

    color: #878787;
  }
  @media (max-width: 666px) {
    /* display: none; */
    grid-column: span 8;
  }
`;
const ListCol2 = styled.div`
  grid-column: 6 / span 3;
  color: white;
  font-family: "Helvetica Now Var Roman";
  font-variation-settings: "wght" 390;
  color: white;
  line-height: 110%;
  letter-spacing: -0.5px;
  h5 {
    font-family: "HelveticaNowText";
    font-weight: bold;
    color: white;
    font-size: 16px;
  }

  /* li {
    color: #878787;
  } */
  a {
    color: #878787;
  }
  @media (max-width: 666px) {
    /* display: none; */
    grid-column: 9 / span 8;
  }
`;
const ListCol3 = styled.div`
  grid-column: 9 / span 3;
  color: white;
  font-family: "Helvetica Now Var Roman";
  font-variation-settings: "wght" 390;
  color: white;
  line-height: 110%;
  letter-spacing: -0.5px;
  h5 {
    font-family: "HelveticaNowText";
    font-weight: bold;
    color: white;
    font-size: 16px;
  }
  p {
    color: white;
  }
  a {
    color: white;
  }
`;

const ListCol4 = styled.div`
  grid-column: 12 / span 3;
  color: white;
  font-family: "Helvetica Now Var Roman";
  font-variation-settings: "wght" 390;
  color: white;
  line-height: 110%;
  letter-spacing: -0.5px;
  h5 {
    font-family: "HelveticaNowText";
    font-weight: bold;
    color: white;
    font-size: 16px;
  }
  a {
    color: #878787;
  }
`;
const LinkCon = styled.div`
  height: 13px;
  width: 13px;
  display: inline-block;
  /* margin-left: 4px; */
  /* margin-top: 4px; */
  position: absolute;
  bottom: 2px;
`;
const About = ({ data }) => {
  let isPageWide = useMediaQuery("(min-width: 667px)");
  const LogoConRef = useRef(null);
  const [pageLoad, setPageLoad] = useState(null);

  useEffect(() => {
    // callback function to call when event triggers
    const onPageLoad = () => {
      console.log("page loaded");
      setPageLoad(true);
      // do something else
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Helmet>
        <title>Theo Ford – Office</title>
      </Helmet>
      <PageConCon>
        <NavGrid></NavGrid>
        <PageCon>
          <Grid16>
            <AboutTextCon>
              <>
                {/* {data.prismicAbout.data.about_page_intro.text} */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.prismicAbout.data.about_page_intro.html,
                  }}
                />
                {"  "}
                <CopyrightSpan>
                  &copy; All rights reserved by Theo Ford &copy;2024{" "}
                </CopyrightSpan>
              </>
            </AboutTextCon>
          </Grid16>

          {isPageWide ? (
            <>
              <Grid16 style={{ marginTop: "100px" }}>
                <ContactCon></ContactCon>
                <ContactCon2>
                  <h5>Contact</h5>
                  <p>info@theoford.com</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.phone_number.html,
                    }}
                  />
                  <p>theoford.com</p>
                </ContactCon2>
                <AddressCon>
                  <h5>Address</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.address.html,
                    }}
                  />
                </AddressCon>

                <FollowCon>
                  <h5>Follow</h5>

                  <div style={{ display: "block" }}>
                    <Link
                      target="_blank"
                      to={data.prismicAbout.data.instagram_office_link.url}
                    >
                      <span style={{ marginLeft: "0px" }}>Instagram</span>
                    </Link>

                    {/* <LinkCon>
                      <StaticImage src={"../img/Link.svg"} />
                    </LinkCon> */}
                  </div>
                  <div style={{ display: "block" }}>
                    {/* <LinkCon>
                      <StaticImage src={"../img/Link.svg"} />
                    </LinkCon> */}
                    <Link
                      to={data.prismicAbout.data.twitter.url}
                      target="_blank"
                    >
                      <span style={{ marginLeft: "0px" }}>Twitter</span>
                    </Link>
                  </div>
                </FollowCon>
                <TRXCon>
                  <h5>TF-1.1</h5>
                  <p>
                    Last Update
                    <br></br> 01/01/24
                    <br></br>
                  </p>
                </TRXCon>
              </Grid16>
              <Grid16 style={{ marginTop: "100px" }}>
                <ListCol1>
                  <h5>Select Clients</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.clients.html,
                    }}
                  />
                </ListCol1>
                <ListCol2>
                  <h5>Background</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.previous_employers.html,
                    }}
                  />
                  <br></br>
                  <br></br>
                  <h5>Press</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.press.html,
                    }}
                  />
                </ListCol2>
                <ListCol3>
                  <h5>Services</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.services.html,
                    }}
                  />
                </ListCol3>
                <ListCol4>
                  <h5>Collaborators</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.collaborators.html,
                    }}
                  />
                  <br></br>
                  <br></br>
                  <h5>Previous Locations</h5>
                  <p>
                    <span className="active">London, UK</span> <br></br>
                    Los Angeles, US<br></br>
                    Stockholm, SE<br></br>
                    Gothenburg, SE<br></br>
                    Glasgow, UK<br></br>
                    Falmouth, UK<br></br>
                    Beijing, CH<br></br>
                    Philadelphia, US
                  </p>
                </ListCol4>
              </Grid16>
            </>
          ) : (
            <>
              <Grid16 style={{ marginTop: "50px" }}>
                <ListCol1>
                  <h5>Contact</h5>
                  info@theoford.com
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.phone_number.html,
                    }}
                  />
                  theoford.com
                  <br></br>
                  <br></br>
                  <h5>Follow</h5>
                  <div style={{ display: "block" }}>
                    <Link
                      target="_blank"
                      to={data.prismicAbout.data.instagram_office_link.url}
                    >
                      <span style={{ marginLeft: "0px" }}>Instagram</span>
                    </Link>

                    {/* <LinkCon>
                      <StaticImage src={"../img/Link.svg"} />
                    </LinkCon> */}
                  </div>
                  <div style={{ display: "block" }}>
                    {/* <LinkCon>
                      <StaticImage src={"../img/Link.svg"} />
                    </LinkCon> */}
                    <Link
                      target="_blank"
                      to={data.prismicAbout.data.twitter.url}
                    >
                      <span style={{ marginLeft: "0px" }}>Twitter</span>
                    </Link>
                  </div>
                </ListCol1>
                <ListCol2>
                  <h5>Address</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.address.html,
                    }}
                  />
                  <br></br>
                  <h5>TF-1.1</h5>
                  <p>
                    Last Update
                    <br></br> 01/01/24
                    <br></br>
                  </p>
                </ListCol2>
              </Grid16>
              <Grid16 style={{ marginTop: "50px" }}>
                <ListCol1>
                  <h5>Select Clients</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.clients.html,
                    }}
                  />
                  <br></br>
                  <br></br>
                  <h5>Previous Locations</h5>
                  <p>
                    <span className="active">London, UK</span> <br></br>
                    Los Angeles, US<br></br>
                    Stockholm, SE<br></br>
                    Gothenburg, SE<br></br>
                    Glasgow, UK<br></br>
                    Falmouth, UK<br></br>
                    Beijing, CH<br></br>
                    Philadelphia, US
                  </p>
                  <br></br>
                  <br></br>
                  <h5>Press</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.press.html,
                    }}
                  />
                </ListCol1>
                <ListCol2>
                  <h5>Background</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.previous_employers.html,
                    }}
                  />
                  <br></br>
                  <br></br>
                  <h5>Collaborators</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.collaborators.html,
                    }}
                  />
                  <br></br>
                  <br></br>
                  <h5>Services</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.prismicAbout.data.services.html,
                    }}
                  />
                </ListCol2>
              </Grid16>
            </>
          )}
        </PageCon>
      </PageConCon>
    </>
  );
};

export default withPrismicPreview(About);

export const query = graphql`
  query aboutQuery17 {
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
          gatsbyImageData
        }
      }
    }
  }
`;
