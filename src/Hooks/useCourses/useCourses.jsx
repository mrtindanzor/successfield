import { useEffect, useState } from "react";
import useServerUri from "../../Contexts/serverContexts/baseServer";
import { jwtDecode } from 'jwt-decode'

export default function useCourse(){
  const [Courses, setCourses] = useState([])
  const [coursesList, setCoursesList] = useState([])
  const [ modules, setModules ] = useState([])
  const [ benefits, setBenefits ] = useState([])
  const [ objecives, setObjecives ] = useState([])
  const [ outlines, setOutlines ] = useState([])
  
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
    let c = [jwtDecode(res.mix)]
    const courses = c[0].courses
    const m = c[0].modules
    const b = c[0].benefits
    const out = c[0].outlines
    const obj = c[0].objectives
    updateCoursesList(courses)
    setModules(m)
    setBenefits(b)
    setOutlines(out)
    setObjecives(obj)
    return setCourses(courses)
  }

  function getCourse(searchCourse, place){
    let data = ''
    switch(place){
      case 'course':
        data = Courses.find(course => course.course === searchCourse)
        console.log(Courses)
        break

      case 'modules':
        data = modules.filter(module => module.courseCode === searchCourse)
        break

      case "benefits":
        data = benefits.find(benefit => benefit.courseCode === searchCourse)
        data = data.benefits
        data = [ ...Object.values(data) ]
        break
        
      case "outlines":
        data = outlines.find(outline => outline.courseCode === searchCourse)
        data = data.outlines
        data = [ ...Object.values(data) ]        
          break
          
        case "objectives":
          data = objecives.find(objective => objective.courseCode === searchCourse)
          data = data.objectives
          data = [ ...Object.values(data) ]
            break
    }
    return data
  }

  function updateCoursesList(allCourses){
    const filtered = []
    allCourses.map((course) => {
      filtered.push({ course: course.course})
    })
    setCoursesList([...filtered])
  }

  return  { coursesList, getCourse }
}