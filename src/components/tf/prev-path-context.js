import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";

const PrevPathContext = createContext({
  currentPath: false,
  setCurrentPath: () => {},
});
export default PrevPathContext;
