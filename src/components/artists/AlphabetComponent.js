import React from 'react';
import { useScrollRestoration } from "gatsby";
import {
  createHistory,
  LocationProvider
} from "@reach/router"



export default function AlphabetComponent(content, index, finalResult) {
  console.log(content);
  const alphabetScrollRestoration = useScrollRestoration(`alphabet-component-alphabet-children`)
  
  const alphabet = finalResult.map((content, index) => {    
    const alphabetChildren = content.children.map((content, index) => {
      return (
        <div key={index} {...alphabetScrollRestoration}>
          <a 
            href={content.node.uid}
          >
            <h1
              className="artist-title"
              id={content.node.data.artist_title.text}
            >
              {" "}
              {content.node.data.artist_title.text}
            </h1>
          </a>
        </div>
      );
    });
    return (
      
        <div id={`group-${content.group}`} key={content.group} > 
          {alphabetChildren}
        </div>

    );
  });    
}