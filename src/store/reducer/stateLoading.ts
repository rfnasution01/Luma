import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateLoadingType = {
  isShow: boolean
}

const initialState: StateLoadingType = {
  isShow: false,
}

const stateLoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setStateLoading: (state, action: PayloadAction<StateLoadingType>) => {
      const { isShow } = action.payload
      state.isShow = isShow
    },
  },
})

export const { setStateLoading } = stateLoadingSlice.actions

export const getLoadingSlice = (state: { stateLoading: StateLoadingType }) =>
  state.stateLoading

export default stateLoadingSlice.reducer
