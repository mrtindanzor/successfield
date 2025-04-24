import { useEffect, useState, useReducer } from "react";
import useServerUri from "../Contexts/baseServer";
import { jwtDecode } from 'jwt-decode'

const ACTIONS = {
  ADD_COURSES: 'fetch_courses'
}

function coursesReducer(state, action){
  
  switch (action.type) {
    case ACTIONS.ADD_COURSES:
      return action.courses
  
    default:
      return state
  }
}

export default function useCourse(){
  const [ COURSES, coursesDispatch ] = useReducer(coursesReducer, {})
  const [coursesList, setCoursesList] = useState([])
  const [ refreshCourses, setRefreshCourses ] = useState(false)
  
  const serverUri = useServerUri()

  useEffect(() => console.log(COURSES), [COURSES])
  
  useEffect(() => {
    fetchCourses()
  },[])

  useEffect(() =>{
    if(refreshCourses){
      fetchCourses()
        .then(res => {
          setRefreshCourses(false)
        })
    }
  }, [refreshCourses])

  async function fetchCourses(){
    const uri = serverUri + 'courses'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const method = 'POST'
    const response = await fetch(uri, { method, headers})
    if(!response.ok) return coursesDispatch({ type: 'failed' })
    const res = await response.json()
    const courses = res.courses
    coursesDispatch({ type: ACTIONS.ADD_COURSES, courses })
    updateCoursesList(courses)
  }

  function getCourse(searchCourse){
    return COURSES.find(course => course.course === searchCourse)
  }

  function updateCoursesList(allCourses){
    const filtered = []
    allCourses.map((course) => {
      filtered.push({ course: course.course, courseCode: course.courseCode})
    })
    setCoursesList([...filtered])
  }

  return  { coursesList, getCourse, setRefreshCourses }
}