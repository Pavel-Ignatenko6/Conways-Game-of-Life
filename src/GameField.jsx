import { Outlet } from 'react-router-dom';
import { Controls } from './Controls.jsx';

export const GameField = ({
  stepForward,
  stepBack,
  handleCellClick,
  handleIconStyle,
  handleTextSvgRender,
  numCols,
  currentGrid,
  fieldTypeVal,
}) => {
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
                    key={`${r}-${c}`}
                    onClick={handleCellClick.bind(null, currentGrid, r, c)}
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
    </>
  );
};
