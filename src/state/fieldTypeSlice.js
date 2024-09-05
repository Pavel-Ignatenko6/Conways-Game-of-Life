import { createSlice } from "@reduxjs/toolkit";

const fieldTypeSlice = createSlice({
    name: 'fieldType',
    initialState: {
        value: 'canvas'
    },
    reducers: {
        setFieldType: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setFieldType } = fieldTypeSlice.actions
export default fieldTypeSlice.reducer

export const fieldTypeValue = state => state.fieldType.value