// ** Redux Imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// ** Types
import { IInitialState, IShowMintHintDialogPayload } from 'src/types/dialog/mintHintTypes'

const initialState: IInitialState = {
  show: false,
  type: 'init',
  title: 'Minted Successfully',
  description: 'Congratulations! You have Minted successfully.',
  hash: 'hash'
}

const mintHintSlice = createSlice({
  name: 'dialog/mintHint',
  initialState,
  reducers: {
    showMintHintDialog: (state, action: PayloadAction<IShowMintHintDialogPayload>) => {
      state.show = true
      state.type = action.payload.type
      state.title = action.payload.title ?? ''
      state.description = action.payload.description ?? ''
      state.hash = action.payload.hash ?? ''
    },
    hideMintHintDialog: state => {
      state.show = false
      state.type = 'init'
      state.title = ''
      state.description = ''
      state.hash = ''
    }
  },
  extraReducers: {}
})

export const { showMintHintDialog, hideMintHintDialog } = mintHintSlice.actions

export default mintHintSlice.reducer
