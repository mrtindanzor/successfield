import { useEffect, useState, useReducer } from "react";
import useServerUri from "../../Contexts/serverContexts/baseServer";
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
    let c = [jwtDecode(res.mix)]
    const courses = c[0].courses
    coursesDispatch({ type: ACTIONS.ADD_COURSES, courses: c[0] })
    updateCoursesList(courses)
  }

  function getCourse(searchCourse, place){
    
    let data = ''
    switch(place){
      case 'course':
        data = COURSES.courses.find(course => course.course === searchCourse)
        break

      case 'modules':
        
        data = COURSES.modules.filter(module => module.courseCode === searchCourse)
        break

      case "benefits":
        data = COURSES.benefits.find(benefit => benefit.courseCode === searchCourse).benefits
        break
        
      case "outlines":
        data = COURSES.outlines.find(outline => outline.courseCode === searchCourse).outlines   
          break
          
      case "objectives":
        data = COURSES.objectives.find(objective => objective.courseCode === searchCourse).objectives
          break
    }
    
    return data
  }

  function updateCoursesList(allCourses){
    const filtered = []
    allCourses.map((course) => {
      filtered.push({ course: course.course, courseCode: course.courseCode})
    })
    setCoursesList([...filtered])
  }

  function getModule(courseCode, title){
    let module = COURSES.modules.find(module => module.courseCode === courseCode && module.title === title)
    return module
  }

  return  { coursesList, getCourse, getModule, setRefreshCourses }
}