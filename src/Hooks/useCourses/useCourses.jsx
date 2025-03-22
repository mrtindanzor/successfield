import { createContext, useContext, useEffect, useState } from "react";

const CoursesContext = createContext()

export default function CoursesProvider({ children }){
  const [Courses, setCourses] = useState([])
  const [coursesList, setCoursesList] = useState([])

  useEffect(() =>{
    fetchCourses()
  }, [])


  async function fetchCourses(){
    const uri = 'http://localhost:8000/courses'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const method = 'POST'
    const response = await fetch(uri, { method, headers})
    if(!response.ok) return setCourses([])
    const res = await response.json()
    updateCoursesList(res.courses)
    return setCourses(res.courses)
  }

  function getCourse(searchCourse){
    const course =  Courses.find(course => course.course === searchCourse)
    return course
  }

  function getModule(searchCourse){
    const course =  Courses.find(course => course.course === searchCourse)
    return course.modules
  }

  function updateCoursesList(allCourses){
    const filtered = []
    allCourses.map((course) => {
      filtered.push({ course: course.course})
    })
    setCoursesList([...filtered])
  }

  return (
    <CoursesContext.Provider value={ { coursesList, getCourse, getModule } }>
      { children }
    </CoursesContext.Provider>
  )
}

export function useCourses(){ return useContext(CoursesContext) }