import { createSlice } from "@reduxjs/toolkit";

const generationCountSlice = createSlice({
    name: 'generationCount',
    initialState: {
        value: 0,
    },
    reducers: {
        nextStep: (state) => {
            state.value += 1
        },
        prevStep: (state) => {
            state.value -= 1
        },
        reset: (state) => {
            state.value = 0
        }
    }
})

export const { nextStep, prevStep, reset } = generationCountSlice.actions;
export default generationCountSlice.reducer;

export const generationValue = (state) => state.generationCount.value;