export const ImageOrientation = image => {
  const isImageLandscape = image.dimensions.width > image.dimensions.height;
  const isImageSquare = image.dimensions.width === image.dimensions.height;

  if (isImageLandscape === true) {
    // console.log("landscape");
    return "landscape";
  } else if (isImageSquare === true) {
    // console.log("square");
    return "square";
  } else {
    // console.log("portrait");
    return "portrait";
  }
};
