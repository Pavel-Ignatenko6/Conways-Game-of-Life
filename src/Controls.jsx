import './styleControls.css'
import { Slider } from './Slider/Slider.jsx'

import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { runningValue, toggleRunning } from './state/runningSlice.js'
import { decrementGen, generationValue } from './state/generationCountSlice.js'

// icons
import generationIcon from './assets/users-solid.svg'
import prevNextIcon from './assets/forward-solid.svg'
import playIcon from './assets/play-solid.svg'
import pauseIcon from './assets/pause-solid.svg'
import speedIcon from './assets/gauge-high-solid.svg'
import zoomIcon from './assets/magnifying-glass-solid.svg'

export const Controls = ({ startGame, stepBack }) => {
  const dispatch = useDispatch()
  const running = useSelector(runningValue)
  const genCount = useSelector(generationValue)

  // a reference to the state value to avoid unnecessary re-renders
  const runningRef = useRef(running)
  runningRef.current = running

  return (
    <div className="controls-container">
      <div className="generation-number flex-container">
        <img className="single-icon" src={generationIcon} alt="generation icon" />
        <span>{genCount}</span>
      </div>
      {/* main controls */}
      <div className="main-controls flex-container">
        <img
          className="previous-icon controls-icon"
          src={prevNextIcon}
          alt="arrow left"
          onClick={() => {
            dispatch(decrementGen())
            stepBack()
          }}
        />

        {/* play / Stop icons */}
        {running ? (
          <img
            className="controls-icon"
            src={pauseIcon}
            alt="pause icon"
            onClick={() => {
              if (running) {
                dispatch(toggleRunning())
              }
            }}
          />
        ) : (
          <img
            className="play-icon controls-icon"
            src={playIcon}
            alt="play icon"
            onClick={() => {
              dispatch(toggleRunning())
              if (!running) {
                runningRef.current = true
                startGame(dispatch)
              }
            }}
          />
        )}
        {/* end of play / Stop icons */}

        <img
          className="next-icon controls-icon"
          src={prevNextIcon}
          alt="arrow right"
          onClick={() => {
            if (running) {
              dispatch(toggleRunning())
            }
            startGame(dispatch)
          }}
        />
      </div>
      {/* slider controls */}
      <div className="slider-controls flex-container">
        {/* put two sliders here */}
        <div className="single-slider">
          <img className="single-icon" src={speedIcon} alt="speed icon" />
          <Slider />
        </div>
        <div className="single-slider">
          <img className="single-icon" src={zoomIcon} alt="zoom icon" />
          <Slider />
        </div>
      </div>
    </div>
  )
}
