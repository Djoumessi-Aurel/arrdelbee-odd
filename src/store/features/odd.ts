import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_root, odd_root } from '@/constants/api'
import { Odd } from '@/types'

const initialState: {status: string, array: Odd[]} = {
    status: 'idle',
    array: [],
  }

export const getOdds = createAsyncThunk('odd/getOdds', async () => {
    const response = await axios.get(API_root + odd_root)
    return response.data
  })

  const oddSlice = createSlice({
    name: 'odd',
    initialState,
    reducers: {
        addOdd(state, action){
            state.array.push(action.payload)
          },
        updateOdd(state, action){
            let index = state.array.findIndex((value) => value.id_odd == action.payload.id_odd)
            if(index != -1) state.array[index] = action.payload
          },
        deleteOdd(state, action){
            state.array = state.array.filter((value) => value.id_odd != action.payload)
          }
    },
    extraReducers: builder => {
      builder
        .addCase(getOdds.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getOdds.fulfilled, (state, action) => {
          state.array = action.payload
          state.status = 'loaded'
        })
        .addCase(getOdds.rejected, (state, action) => {
            state.status = 'idle'
        })
        
    }
  })
  
export const { addOdd, updateOdd, deleteOdd } = oddSlice.actions

export default oddSlice.reducer
