import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: true,
  faqs: []
}

export const getFaqs = createAsyncThunk( 'faqs/fetch', async (_, thunkApi) => {
  const uri = thunkApi.getState().settings.serverUri + '/faqs'

  try{
      const res = await axios.post(uri)
      return res.data.faqs
    } catch(error){ }
} )

const FaqsSlice = createSlice({
  name: 'faqs',
  initialState,
  extraReducers: builder => {
    builder
      .addCase( getFaqs.fulfilled, (state, action) => {
        state.faqs = action.payload
        state.loading = false
      } )
  }
})

export const faqsSelector = state => state.faqs.faqs
export default FaqsSlice.reducer