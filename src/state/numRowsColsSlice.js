import { createSlice } from '@reduxjs/toolkit'

const numRowsColsSlice = createSlice({
  name: 'numRowsCols',
  initialState: {
    rows: 35,
    cols: 75,
  },
  reducers: {
    setNumRowsCols: (state, action) => {
      return (state = {
        ...state,
        ...action.payload,
      })
    },
  },
})

export const { setNumRowsCols } = numRowsColsSlice.actions
export default numRowsColsSlice.reducer

export const numRowsColsValue = state => state.numRowsCols
