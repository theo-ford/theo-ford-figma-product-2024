import React, { useState } from "react";
import styled from "styled-components";

// Components
import { Header } from "./header";
import { Footer } from "./footer";

const Main = styled.main`
  flex: 1;
`;

// header goes in here 
export const App = ({ location, data, children }) => {
  return (
    <>

      <Main>{children}</Main>
      
    </>
  );
};
