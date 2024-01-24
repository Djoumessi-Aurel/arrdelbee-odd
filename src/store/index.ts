import { configureStore } from '@reduxjs/toolkit'
import localiteReducer from '@/store/features/localite'
import projetReducer from '@/store/features/projet'
import oddReducer from '@/store/features/odd'


export const store = configureStore({
  reducer: {
    localite: localiteReducer,
    projet: projetReducer,
    odd: oddReducer,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;