import { useState, useEffect } from 'react'
import './App.css'
import { ButtonsPanel } from './ButtonsPanel.jsx'
import { Controls } from './Controls.jsx'

import { useDispatch, useSelector } from 'react-redux'
import { runningValue } from './state/runningSlice.js'
import { decrementGen, incrementGen } from './state/generationCountSlice.js'

import { Outlet } from 'react-router-dom'

function App() {
  const numCols = 75
  const numRows = 25

  // добавить state в редакс или найти способ добавить setGrid в пропсы
  const [grids, setGrid] = useState(() => {
    return [resetGameField()]
  })

  // a state value from the store
  const dispatch = useDispatch()
  const running = useSelector(runningValue)

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

  const step = prevGrid =>
    prevGrid.map((row, i) =>
      row.map((cell, j) => {
        let neighbors = 0
        operations.forEach(([x, y]) => {
          let updatedI = i + x
          let updatedJ = j + y
          if (updatedI >= 0 && updatedI < numRows && updatedJ >= 0 && updatedJ < numCols) {
            neighbors += prevGrid[updatedI][updatedJ]
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
  }

  const stepBack = () => {
    dispatch(decrementGen())
    // delete the last grid from the array of arrays
    setGrid(grids.slice(0, -1))
  }

  useEffect(() => {
    let id

    if (running) {
      id = setInterval(stepForward, 100)
    }
    return () => {
      clearInterval(id)
    }
  }, [running, stepForward])

  const currentGrid = grids[grids.length - 1]

  return (
    <>
    <Outlet />
      <div
        className="grid-field"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {currentGrid.map((rows, r) => {
          return rows.map((col, c) => {
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
        })}
        <Controls stepForward={stepForward} stepBack={stepBack} />
      </div>
      <ButtonsPanel resetGameField={resetGameField} setGridHandler={setGridHandler} />
    </>
  )
}

export default App
