import React, { useState } from "react";
import styled from "styled-components";
import PrevPathContext from "../tf/prev-path-context";

// Components
import { Header } from "./header";
import { Footer } from "./footer";

const Main = styled.main`
  flex: 1;
`;

// header goes in here
export const App = ({ location, data, children }) => {
  const [currentPath, setCurrentPath] = useState(null);
  const value = { currentPath, setCurrentPath };
  return (
    <>
      <PrevPathContext.Provider value={value}>
        <Main>{children}</Main>
      </PrevPathContext.Provider>
    </>
  );
};
