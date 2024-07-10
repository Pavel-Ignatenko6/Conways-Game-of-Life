import './styleButtonsPanel.css'

import { useDispatch, useSelector } from 'react-redux'
import { runningValue, toggleRunning } from './state/runningSlice.js'

export const ButtonsPanel = ({ resetGameField, setGrid }) => {
  const dispatch = useDispatch()
  const running = useSelector(runningValue)
  return (
    <div className="buttons-panel">
      <button className="check-rules-btn btn">Check rules</button>
      <button className="clear-btn btn" onClick={() => {
        if (running) {
          dispatch(toggleRunning(false));
          setGrid(resetGameField());
        } else {
          setGrid(resetGameField());
        }
        }}>
        Clear
      </button>
      <button className="settings-btn btn">Settings</button>
    </div>
  )
}
