import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  courses: [],
  coursesList: [],
}

export const fetchCourses = createAsyncThunk('courses/get', async (payload, thunkApi) => {
  try{
      const uri = thunkApi.getState().settings.serverUri + '/courses'
      const res = await axios.post(uri, {}, { withCredentials: true })
      const courses = res.data.courses
      return courses
    } catch(err){ }
})
export const addCourse = createAsyncThunk('courses/add', async (payload, thunkApi) => {
  try{
      const uri = thunkApi.getState().settings.serverUri + '/courses'
      const course = payload
      const res = await axios.patch(uri, { operation: 'add', ...course }, { withCredentials: true })
      if(res.data.status === 201) return { ...res.data, course }
      throw Error(res.data.msg || 'Something went wrong')
    } catch(error){
      return thunkApi.rejectWithValue( error.message || 'Something went wrong')
    }
})
export const editCourse = createAsyncThunk('courses/edit', async (payload, thunkApi) => {
  try{
      const uri = thunkApi.getState().settings.serverUri + '/courses'
      const course = payload
      const res = await axios.patch(uri, { operation: 'edit', ...course }, { withCredentials: true })
      if(res.data.status === 201) return { ...res.data, course }
      throw Error(res.data.msg)
    } catch(error){
      return thunkApi.rejectWithValue( error.message || 'Something went wrong')
    }
})
export const deleteCourse = createAsyncThunk('courses/remove', async (payload, thunkApi) => {
   try{
      const uri = thunkApi.getState().settings.serverUri + '/courses'
      const courseCode = payload.courseCode
      const res = await axios
        .patch(uri, { operation: 'delete', courseCode }, { withCredentials: true })
      if(res.data.status === 201) return { ...res.data, courseCode }
      throw Error(res.data.msg || 'Something went wrong')
    } catch(error){
      return thunkApi.rejectWithValue( error.message || 'Something went wrong')
    }
})
export const getCourse = createAsyncThunk('courses/getCourse', (payload, thunkApi) => {
  const courses = thunkApi.getState().courses.courses
  const course = courses.find( c => c.course === payload)
  return course
})
export const moduleOperation = createAsyncThunk('modules/operation', async (payload, thunkApi) => {
  const uri = thunkApi.getState().settings.serverUri + '/modules'
  const res = await axios.patch(uri, payload, { withCredentials: true })
  return { ...res.data, ...payload }
})

export const getCourseByCode = createAsyncThunk('courses/getCourseByCourseCode', async (payload, thunkApi) => {
  const courses = await thunkApi.getState().courses.courses
  const course = await courses.find( c => c.courseCode === payload)
  return course
})

const CoursesSlice = createSlice({
  name: 'courses',
  initialState,
  extraReducers: builder => {
    builder
      .addCase( fetchCourses.fulfilled, (state, action) => {
        if(action.payload && action.payload.length > 0){
          state.courses = action.payload
          state.coursesList = action.payload.map( course => ({
            _id: course._id,
            course: course.course,
            courseCode: course.courseCode 
          }))
        }
      } )
      .addCase( addCourse.fulfilled, (state, action) => {
        const course = action.payload.course
        state.courses.push(course)
        state.coursesList.push({ 
          _id: course._id,
          course: course.course,
          courseCode: course.courseCode
         })
      } )
      .addCase( deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses
          .filter( course => course.courseCode !== action.payload.courseCode )
        state.coursesList = state.coursesList
          .filter( course => course.courseCode !== action.payload.courseCode )
      } )
      .addCase( editCourse.fulfilled, (state, action) => {
        const _prev = action.payload.course.previousCourseCode
        const _c = action.payload.course
        _c.previousCourseCode = _c.courseCode
        state.courses = state.courses
          .map( course => {
            if(course.courseCode !== _prev ) return course
            return _c
          } )
        state.coursesList = state.coursesList
          .map( course => {
            if(course.courseCode !== _prev ) return course
            return _c
          } )
      } )
      .addCase( moduleOperation.fulfilled, (state, action) => {
        const modules = action.payload.modules
        const failed = action.payload.failed
        const courseCode = modules[0].courseCode
        
       switch(action.payload.operation){
        case 'edit':
           state.courses = state.courses
            .map( course => {
              if(course.courseCode !== courseCode ) return course
              return {
                ...course,
                modules: modules
                  .map( module => {
                    if(failed){
                      const c = failed.find( f => f.title === module.title.trim().toLowerCase() )
                      if(c) return c
                    }
                    return module
                  } )
              }
            } )
        break

        case 'add':
          if(action.payload.status !== 201 ) return 
           state.courses = state.courses
            .map( course => {
              if(course.courseCode !== courseCode ) return course
              return {
                ...course,
                modules: {  ...course.modules, ...modules }
              }
            } )
        break
       }
      } )
  }
})

export const coursesListSelector = state => state.courses.coursesList
export const coursesSelector = state => state.courses.courses
export default CoursesSlice.reducer