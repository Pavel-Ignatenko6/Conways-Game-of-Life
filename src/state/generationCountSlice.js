import { createSlice } from '@reduxjs/toolkit'

const generationCountSlice = createSlice({
  name: 'generationCount',
  initialState: {
    value: 0,
  },
  reducers: {
    incrementGen: state => {
      state.value += 1
    },
    decrementGen: state => {
      state.value -= 1
    },
    resetGen: state => {
      state.value = 0
    },
  },
})

export const { incrementGen, decrementGen, resetGen } = generationCountSlice.actions
export default generationCountSlice.reducer

export const generationValue = state => state.generationCount.value
