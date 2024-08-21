import { useState, useEffect } from 'react'
import './App.css'
import { ButtonsPanel } from './ButtonsPanel.jsx'
import { Controls } from './Controls.jsx'

import { useDispatch, useSelector } from 'react-redux'
import { runningValue, toggleRunning } from './state/runningSlice.js'
import { decrementGen, incrementGen, resetGen, generationValue } from './state/generationCountSlice.js'
import { inputNumValue } from './state/inputNumSlice.js'

import { Outlet } from 'react-router-dom'

function App() {
  const numCols = 75
  const numRows = 35

  const genCount = useSelector(generationValue)

  const [grids, setGrid] = useState(() => {
    return [resetGameField()]
  })

  // a state value from the store
  const dispatch = useDispatch()
  const running = useSelector(runningValue)
  const inputValue = useSelector(inputNumValue)

  const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ]

  const currentGrid = grids[grids.length - 1]

  function setGridHandler(newGrid) {
    setGrid(newGrid)
  }

  function resetGameField() {
    const rows = []
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows
  }

  // check if all cells are dead
    const checkCells = () => {
      return currentGrid.every(row =>
        row.every(cell => cell === 0)
      )
    }

  const step = prevGrid =>
    prevGrid.map((row, i) =>
      row.map((cell, j) => {
        let neighbors = 0
        operations.forEach(([x, y]) => {
          let newI = i + x
          let newJ = j + y
          if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
            neighbors += prevGrid[newI][newJ]
          }
        })

        if (neighbors < 2 || neighbors > 3) {
          return 0
        } else if (cell === 0 && neighbors === 3) {
          return 1
        } else {
          return cell
        }
      })
    )

  // start game and move it forward by a step
  const stepForward = () => {
    dispatch(incrementGen())
    setGrid([...grids, step(grids[grids.length - 1])])
    
    // stop game if all cells are dead
    if (checkCells()) {
      dispatch(toggleRunning(false))
      dispatch(resetGen())
    }
  }

  const stepBack = () => {
    if (genCount === 0) {
      return
    }
    dispatch(decrementGen())
    // delete the last grid from the array of arrays
    setGrid(grids.slice(0, -1))
  }

  useEffect(() => {
    let id

    if (running) {
      id = setInterval(stepForward, inputValue.speed)      
    }
    return () => {
      clearInterval(id)
    }
  }, [running, stepForward])

  return (
    <>
      <Outlet />
      <div className="grid-field-container">
        <div
          className="grid-field"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCols}, 20px)`,
          }}
        >
          {currentGrid.map((rows, r) =>
            rows.map((col, c) => {
              return (
                <div
                  className="grid-cell"
                  key={r + c}
                  onClick={() => {
                    const newGrid = [...currentGrid]
                    newGrid[r][c] = currentGrid[r][c] ? 0 : 1
                    setGrid([...grids.slice(0, -1), newGrid])
                  }}
                  style={{ backgroundColor: currentGrid[r][c] ? 'yellow' : undefined }}
                ></div>
              )
            })
          )}
          <Controls stepForward={stepForward} stepBack={stepBack} checkCells={checkCells} />
        </div>
      </div>
      <ButtonsPanel resetGameField={resetGameField} setGridHandler={setGridHandler} />
    </>
  )
}

export default App
