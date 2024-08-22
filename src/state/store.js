import { configureStore } from '@reduxjs/toolkit'
import runningReducer from './runningSlice'
import generationCountReducer from './generationCountSlice'
import inputNumReducer from './inputNumSlice'
import showModalReducer from './showModalSlice'

export const store = configureStore({
  reducer: {
    running: runningReducer,
    generationCount: generationCountReducer,
    inputNum: inputNumReducer,
    showModal: showModalReducer,
  },
})
