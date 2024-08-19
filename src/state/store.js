import { configureStore } from '@reduxjs/toolkit'
import runningReducer from './runningSlice'
import generationCountReducer from './generationCountSlice'
import inputNumReducer from './inputNumSlice'

export const store = configureStore({
  reducer: {
    running: runningReducer,
    generationCount: generationCountReducer,
    inputNum: inputNumReducer,
  },
})
