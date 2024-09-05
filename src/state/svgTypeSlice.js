import { createSlice } from '@reduxjs/toolkit';

const svgTypeSlice = createSlice({
  name: 'svgType',
  initialState: {
    value: 'bearIcon',
  },
  reducers: {
    setSvgType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSvgType } = svgTypeSlice.actions;
export default svgTypeSlice.reducer;

export const svgTypeValue = state => state.svgType.value