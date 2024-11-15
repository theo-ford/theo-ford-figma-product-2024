import React, { useEffect, useState, useRef, useContext } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, Link, navigate, useMemo } from "gatsby";
import PrevPathContext from "./prev-path-context";

export const NextProject2 = ({ image, title, url }) => {
  const { currentPath, setCurrentPath } = useContext(PrevPathContext);

  const clickLinkFunc2 = url => {
    // console.log(location.pathname);

    // setCurrentPath(location.pathname);
    // console.log("CURRENT PATH STATE" + currentPath);

    // setCurrentPath(location.pathname);

    setCurrentPath(location.pathname);

    function navigateFunc(url) {
      navigate(`/${url}`);
    }
    // navigateFunc(url);
    setTimeout(function() {
      navigateFunc(url);
    }, 2000);
  };

  return (
    <>
      <div
        onClick={() => {
          clickLinkFunc2(url);
        }}
      >
        <p className="header">Next Project</p>
        <GatsbyImage image={image} />
        <p className="project_title">{title}</p>
      </div>
    </>
  );
};
