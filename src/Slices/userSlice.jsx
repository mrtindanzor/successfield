import axios from "axios"
import { jwtDecode } from 'jwt-decode'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const stringPattern = /^[\w\s.,-]+$/
const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
  certificates: null,
  userPhoto: null,
  userFullName: null,
  loading: true,
  courses: null,
  error: null
}
export const refreshTokens = createAsyncThunk('user/refresh', async (_, thunkApi) => {
  const uri = thunkApi.getState().settings.serverUri + '/users/newToken'
  try {
    const res = await axios.post(uri, {},{ withCredentials: true })

    if(res.data.token) return res.data
    throw Error(res.data.msg || 'Something went wrong')
    
  } catch (error) {
    return thunkApi.rejectWithValue(error.message || 'Something went wrong')
  }
})
export const registration = async credentials => {
    let {
      programme,
      firstname,
      middlename,
      surname,
      birthDate,
      gender,
      address,
      nationalId,
      userImage,
      phoneNumber,
      email,
      educationLevel,
      contact,
      password,
      cpassword,
      serverUri
    } = credentials

    if(contact !== '') return { msg: 'Unable to complete registration at this time', status: 403, currentForm: 1 }
    if(!firstname) return { msg: 'Enter your first name', status: 403, currentForm: 1 }
    if(firstname.length < 3) return { msg: 'First name too short', status: 403, currentForm: 1 }
    if(!stringPattern.test(firstname)) return { msg: 'First name contains invalid characters', status: 403, currentForm: 1 }
    if(middlename && middlename.length < 2) return { msg: 'Middle name too short', status: 403, currentForm: 1 }
    if(middlename && !stringPattern.test(middlename)) return { msg: 'middle name contains invalid characters', status: 403, currentForm: 1 }
    if(!surname) return { msg: 'Enter your surname', status: 403, currentForm: 1 }
    if(surname.length < 3) return { msg: 'Surname too short', status: 403, currentForm: 1 }
    if(!stringPattern.test(surname)) return { msg: 'Surname contains invalid characters', status: 403, currentForm: 1 }
    if(!gender) return { msg: 'Select your gender', status: 403, currentForm: 1 }
    if(!programme) return { msg: 'Select a programme', status: 403, currentForm: 2 }
    if(!educationLevel) return { msg: 'Select your highest level of education', status: 403, currentForm: 2 }
    if(!nationalId) return { msg: 'Select an identification document', status: 403, currentForm: 2 }
    if(!userImage) return { msg: 'Add a passport photo', status: 403, currentForm: 2  }
    if(!address.country) return { msg: 'Add your country', status: 403, currentForm: 3 }
    if(!address.state) return { msg: 'Add your region', status: 403, currentForm: 3 }
    if(!address.city) return { msg: 'Add your city', status: 403, currentForm: 3 }
    if(!address.address1) return { msg: 'Add your street address', status: 403, currentForm: 3 }
    if(!phoneNumber) return { msg: 'Enter a valid phone number', status: 403, currentForm: 3 }
    if(!email) return { msg: 'Enter your email address', status: 403, currentForm: 4 }
    if(!emailPattern.test(email)) return { msg: 'Email address contains invalid characters', status: 403, currentForm: 4 }
    if(!password) return { msg: 'Enter a password', status: 403, currentForm: 4 }
    if(password.length < 8) return { msg: 'Password must not be less than 8 characters', status: 403, currentForm: 4 }
    if(password !== cpassword) return { msg: 'Passwords do not match', status: 403, currentForm: 4 }


    const uri = serverUri + '/users/register'
    const formdata = new FormData()
    for(const key in credentials){
      if( key === 'address' ){
        formdata.append(key, JSON.stringify(credentials[key]))
        continue
      }
      formdata.append(key, credentials[key])
    }

    try{
      const res = await axios.put(uri, formdata )
      return res.data
    } 
      catch(err){
        return { msg: err.message, status: 403 }
    }

}
export const getUserCertificates = createAsyncThunk('user/certificates', async (_, thunkApi) => {
  try {
      const uri = thunkApi.getState().settings.serverUri + '/certificate'
      const studentNumber = thunkApi.getState().auth.user.studentNumber
      const res = await axios.patch(uri, { studentNumber, operation: 'findCertificate' })
      if(res.data?.findCertificates.length > 0) return res.data.findCertificates
      throw Error(res.data.msg || 'Something went wrong')
    } catch (error) {
      return thunkApi.rejectWithValue(error.message || 'Something went wrong')
    }
})
export const logout = createAsyncThunk('user/logout', async (_, thunkApi) => {
  const uri = thunkApi.getState().settings.serverUri + '/users/logout'
  try{
    const res = await axios.post(uri, {}, { withCredentials: true })
    if(res.data.status === 200) return true
    throw Error(res.data.msg || 'Something went wrong')
  } catch(error){
    thunkApi.rejectWithValue(error.message)
  }
})
export const changeEmail = createAsyncThunk('user/changeEmail', async (payload, thunkApi) => {    
  const uri = thunkApi.getState().settings.serverUri + '/users/changeEmail'
  const email = thunkApi.getState().auth.user.email
  const newEmail = payload
    
  try{
    const res = await axios.post(uri, { email, newEmail }, { withCredentials: true } )
  if(res.data.status === 201 ) return { ...res.data, email: newEmail }
  } catch(error){
    return thunkApi.rejectWithValue(error.message || 'Something went wrong')
  }
})
export const changePassword = createAsyncThunk('user/changePassword', async (payload, thunkApi) => {    
  const uri = thunkApi.getState().settings.serverUri + '/users/changePassword'
  const email = thunkApi.getState().auth.user.email
  try{
    const res = await axios.post(uri, { email, ...payload }, { withCredentials: true } )
    if(res.data.status === 201 ) return { ...res.data }
    throw Error(res.data.msg || 'Something went wrong')
  } catch(error){
    thunkApi.rejectWithValue(error.message)
  }
})
export const changePhone = createAsyncThunk('user/changePhone', async (payload, thunkApi) => {    
  const uri = thunkApi.getState().settings.serverUri + '/users/changePhone'
  const email = thunkApi.getState().auth.user.email
    
  const res = await axios.post(uri, { email, ...payload }, { withCredentials: true } )
  return { ...res.data }
})
export const changeName = createAsyncThunk('user/changeName', async (payload, thunkApi) => {    
  const uri = thunkApi.getState().settings.serverUri + '/users/changeName'
  const email = thunkApi.getState().auth.user.email
    
  const res = await axios.post(uri, { email, ...payload }, { withCredentials: true } )
  return { ...res.data, ...payload }
})
export const login = createAsyncThunk('user/login', async (payload, thunkApi) => {
  const { email, password } = payload
  const uri = thunkApi.getState().settings.serverUri + '/users/login'
  try{
    if(!email) throw Error('Enter an email address')
    if(!password) throw Error('Enter your password')
    if(!emailPattern.test(email)) throw Error('Enter a valid email address')
    const res = await axios.post(uri, { email, password }, { withCredentials: true })
    if(res.data.status !== 200) throw Error( res.data.msg )
    return res.data
  } catch(error){
    return thunkApi.rejectWithValue({ status: 403, msg: error.message || 'Something went wrong' })
  }
})
export const getStudentCourses = createAsyncThunk('user/courses', async (payload, thunkApi) => {
  try {
      const uri = thunkApi.getState().settings.serverUri + '/users/courses'
      const res = await axios.post(uri, {}, { withCredentials: true })
      const coursesList = thunkApi.getState().courses.coursesList
      return { myCourses: res.data.courses, coursesList }
    } catch (err) {
      return thunkApi.rejectWithValue({ msg: err.message, status: 401 })
    }
})

const UserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { },
  extraReducers: builder => {
    builder
      .addCase( getUserCertificates.fulfilled, (state, action) => {
        state.certificates = action.payload
      } )
      .addCase( refreshTokens.fulfilled, (state, action) => {
        const user = jwtDecode(action.payload.token)
        delete user._id
        delete user.iat
        delete user.exp
        delete user.verificationCode
        delete user.isnew
        delete user.verified
        delete user.__v
        state.token = action.payload
        state.user = user
        state.userFullName = `${user.firstname} ${user.middlename} ${ user.surname }`
        state.userPhoto = user.userImage?.secure_url
        state.isLoggedIn = true
        state.loading = false
      } )
      .addCase( refreshTokens.rejected, (state, action) => {
        state.token = null
        state.loading = false
      } )
      .addCase( login.fulfilled, ( state, action ) => {
        const _n = action.payload
        state.token = _n.token
        state.userPhoto = _n.userImage?.secure_url
        state.isLoggedIn = true
        state.user = jwtDecode(_n.token)
      } )
      .addCase( logout.fulfilled, ( state, action ) => {
        state = initialState
        window.location.href = '/'
      } )
      .addCase( changeEmail.fulfilled, ( state, action ) => {
        if(action.payload.status){
          state.email = action.payload.email
          state.token = action.payload.token
        }
      } )
      .addCase( changeName.fulfilled, ( state, action ) => {
        const _n = action.payload
        state.userFullName = `${ _n.firstname } ${ _n.middlename } ${ _n.surname } `
        state.user.firstname =  _n.firstname
        state.user.middlename =  _n.middlename
        state.user.surname = _n.surname
      } )
      .addCase( changePhone.fulfilled, ( state, action ) => {
        state.user.phone = action.payload.phone
      } )
      .addCase( getStudentCourses.fulfilled, ( state, action ) => {
        const { myCourses, coursesList } = action.payload
        const _c = myCourses.map( code => coursesList.find( course => course.courseCode === code ).course )
        state.courses = _c
      } )
  }
})

export const userSelector = state => state.auth
export const { addUserCourses } = UserSlice.actions
export default UserSlice.reducer