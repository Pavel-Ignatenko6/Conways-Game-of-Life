import './App.css';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// components
import { ButtonsPanel } from './ButtonsPanel.jsx';
import { Controls } from './Controls.jsx';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { runningValue, toggleRunning, setRunning } from './state/runningSlice.js';
import { decrementGen, incrementGen, resetGen, generationValue } from './state/generationCountSlice.js';
import { inputNumValue } from './state/inputNumSlice.js';
import { numRowsColsValue } from './state/numRowsColsSlice.js';
import { fieldTypeValue } from './state/fieldTypeSlice.js';
import { svgTypeValue } from './state/svgTypeSlice.js';
// helpers
import { addToLocalStorage, getFromLocalStorage } from './helpers/handleLocalStorage.js';
import { checkCells } from './helpers/checkCells.js';
// svgs
import bearIcon from './assets/cells/bear-icon.svg';
import catIcon from './assets/cells/cat-icon.svg';
import duckIcon from './assets/cells/duck-icon.svg';
import foxIcon from './assets/cells/fox-icon.svg';

function App() {
  // redux states values
  const dispatch = useDispatch();
  const genCount = useSelector(generationValue);
  const running = useSelector(runningValue);
  const inputValue = useSelector(inputNumValue);
  const rowsColsVal = useSelector(numRowsColsValue);
  const fieldTypeVal = useSelector(fieldTypeValue);
  const svgTypeVal = useSelector(svgTypeValue);

  const numRows = rowsColsVal.rows;
  const numCols = rowsColsVal.cols;

  const location = useLocation();

  const resetGameField = useCallback(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(new Array(numCols).fill(0));
    }
    return rows;
  }, [numRows, numCols]);

  // local state
  const [grids, setGrid] = useState(() => {
    return [resetGameField()];
  });

  const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];

  const cellSvgs = [
    ['bearIcon', bearIcon],
    ['catIcon', catIcon],
    ['duckIcon', duckIcon],
    ['foxIcon', foxIcon],
  ];

  const currentGrid = grids[grids.length - 1];

  useMemo(() => {
    const modals = ['/settings', '/rules', '/records'];
    // check if modal is active and change overflow style
    const isOpened = modals.some(modal => location.pathname.includes(modal));
    isOpened ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'auto');
    // pause the game when modal is opened
    isOpened ? dispatch(setRunning(false)) : undefined;
  }, [location.pathname]);

  const setGridHandler = useCallback(
    newGrid => {
      setGrid(newGrid);
    },
    [setGrid]
  );

  // reset game field when rows and cols change
  useEffect(() => {
    dispatch(toggleRunning(false));
    setGrid([resetGameField()]);
    dispatch(resetGen());
  }, [rowsColsVal]);

  const handleRecords = () => {
    if (genCount === 0) {
      return;
    }
    // get records from local storage
    const records = getFromLocalStorage('records');
    if (records) {
      // add records if local storage exists
      addToLocalStorage('records', [...records, genCount]);
    } else {
      // ... else create one
      addToLocalStorage('records', [genCount]);
    }
  };

  const step = useCallback(
    prevGrid =>
      prevGrid.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            let newI = i + x;
            let newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += prevGrid[newI][newJ];
            }
          });

          if (neighbors < 2 || neighbors > 3) {
            return 0;
          } else if (cell === 0 && neighbors === 3) {
            return 1;
          } else {
            return cell;
          }
        })
      ),
    [grids]
  );

  const deadCells = useMemo(() => checkCells(currentGrid), [currentGrid]);

  // start game and move it forward by a step

  const stepForward = useCallback(() => {
    dispatch(incrementGen());
    setGrid([...grids, step(grids[grids.length - 1])]);

    // stop game if all cells are dead
    if (deadCells) {
      dispatch(toggleRunning(false));
      // add a record to the local storage
      handleRecords();
      dispatch(resetGen());
    }
  }, [grids, step, deadCells]);

  const stepBack = useCallback(() => {
    if (genCount === 0) {
      return;
    }
    dispatch(decrementGen());
    // delete the last grid from the array of arrays
    setGrid(grids.slice(0, -1));
  }, [genCount, grids]);

  useEffect(() => {
    let id;

    if (running) {
      id = setInterval(stepForward, inputValue.speed);
    }
    return () => {
      clearInterval(id);
    };
  }, [running, stepForward]);

  const handleIconStyle = useCallback(
    aliveCell => {
      if (fieldTypeVal === 'canvas') {
        return { background: aliveCell ? 'yellow' : undefined };
      } else {
        return { background: aliveCell ? 'transparent' : undefined };
      }
    },
    [fieldTypeVal]
  );

  const handleTextSvgRender = useCallback(
    grid => {
      if (fieldTypeVal === 'text' && grid) {
        return Math.ceil(Math.random() * 10);
      }
      if (fieldTypeVal === 'svg' && grid) {
        return cellSvgs.map(([name, svg]) =>
          name === svgTypeVal ? (
            <img
              key={svg}
              src={svg}
              alt={name}
            />
          ) : undefined
        );
      }
    },
    [fieldTypeVal, svgTypeVal]
  );

  return (
    <>
      <Outlet />
      <div className='field-background'>
        <div className='grid-field-container'>
          <div
            className='grid-field'
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${numCols}, 20px)`,
            }}
          >
            {currentGrid.map((rows, r) =>
              rows.map((col, c) => {
                return (
                  <div
                    className={fieldTypeVal === 'canvas' ? 'grid-cell' : fieldTypeVal === 'text' ? 'grid-cell-text' : 'grid-cell-svg'}
                    key={r + c}
                    onClick={() => {
                      const newGrid = [...currentGrid];
                      newGrid[r][c] = currentGrid[r][c] ? 0 : 1;
                      setGrid([...grids.slice(0, -1), newGrid]);
                    }}
                    style={handleIconStyle(currentGrid[r][c])}
                  >
                    {handleTextSvgRender(currentGrid[r][c])}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <Controls
          stepForward={stepForward}
          stepBack={stepBack}
        />
      </div>
      <ButtonsPanel
        resetGameField={resetGameField}
        setGridHandler={setGridHandler}
      />
    </>
  );
}

export default App;
