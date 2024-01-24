import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_root, localite_root } from '@/constants/api'
import { Localite } from '@/types'

const initialState: {status: string, array: Localite[]} = {
    status: 'idle',
    array: [],
  }

export const getLocalites = createAsyncThunk('localite/getLocalites', async () => {
    const response = await axios.get(API_root + localite_root)
    return response.data
  })

  const localiteSlice = createSlice({
    name: 'localite',
    initialState,
    reducers: {
        addLocalite(state, action){
            state.array.push(action.payload)
          },
        updateLocalite(state, action){
            let index = state.array.findIndex((value) => value.id == action.payload.id)
            if(index != -1) state.array[index] = action.payload
          },
        deleteLocalite(state, action){
            state.array = state.array.filter((value) => value.id != action.payload)
          }
    },
    extraReducers: builder => {
      builder
        .addCase(getLocalites.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getLocalites.fulfilled, (state, action) => {
          state.array = action.payload
          state.status = 'loaded'
        })
        .addCase(getLocalites.rejected, (state, action) => {
            state.status = 'idle'
        })
        
    }
  })
  
export const { addLocalite, updateLocalite, deleteLocalite } = localiteSlice.actions

export default localiteSlice.reducer
