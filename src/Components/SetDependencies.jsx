import { useEffect, useCallback, useRef } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useSelector, useDispatch } from 'react-redux'
import {
  setLoader
 } from '../Slices/settingsSlice'
import { 
  coursesListSelector,
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

export default function SetDependencies({ children }){
  const dispatch = useDispatch()
  const { isLoggedIn, loading, token } = useSelector( userSelector )
  const coursesList = useSelector( coursesListSelector )
  const intervalId = useRef()

  const getMyCourses = useCallback( async () => {
    if(isLoggedIn){
      dispatch( getUserCertificates() )
      coursesList.length > 0 && dispatch( getStudentCourses() )
    }
  }, [isLoggedIn, coursesList])
  
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