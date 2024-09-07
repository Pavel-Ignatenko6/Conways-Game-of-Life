import { createSlice } from '@reduxjs/toolkit';

const numRowsColsSlice = createSlice({
  name: 'numRowsCols',
  initialState: {
    rows: 35,
    cols: 75,
  },
  reducers: {
    setNumRowsCols: (state, action) => {
      const { rows, cols } = action.payload;
      return {
        ...state,
        rows: rows ? parseInt(rows) : state.rows,
        cols: cols ? parseInt(cols) : state.cols,
      };
    },
  },
});

export const { setNumRowsCols } = numRowsColsSlice.actions;
export default numRowsColsSlice.reducer;

export const numRowsColsValue = state => state.numRowsCols;
