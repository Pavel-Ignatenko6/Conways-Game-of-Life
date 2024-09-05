import { configureStore } from '@reduxjs/toolkit';
import runningReducer from './runningSlice';
import generationCountReducer from './generationCountSlice';
import inputNumReducer from './inputNumSlice';
import numRowsColsReducer from './numRowsColsSlice';
import fieldTypeReducer from './fieldTypeSlice';
import svgTypeReducer from './svgTypeSlice';

export const store = configureStore({
  reducer: {
    running: runningReducer,
    generationCount: generationCountReducer,
    inputNum: inputNumReducer,
    numRowsCols: numRowsColsReducer,
    fieldType: fieldTypeReducer,
    svgType: svgTypeReducer,
  },
});
