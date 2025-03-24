import { useEffect, useState } from "react";
import useServerUri from "../../Contexts/serverContexts/baseServer";

export default function useCourse(){
  const [Courses, setCourses] = useState([])
  const [coursesList, setCoursesList] = useState([])
  const serverUri = useServerUri()

  useEffect(() =>{
    fetchCourses()
  }, [])


  async function fetchCourses(){
    const uri = serverUri + 'courses'
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

  return  { coursesList, getCourse, getModule }
}