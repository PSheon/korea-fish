// ** Redux Imports
import { combineReducers } from '@reduxjs/toolkit'

// ** Slice imports
import ui from './uiSlice'

const mintReducers = combineReducers({
  ui
})

export default mintReducers
