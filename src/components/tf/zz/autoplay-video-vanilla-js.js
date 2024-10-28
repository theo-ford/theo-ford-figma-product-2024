import React, { useEffect, useState, useRef, useCallback } from "react";

export const AutoPlayVideo = ({ srcProps, posterProps }) => {
  // https://stackoverflow.com/questions/58341787/intersectionobserver-with-react-hooks
  const autoplayVideoRef = useRef(null);

  const isOnScreen = useOnScreen(autoplayVideoRef);

  const [videoSrcState, setVideoSrcState] = useState("");

  console.log(srcProps);
  console.log({ isOnScreen });
  // if (isOnScreen == true) {
  //   setVideoSrcState(srcProps);
  // }
  useEffect(() => {
    if (isOnScreen == true) {
      console.log("testing true");
      setVideoSrcState(srcProps);
      autoplayVideoRef.current.load();
      autoplayVideoRef.current.play();
    }
  }, [isOnScreen]);

  return (
    <video
      playsInline
      autoPlay
      muted
      loop
      ref={autoplayVideoRef}
      poster={posterProps}
    >
      <source
        type="video/mp4"
        // data-src={srcProps}
        src={videoSrcState}
      />
    </video>
  );
};
