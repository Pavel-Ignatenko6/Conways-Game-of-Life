import { createSlice } from '@reduxjs/toolkit'

const inputNumSlice = createSlice({
  name: 'inputNum',
  initialState: {
    speed: 250,
    zoom: 250,
  },
  reducers: {
    setInputNum: (state, action) => {
      return state = {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { setInputNum } = inputNumSlice.actions
export default inputNumSlice.reducer

export const inputNumValue = state => state.inputNum
