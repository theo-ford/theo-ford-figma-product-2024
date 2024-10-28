import React, { useRef, useState } from "react";

  export const SingleArtist = ({ index, data, content }) => {
    return (
      <a className="artist-link" href={content.node.uid}>
        <h1 className="artist-title" id={content.node.data.artist_title.text}>
          {content.node.data.artist_title.text}
        </h1>
        <br />
      </a>
    );
  };