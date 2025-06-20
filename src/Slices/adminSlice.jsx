import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  applications: {
    applications: [],
    total: 0,
    loading: true,
  },
  students: {
    students: [],
    total: 0,
    loading: true,
  },
}

export const getApplications = createAsyncThunk( 'applications/get', async (_, thunkApi) => {
  const uri = thunkApi.getState().settings.serverUri + '/users/applications'
  try {
    const res = await axios.post(uri, {}, { withCredentials: true })
    return res.data
  } catch (error) {
    return thunkApi.rejectWithValue(error.message)
  }
} )
export const removeApplication = createAsyncThunk( 'applications/remove', async (payload, thunkApi) => {
  const uri = thunkApi.getState().settings.serverUri + '/users/applications/edit'
  const studentNumber = payload
  const operation = 'decline'

  try{
    const res = await axios.post(uri, { operation, studentNumber }, { withCredentials: true })
    if(res.data.status === 200) return res.data
    return thunkApi.rejectWithValue(res.data.msg || 'Error removing application')
  } catch(error){
    return thunkApi.rejectWithValue(error.message || 'Error removing application')
  }
} )
export const approveApplication = createAsyncThunk( 'applications/approve', async (payload, thunkApi) => {
  const uri = thunkApi.getState().settings.serverUri + '/users/applications/edit'
  const studentNumber = payload
  const operation = 'approve'

  try{
    const res = await axios.post(uri, { operation, studentNumber }, { withCredentials: true })
    if(res.data.status === 200) return res.data
    return thunkApi.rejectWithValue(res.data.msg || 'Error adding application')
  } catch(error){
    return thunkApi.rejectWithValue(error.message || 'Error adding application')
  }
} )
export const getStudents = createAsyncThunk( 'students/get', async (_, thunkApi) => {
  const uri = thunkApi.getState().settings.serverUri + '/users/students'
  try {
    const res = await axios.post(uri, {}, { withCredentials: true })
    return res.data
  } catch (error) {
    return thunkApi.rejectWithValue(error.message)
  }
} )

const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  extraReducers: builder => {
    builder
      .addCase( getApplications.fulfilled, ( state, action ) => {
        state.applications.applications = action.payload.applications
        state.applications.total = action.payload.applications.length
        state.applications.loading = false
      } )
      .addCase( removeApplication.fulfilled, ( state, action ) => {
        state.applications.applications = state.applications.applications.filter( applicant => applicant.studentNumber !== action.payload.studentNumber )
        state.applications.loading = false
        state.applications.total = state.applications.total - 1
      } )
      .addCase( approveApplication.fulfilled, ( state, action ) => {
        state.applications.applications = state.applications
          .applications.filter( applicant => applicant.studentNumber !== action.payload.studentNumber )
        state.applications.loading = false
        state.applications.total = state.applications.total - 1
      } )
      .addCase( getStudents.fulfilled, ( state, action ) => {
        state.students.students = action.payload.students.map( student => ({ ...student, isVisble: true }) )
        state.students.total = action.payload.students.length
        state.students.loading = false
      } )
  }
})

export const applicationsSelector = state => state.admin.applications
export const studentsSelector = state => state.admin.students
export default AdminSlice.reducer