import { useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setLoader
 } from '../Slices/settingsSlice'
import { 
  coursesListSelector,
  coursesSelector,
  fetchCourses,
 } from '../Slices/coursesSlice'
import { 
  userSelector,
  refreshTokens,
  addUserCourses,
  getStudentCourses,
  getUserCertificates,
  logout
 } from '../Slices/userSlice'
import usePersister from '../utils/Persister'

export default function SetDependencies({ children }){
  const [ persitCourses ] = usePersister()
  const [ persitCoursesList ] = usePersister()
  const dispatch = useDispatch()
  const { isLoggedIn, loading, token } = useSelector( userSelector )
  const coursesList = useSelector( coursesListSelector )
  const courses = useSelector( coursesSelector )
  const intervalId = useRef()

  const getMyCourses = useCallback( async () => {
    if(isLoggedIn){
      dispatch( getUserCertificates() )
      coursesList.length > 0 && dispatch( getStudentCourses() )
    }
  }, [isLoggedIn, coursesList])

  useEffect(() => {
    if(coursesList && coursesList.length > 0) persitCoursesList('coursesList', coursesList)
    if(courses && courses.length > 0) persitCourses('courses', courses)
  }, [coursesList, courses])
  
  useEffect( () => {
    dispatch( fetchCourses() )
    dispatch( refreshTokens() )
      .then(() => dispatch( setLoader(false) ))
  },[])

  useEffect(() => {
    if(isLoggedIn && !token) dispatch( logout() )
  }, [token])

  useEffect(() => {
    if(token) intervalId.current = setInterval(() =>  dispatch( refreshTokens() ), 14 * 60 * 1000)
    if(!token && intervalId.current) clearInterval( intervalId.current )
    getMyCourses()

    return () => intervalId.current && clearInterval( intervalId.current )
  },[isLoggedIn, token, loading])

  return children
}