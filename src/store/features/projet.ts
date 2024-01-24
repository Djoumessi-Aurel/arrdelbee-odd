import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_root, projet_root } from '@/constants/api'
import { Projet } from '@/types'

const initialState: {status: string, array: Projet[]} = {
    status: 'idle',
    array: [],
  }

export const getProjets = createAsyncThunk('projet/getProjets', async () => {
    const response = await axios.get(API_root + projet_root)
    return response.data
  })

  const projetSlice = createSlice({
    name: 'projet',
    initialState,
    reducers: {
        addProjet(state, action){
            state.array.push(action.payload)
          },
        updateProjet(state, action){
            let index = state.array.findIndex((value) => value.id == action.payload.id)
            if(index != -1) state.array[index] = action.payload
          },
        deleteProjet(state, action){
            state.array = state.array.filter((value) => value.id != action.payload)
          }
    },
    extraReducers: builder => {
      builder
        .addCase(getProjets.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getProjets.fulfilled, (state, action) => {
          state.array = action.payload
          state.status = 'loaded'
        })
        .addCase(getProjets.rejected, (state, action) => {
            state.status = 'idle'
        })
        
    }
  })
  
export const { addProjet, updateProjet, deleteProjet } = projetSlice.actions

export default projetSlice.reducer
