// import styled, { createGlobalStyle, keyframes } from "styled-components";
// import React, {
//   useRef,
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   useMemo,
// } from "react";
// import { graphql, Link, useScrollRestoration } from "gatsby";
// import { useMediaQuery } from "../media-query";

// /* - - - - - PROJECT INFO - - - - - */
// const Grid16 = styled.div`
//   display: grid;
//   top: 12.5px;
//   grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
//   grid-column-gap: 12.5px;
//   margin-left: 12.5px;
//   grid-row-gap: 0;
//   width: calc(100% - 25px);
//   z-index: 20000;
// `;
// const Grid8 = styled.div`
//   display: grid;
//   top: 12.5px;
//   grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
//   grid-column-gap: 12.5px;
//   /* margin-left: 10px; */
//   grid-row-gap: 0;
//   width: calc(100%);
//   z-index: 20000;
// `;
// const Grid2 = styled.div`
//   display: grid;
//   top: 12.5px;
//   grid-template-columns: 1fr 1fr;
//   grid-column-gap: 10px;
//   margin-left: 10px;
//   grid-row-gap: 0;
//   width: calc(100% - 20px);
//   z-index: 20000;
// `;

// const ProjectInfoCon = styled.div`
//   height: 80px;
//   /* margin-top: 8px; */
//   @media (max-width: 666px) {
//     margin-top: 4px;
//   }
// `;

// const ProjectTitleCon = styled.div`
//   grid-column: span 4;

//   @media (max-width: 666px) {
//     grid-column: span 1;
//     a {
//       color: #d4d4d4;
//     }
//   }
// `;
// const ProjectLocationYearCon = styled.div`
//   grid-column: span 4;
//   @media (max-width: 666px) {
//     grid-column: span 1;
//   }
// `;

// const ProjectIndexAbout = styled.div`
//   grid-column: span 4;
//   p {
//     font-size: 12px;
//   }
//   @media (max-width: 666px) {
//     display: none;
//   }
// `;
// const ProjectLink = styled.div`
//   grid-column: 15 / span 2;
//   a {
//     color: #d4d4d4;
//   }
//   @media (max-width: 666px) {
//     display: none;
//   }
// `;
// const SingleAssetProjectInfoCon = styled.div`
//   /* background-color: red; */
//   /* width: 100%; */
//   width: calc(50% - 18.75px);
//   width: calc(100%);
//   /* margin-left: 12.5px; */
//   display: inline-block;
//   float: left;
//   position: relative;
// `;
// const SingleAssetProjectTitleCon = styled.div`
//   grid-column: span 4;
// `;
// const SingleAssetLocationYearTitleCon = styled.div`
//   grid-column: span 2;
// `;
// const SingleAssetProjectUidCon = styled.div`
//   grid-column: span 2;
//   a {
//     color: #d4d4d4;
//   }
// `;

// export const ProjectInfo3 = ({ data2, uid, projectType }) => {
//   let isPageWide = useMediaQuery("(min-width: 667px)");
//   console.log("PROJECT INFO 3");
//   console.log(projectType);
//   if (projectType == "single_asset") {
//     return (
//       <SingleAssetProjectInfoCon>
//         <Grid8>
//           <SingleAssetProjectTitleCon>
//             <Link to={uid}>{data2.project_title.text}</Link>
//           </SingleAssetProjectTitleCon>
//           <SingleAssetLocationYearTitleCon>
//             <p>{data2.location.text}</p>
//             <p>{data2.year.text}</p>
//           </SingleAssetLocationYearTitleCon>
//           <SingleAssetProjectUidCon>
//             <Link to={uid}>More Info</Link>
//           </SingleAssetProjectUidCon>
//         </Grid8>
//       </SingleAssetProjectInfoCon>
//     );
//   } else if (isPageWide) {
//     return (
//       <ProjectInfoCon>
//         <Grid16>
//           <ProjectTitleCon>
//             <Link to={uid}>{data2.project_title.text}</Link>
//           </ProjectTitleCon>
//           <ProjectLocationYearCon>
//             <p>{data2.location.text}</p>
//             <p>{data2.year.text}</p>
//           </ProjectLocationYearCon>
//           <ProjectIndexAbout>
//             <p>{data2.homepage_intro.text}</p>
//           </ProjectIndexAbout>
//           <ProjectLink>
//             <Link to={uid}>More Info</Link>
//           </ProjectLink>
//         </Grid16>
//       </ProjectInfoCon>
//     );
//   } else if (!isPageWide) {
//     return (
//       <ProjectInfoCon>
//         <Grid2>
//           <ProjectTitleCon>
//             <Link to={uid}>{data2.project_title.text}</Link>
//           </ProjectTitleCon>
//           <ProjectLocationYearCon>
//             <p>{data2.location.text}</p>
//             <p>{data2.year.text}</p>
//           </ProjectLocationYearCon>
//         </Grid2>
//       </ProjectInfoCon>
//     );
//   }
// };
