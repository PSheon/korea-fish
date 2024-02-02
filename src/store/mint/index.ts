// ** Redux Imports
import { combineReducers } from '@reduxjs/toolkit'

// ** Slice imports
import phase from './phaseSlice'
import ui from './uiSlice'

const mintReducers = combineReducers({
  phase,
  ui
})

export default mintReducers
