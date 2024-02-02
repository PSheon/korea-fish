// ** Redux Imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// ** Types
import { IInitialState } from 'src/types/mint/uiTypes'

const initialState: IInitialState = {
  mintProcessLoading: false
}

const uiSlice = createSlice({
  name: 'mint/ui',
  initialState,
  reducers: {
    setMintProcessLoading: (state, action: PayloadAction<boolean>) => {
      state.mintProcessLoading = action.payload
    }
  },
  extraReducers: {}
})

export const { setMintProcessLoading } = uiSlice.actions

export default uiSlice.reducer
