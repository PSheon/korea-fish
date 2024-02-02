// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import mint from 'src/store/mint'

export const store = configureStore({
  reducer: {
    mint
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
