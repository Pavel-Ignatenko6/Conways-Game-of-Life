import React from 'react';
import './styleControls.css';
import { Slider } from './Slider/Slider.jsx';

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { runningValue, toggleRunning } from './state/runningSlice.js';
import { generationValue } from './state/generationCountSlice.js';
// icons
import generationIcon from './assets/users-solid.svg';
import prevNextIcon from './assets/forward-solid.svg';
import playIcon from './assets/play-solid.svg';
import pauseIcon from './assets/pause-solid.svg';
import speedIcon from './assets/gauge-high-solid.svg';
import zoomIcon from './assets/magnifying-glass-solid.svg';

export const Controls = ({ stepForward, stepBack }) => {
  const dispatch = useDispatch();
  const running = useSelector(runningValue);
  const genCount = useSelector(generationValue);
  const controlsRef = useRef(null);

  const [coords, setCoords] = useState({ x: 1200, y: 400 });

  const handleControlsDrag = e => {
    if (e.target !== controlsRef.current) {
      return;
    }
    //  calculate the difference between the mouse cursor's position and the top-left of controls
    let shiftX = e.clientX - controlsRef.current.getBoundingClientRect().left;
    let shiftY = e.clientY - controlsRef.current.getBoundingClientRect().top;

    const onMouseMove = e => {

      const maxX = window.innerWidth - controlsRef.current.getBoundingClientRect().width;
      const maxY = window.innerHeight - controlsRef.current.getBoundingClientRect().height;

      // setting coords in the min and max range
      setCoords({
        x: Math.min(Math.max(e.clientX - shiftX, 0), maxX),
        y: Math.min(Math.max(e.clientY - shiftY, 0), maxY),
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={controlsRef}
      className='controls-panel'
      style={{
        top: coords.y + 'px',
        left: coords.x + 'px',
      }}
      onMouseDown={handleControlsDrag}
    >
      <div className='generation-number flex-container'>
        <img
          className='single-icon'
          src={generationIcon}
          alt='generation icon'
        />
        <span>{genCount}</span>
      </div>
      {/* main controls */}
      <div className='main-controls flex-container'>
        <img
          className='previous-icon controls-icon'
          src={prevNextIcon}
          alt='arrow left'
          onClick={() => {
            if (running) {
              dispatch(toggleRunning());
            }
            stepBack();
          }}
        />
        {/* play / Stop icons */}
        {running ? (
          <img
            className='controls-icon'
            src={pauseIcon}
            alt='pause icon'
            onClick={() => dispatch(toggleRunning())}
          />
        ) : (
          <img
            className='play-icon controls-icon'
            src={playIcon}
            alt='play icon'
            onClick={() => dispatch(toggleRunning())}
          />
        )}
        {/* end of play / Stop icons */}
        <img
          className='next-icon controls-icon'
          src={prevNextIcon}
          alt='arrow right'
          onClick={() => {
            if (running) {
              dispatch(toggleRunning());
            }
            stepForward();
          }}
        />
      </div>
      <div className='slider-controls flex-container'>
        <Slider
          icon={speedIcon}
          name={'speed'}
        />
        <Slider
          icon={zoomIcon}
          name={'zoom'}
        />
      </div>
    </div>
  );
};
