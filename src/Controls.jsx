import React from 'react';
import './styleControls.css';
import { Slider } from './Slider/Slider.jsx';

import { useState } from 'react';
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

  const [coords, setCoords] = useState({ x: 1100, y: 400 });
  const [newCoords, setNewCoords] = useState({ x: 0, y: 0 });

  const onMouseMove = e => {
    setCoords({ x: e.clientX, y: e.clientY });
    setNewCoords({ x: coords.x + e.clientX, y: coords.y + e.clientY });
  };

  const onMouseUp = e => {
    document.removeEventListener('mousemove', onMouseMove);
  };

  const onMouseDown = e => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      className='controls-panel'
      style={{
        top: coords.y + 'px',
        left: coords.x + 'px',
        offsetTop: newCoords.y + 'px',
        offsetLeft: newCoords.x + 'px',
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
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
