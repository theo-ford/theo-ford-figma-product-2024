import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

/* html {
  main{
    opacity: 0;
    transition: 250ms opacity ease;
  }
 }

html.wf-active,
html.wf-inactive {
  main{
    opacity: 1;
  }
 } */

body {
  text-shadow: 1px 1px 1px rgba(0, 0, 0, .004);
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  -webkit-tap-highlight-color: transparent;

  color: #000;
  margin: 0;
  background-color: white;

  /* word-break: break-word; */
}

input {
  border-radius: 0;
}

h1,h2,h3,h4,h5, p, span{
  font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
  margin: 0;
}



p, a, span {
  font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
  font-variation-settings: "wght" 390;
  /* font-family: "HelveticaNowText"; */
  /* font-variation-settings: "wght" 351; */
  /* font-variation-settings: "wght" 900; */
  font-size: 16px;
  margin: 0;
  padding: 0;
  line-height: 110%;
  letter-spacing: -0.4px;
}


/*--------------------------------------------------------------
  ## Media
  --------------------------------------------------------------*/

video,
img {
  width: 100%;
  margin: 0;

  display: block;
}

/*--------------------------------------------------------------
  ## Buttons
  --------------------------------------------------------------*/

  button{
    background-color: transparent;

    &:focus,
    &:hover{
      outline: none;
    }
  }

/*--------------------------------------------------------------
  ## Links
  --------------------------------------------------------------*/
a {
  color: inherit;
  text-decoration: none;

  position: relative;
}

a:visited {
  color: inherit;
}

a:hover,
a:focus,
a:active {
  color: inherit;
}

a:hover,
a:active,
a:focus {
  outline: 0;
}

/*--------------------------------------------------------------
  ## Text
  --------------------------------------------------------------*/

/* p {
  margin: 1em 0;
} */

ul, li{
  list-style: none;
  padding: 0;
  margin: 0;
}



/* video {
  padding-top: 56.25%; // Percentage ratio for 16:9
  position: relative;  
}

.react-player > div {
  position: absolute; // Scaling will occur since parent is relative now
} */

/* .player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;  
} */


// NAV

h1.navTextStyle {
  font-size: 30px; 
  mix-blend-mode: exclusion;
  color: white;  
}

h1.navLeft {
  position: fixed;
  bottom: 14px;
  z-index: 20000;
  left: 28px;  
}

h1.navCenter {
  position: fixed; 
  bottom: 14px;
  z-index: 40000; 
  text-align: center;
  left: 50%;
  transform: translate(-50%, 0%);    
}

h1.navRight {
  position: fixed;
  bottom: 14px;
  z-index: 30000;
  right: 28px;  
}
@media (max-width: 640px) {
  h1.navTextStyle {
    font-size: 16px;  
  }
  h1.navLeft {
    bottom: 0px;
    left: 15px;  
  } 
  h1.navCenter {
    bottom: 0px;
    
  }
  h1.navRight {
    bottom: 0px;
    right: 15px;  
  } 
}



/* theo ford */

.logo_styles {
  mix-blend-mode: exclusion;
  width: 100%;
  /* position: fixed; */
}


.shrink {
  /* width: calc(37.5% - 6.25px) !important; */
  /* width: calc(25% - 6.25px) !important; */
  width: calc(50% - 6.25px) !important;
  vertical-align: top;
}

  @media (max-width: 668px) {
    .shrink {
      width: calc(75% - 6.25px) !important;
    }
  }

  .shrink-b {
  width: calc(37.5% - 6.25px) !important;
  /* width: calc(25% - 6.25px) !important; */
  /* width: calc(50% - 6.25px) !important; */
  vertical-align: top;
}

.shrink-c {
  width: calc(25% - 6.25px) !important;
  /* width: calc(25% - 6.25px) !important; */
  /* width: calc(50% - 6.25px) !important; */
  vertical-align: top;
}


/* .films-slider .slick-slide div {
  display: grid;
  top: 12.5px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 12.5px;
  margin-left: 12.5px;
  grid-row-gap: 0;
  width: calc(100% - 25px);
  z-index: 20000;
  align-items: center;
  height: 100vh;
}  */


video.landscape {
  grid-column: 5 / span 8;
}

video.portrait {
  grid-column: 7 / span 4;
}
`;

export default GlobalStyle;
