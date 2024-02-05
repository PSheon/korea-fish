// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import dialog from 'src/store/dialog'
import mint from 'src/store/mint'

// ** Api
import { projectApi } from 'src/store/api/project'

export const store = configureStore({
  reducer: {
    dialog,
    mint,
    [projectApi.reducerPath]: projectApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([projectApi.middleware])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
