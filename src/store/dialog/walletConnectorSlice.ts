// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Types
import { IInitialState } from 'src/types/dialog/walletConnectorTypes'

const initialState: IInitialState = {
  show: false
}

const walletConnectorSlice = createSlice({
  name: 'dialog/walletConnector',
  initialState,
  reducers: {
    showWalletConnectorDialog: state => {
      state.show = true
    },
    hideWalletConnectorDialog: state => {
      state.show = false
    }
  },
  extraReducers: {}
})

export const { showWalletConnectorDialog, hideWalletConnectorDialog } = walletConnectorSlice.actions

export default walletConnectorSlice.reducer
