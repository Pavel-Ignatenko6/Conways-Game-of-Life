import { useCallback, useState, useRef, useEffect } from 'react'
import './App.css'
import { Header } from './layout/Header.jsx'
import { Footer } from './layout/Footer.jsx'
import { ButtonsPanel } from './ButtonsPanel.jsx'
import { Controls } from './Controls.jsx'

import { useDispatch, useSelector } from 'react-redux'
import { runningValue, toggleRunning } from './state/runningSlice.js'
import { decrementGen, incrementGen, generationValue } from './state/generationCountSlice.js'

import { addToLocalStorage, getFromLocalStorage } from './helpers/handleLocalStorage.js'

function App() {
  const numCols = 75
  const numRows = 25

  // добавить state в редакс или найти способ добавить setGrid в пропсы
  const [grid, setGrid] = useState(() => {
    return resetGameField()
  })

  // a state value from the store
  const dispatch = useDispatch()
  const running = useSelector(runningValue)
  const genCount = useSelector(generationValue)

  // a reference to the state value to avoid unnecessary re-renders
  const runningRef = useRef(running)
  runningRef.current = running

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

  function resetGameField() {
    const rows = []
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows
  }

  useEffect(() => {
    addToLocalStorage(genCount, grid)
  }, [genCount, grid])

  const stepForward = () => {
    dispatch(incrementGen())
    setGrid(prevGrid => {
      const updatedGrid = prevGrid.map((row, i) =>
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
      addToLocalStorage(genCount, updatedGrid)
      return updatedGrid
    })
  }

  const stepBack = () => {
    const prevGrid = getFromLocalStorage(genCount - 1)
    setGrid(prevGrid)
  }

  const startGame = useCallback(() => {
    // if the state from the store is false
    if (!runningRef.current) {
      return
    }
    // play the game
    stepForward()
    setTimeout(startGame, 100)
  }, [])

  return (
    <>
      <Header />
      <div
        className="grid-field"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, r) => {
          return rows.map((col, c) => {
            return (
              <div
                className="grid-cell"
                key={r + c}
                onClick={() => {
                  const newGrid = [...grid]
                  newGrid[r][c] = grid[r][c] ? 0 : 1
                  setGrid(newGrid)
                }}
                style={{ backgroundColor: grid[r][c] ? 'yellow' : undefined }}
              ></div>
            )
          })
        })}
        <Controls startGame={startGame} runningRef={runningRef} stepForward={stepForward} stepBack={stepBack} />
      </div>
      <ButtonsPanel resetGameField={resetGameField} setGrid={setGrid} />
      <Footer />
    </>
  )
}

export default App
