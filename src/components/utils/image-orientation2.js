export const ImageOrientation2 = image => {
  var x = image.dimensions.height / image.dimensions.width;
  const isImageSmlPortrait = x > 1.2;
  const isImageLrgPortrait = x > 1.7;
  const isImageLandscape = image.dimensions.width > image.dimensions.height;
  const isImageSquare = image.dimensions.width === image.dimensions.height;

  if (isImageLrgPortrait === true) {
    return "lrg-portrait";
  } else if (isImageSmlPortrait === true) {
    return "sml-portrait";
  } else if (isImageSquare === true) {
    // console.log("square");
    return "square";
  } else {
    // console.log("portrait");
    return "landscape";
  }
};
