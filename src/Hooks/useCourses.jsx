import { useEffect, useState, useReducer } from "react";
import useServerUri from "../Contexts/baseServer";
import axios from "axios";

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
  
  useEffect(() => {
    fetchCourses()
  },[])

  useEffect(() =>{
    if(refreshCourses){
      fetchCourses()
        .then(() => {
          setRefreshCourses(false)
        })
    }
  }, [refreshCourses])

  async function fetchCourses(){
    
    try{
      const uri = serverUri + 'courses'
      const res = await axios.post(uri)
      const courses = res.data.courses
      coursesDispatch({ type: ACTIONS.ADD_COURSES, courses })
      updateCoursesList(courses)
    } catch(err){}
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