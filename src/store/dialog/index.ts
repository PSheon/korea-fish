// ** Redux Imports
import { combineReducers } from '@reduxjs/toolkit'

// ** Slice imports
import walletConnector from 'src/store/dialog/walletConnectorSlice'
import mintHint from 'src/store/dialog/mintHintSlice'

const dialogReducers = combineReducers({
  walletConnector,
  mintHint
})

export default dialogReducers
