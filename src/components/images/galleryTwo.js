import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "../styles/gallery.css";

// Utils
import { ImageOrientation } from "../utils/image-orientation";

// Components

const GalleryContainer = styled.div`
  background-color:red;
  width:400px;
  height:200px;
`;
const ImageContainer = styled.div`
  
`;

export const GalleryTwo = ({ images, opacity, autoplay }) => {
  console.log(images);


  const galleryContent = images.map((content, index) => {
    console.log(content);
    console.log(content.artist_image);
    console.log(index);
    return (
      <ImageContainer key={`homepage_images_${index}`}>
        <img
          // className={ImageOrientation(content.artist_image)}
          // srcSet={content.index_image.fluid.srcSetWebp}
          //src={content.index_image.fluid.srcWebp}
          // alt={content.artist_image.alt}
          // loading={index <= 2 || index === images.length - 1 ? `eager` : `lazy`}
        />
      </ImageContainer>
    );
  });

  return (
    <GalleryContainer>
     
        {galleryContent}
    </GalleryContainer>
  );
};
