import { useState } from 'react'
import './App.css'
import { Header } from './layout/Header.jsx'
import { Footer } from './layout/Footer.jsx'
import { ButtonsPanel } from './ButtonsPanel.jsx'
import  { Controls }  from './Controls.jsx'
export function App() {
  const numCols = 75
  const numRows = 25

  const [grid, setGrid] = useState(() => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }
    console.log(rows)
    return rows
  })

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
        <Controls />
      </div>
      <ButtonsPanel />
      <Footer />
    </>
  )
}
