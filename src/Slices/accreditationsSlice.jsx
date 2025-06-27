import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import usePersister from '../utils/Persister'

const [ persitAccreditations, getPersistedAccreditations ] = usePersister()
const initialState = {
  accreditations: getPersistedAccreditations('accreditations') ?? [],
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
        persitAccreditations('accreditations', action.payload)
      } )
  }
})

export const accreditationsSelector = state => state.accreditations
export default AccreditationsSlice.reducer