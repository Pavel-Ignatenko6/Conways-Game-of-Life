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
    setRunning: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { toggleRunning, setRunning } = runningSlice.actions
export default runningSlice.reducer

export const runningValue = state => state.running.value
