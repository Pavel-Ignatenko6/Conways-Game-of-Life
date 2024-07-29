import './styleButtonsPanel.css'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { runningValue, toggleRunning } from './state/runningSlice.js'
import { resetGen } from './state/generationCountSlice.js'

export const ButtonsPanel = ({ resetGameField, setGridHandler }) => {
  const dispatch = useDispatch()
  const running = useSelector(runningValue)
  return (
    <div className="buttons-panel">
      <button className="check-rules-btn btn">
        <Link to="/rules">Check rules</Link>
      </button>
      <button
        className="clear-btn btn"
        onClick={() => {
          if (running) {
            dispatch(toggleRunning())
          }
          setGridHandler([resetGameField()])
          dispatch(resetGen())
        }}
      >
        Clear
      </button>
      <button className="settings-btn btn">
        <Link to="/settings">Settings</Link>
      </button>
    </div>
  )
}
