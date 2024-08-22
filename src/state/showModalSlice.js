import { createSlice } from '@reduxjs/toolkit'

const showModalSlice = createSlice({
  name: 'showModal',
  initialState: {
    value: false,
  },
  reducers: {
    toggleShowModal: state => {
      state.value = !state.value
      console.log(state.value);
    },
  }
})

export const { toggleShowModal } = showModalSlice.actions
export default showModalSlice.reducer

export const showModalValue = state => state.showModal.value

