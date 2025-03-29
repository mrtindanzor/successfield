import { useEffect, useState } from "react";
import useServerUri from "../../Contexts/serverContexts/baseServer";
import { jwtDecode } from 'jwt-decode'

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
    let c = [jwtDecode(res.courses)]
    c = Object.values(c[0])
    c = c.filter((course, i) => c.length !== i + 1)
    updateCoursesList(c)
    return setCourses(c)
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