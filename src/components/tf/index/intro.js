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

const IntroCon = styled.div`
  margin-top: 10px;
  /* transition: 1s ease; */
  span.grey {
    color: #878787;
  }
  @media (max-width: 666px) {
    display: none;
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
`;
const AboutCon = styled.div`
  grid-column: span 7;
  /* p,
  span {
    font-size: 22px;
  } */
`;
const LocationCon = styled.div`
  grid-column: 9 / span 5;
  span.grey {
    color: #878787;
  }
`;
const ContactCon = styled.div`
  grid-column: 15 / span 2;
`;

export const Intro = () => {
  // https://stackoverflow.com/questions/71201160/how-to-update-a-clock-every-second-in-react-js-recursively
  const [time, setTime] = React.useState(date());

  function date() {
    let nwDate = new Date();
    var year = nwDate.getFullYear();
    var month = nwDate.getMonth() + 1;
    var monthString = month.toString();
    var day = nwDate.getDate();
    var hours = nwDate.getHours();
    var minutes = nwDate.getMinutes();
    var seconds = nwDate.getSeconds();
    var dateTimeString =
      year +
      "/" +
      ("0" + monthString).slice(-2) +
      "/" +
      ("0" + day).slice(-2) +
      " " +
      ("0" + hours).slice(-2) +
      ":" +
      ("0" + minutes).slice(-2) +
      ":" +
      ("0" + seconds).slice(-2);
    return dateTimeString;
  }

  // console.log(date());

  useEffect(() => {
    setInterval(() => {
      setTime(date());
    }, 1000);
  }, []);

  return (
    <IntroCon>
      <Grid16>
        <AboutCon>
          <p>
            The design office of Theo Ford. Specialising in graphic design, art
            direction, moving-image and web development. Recent commissions and
            collaborations include identities for{" "}
            <span className="grey">G4C</span>, adverts for{" "}
            <span className="grey">American Apparel</span>, and printed matter
            for <span className="grey">COS</span>.<br />
          </p>
        </AboutCon>
        <LocationCon>
          <p>
            Current Location:<span className="grey"> London, </span> New York,
            <span className="grey">
              {" "}
              Los Angeles, Beijing, Stockholm, Gothenburg, Glasgow, Falmouth,
              Philadelphia.
            </span>{" "}
            {/* 2023/03/23 21:32.  */}
            {time.toString()}.
          </p>
        </LocationCon>
        <ContactCon>
          <p class="">
            <span>
              info@theoford.com
              <br />
              +44 7599 759 527
              <br /> &nbsp;
              <Link target="_blank" to="https://www.instagram.com/tf.public/">
                @tf.public
              </Link>
            </span>
          </p>
        </ContactCon>
      </Grid16>
    </IntroCon>
  );
};
