import { createSlice } from '@reduxjs/toolkit'

const runningSlice = createSlice({
  name: 'running',
  initialState: {
    value: false,
  },
  reducers: {
    toggleRunning: state => {
      state.value = !state.value
    },
  },
})

export const { toggleRunning } = runningSlice.actions
export default runningSlice.reducer

export const runningValue = state => state.running.value
