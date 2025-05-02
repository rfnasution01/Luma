import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateTabType = {
  menu: string
}

const initialState: StateTabType = {
  menu: '',
}

const stateTabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setStateTab: (state, action: PayloadAction<StateTabType>) => {
      const { menu } = action.payload
      state.menu = menu
    },
  },
})

export const { setStateTab } = stateTabSlice.actions

export const getTabSlice = (state: { stateTab: StateTabType }) => state.stateTab

export default stateTabSlice.reducer
