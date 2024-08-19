import { createSlice } from '@reduxjs/toolkit'

const inputNumSlice = createSlice({
  name: 'inputNum',
  initialState: {
    speed: 50,
    zoom: 50,
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
