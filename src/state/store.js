import { configureStore } from '@reduxjs/toolkit'
import runningReducer from './runningSlice'
import generationCountReducer from './generationCountSlice'

export const store = configureStore({
    reducer: {
        running: runningReducer,
        generationCount: generationCountReducer,
    },
})