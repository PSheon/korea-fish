// ** Redux Imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// ** Types
import { IInitialState } from 'src/types/mint/uiTypes'

const initialState: IInitialState = {
  mintProcessLoading: false,
  likeDialogShow: false,
  dislikeDialogShow: false
}

const uiSlice = createSlice({
  name: 'mint/ui',
  initialState,
  reducers: {
    setMintProcessLoading: (state, action: PayloadAction<boolean>) => {
      state.mintProcessLoading = action.payload
    },
    showLikeDialog: state => {
      state.likeDialogShow = true
    },
    hideLikeDialog: state => {
      state.likeDialogShow = true
    },
    showDislikeDialog: state => {
      state.dislikeDialogShow = true
    },
    hideDislikeDialog: state => {
      state.dislikeDialogShow = true
    }
  },
  extraReducers: {}
})

export const { setMintProcessLoading, showLikeDialog, hideLikeDialog, showDislikeDialog, hideDislikeDialog } =
  uiSlice.actions

export default uiSlice.reducer
