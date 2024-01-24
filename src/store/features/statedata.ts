import { createSlice } from '@reduxjs/toolkit'

const initialState: {data: any} = {data: null}

  const statedataSlice = createSlice({
    name: 'statedata',
    initialState,
    reducers: {
        setStateData(state, action){
            state.data = action.payload
          },
    },
  })
  
export const { setStateData } = statedataSlice.actions

export default statedataSlice.reducer
