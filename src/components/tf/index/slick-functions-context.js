import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";

const CarouselIndexClicked = createContext({
  slideGoTo: 0,
  setSlideGoTo: () => {},
});
export default CarouselIndexClicked;
