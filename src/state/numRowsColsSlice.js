import { createSlice } from '@reduxjs/toolkit';

const numRowsColsSlice = createSlice({
  name: 'numRowsCols',
  initialState: {
    rows: 30,
    cols: 30,
  },
  reducers: {
    setNumRowsCols: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setNumRowsCols } = numRowsColsSlice.actions;
export default numRowsColsSlice.reducer;

export const numRowsColsValue = state => state.numRowsCols;
