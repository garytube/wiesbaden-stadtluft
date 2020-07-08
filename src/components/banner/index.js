import React, { useRef, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import videoA from '../../TEST_SCREENING_FULL_HD_VARIANTE_A.mp4';
import videoB from '../../TEST_SCREENING_FULL_HD_VARIANTE_B.mp4';

export default function Banner({ no2, time }) {
  const [showInfoBox, setShowInfoBox] = useState(false);
  const props = useSpring({ opacity: showInfoBox ? 1 : 0 });
  const videoPlayer = useRef();

  useEffect(() => {
    const videoToPlay = no2 > 30 ? videoA : videoB;
    videoPlayer.current.src = videoToPlay;
    videoPlayer.current.addEventListener('timeupdate', handleTimeUpdate);
  }, [no2]);

  function handleTimeUpdate() {
    const { currentTime } = videoPlayer.current;
    setShowInfoBox(currentTime > 12.5 && currentTime < 18 ? true : false);
  }

  return (
    <>
      <animated.div style={props} className="info">
        ️{'NO2-Belastung in µg/m'}
        <h1>{Number(no2).toFixed(0)}</h1>
        {`Wiesbaden, ${time} Uhr`}
      </animated.div>
      <video autoPlay loop muted ref={videoPlayer} />
    </>
  );
}
