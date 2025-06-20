import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  accreditations: [],
  loading: true,
}

export const getAccreditations = createAsyncThunk( 'accreditations/get', async (_, thunkApi) => {
  const uri = thunkApi.getState().settings.serverUri + '/get_accreditations'

  try{
      const res = await axios.post(uri)
      return res.data.accreditations
    } catch(error){ }
} )

const AccreditationsSlice = createSlice({
  name: 'accreditations',
  initialState,
  extraReducers: builder => {
    builder
      .addCase( getAccreditations.fulfilled, (state, action) => {
        state.accreditations = action.payload
        state.loading = false
      } )
  }
})

export const accreditationsSelector = state => state.accreditations
export default AccreditationsSlice.reducer