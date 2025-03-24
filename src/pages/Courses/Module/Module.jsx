import { useEffect, useState } from 'react'
import useCourses from './../../../Contexts/CourseContext/CoursesContext'
import styles from './Module.module.css'
import { useParams } from 'react-router-dom'
import { formatUrl } from '../../../core'

export default function Module(){
  let { course, module } = useParams()
  module = Number(module)
  let searchCourse = course && formatUrl(course)
  const { getModule, coursesList } = useCourses()
  const [modules, setModules] = useState()
  const [currentModule, setCurrentModule] = useState()

  useEffect(() => {
    if(coursesList && coursesList.length > 0){
      setModules(() => {
        let m = getModule(searchCourse)
        return m.sort((x, y) => x.index - y.index)
      }) 
    }
  }, [course, coursesList])

  useEffect(() => {
    modules && setCurrentModule( modules.find( modules => modules.index === module) )
  }, [modules])


  return (
    <>
      { currentModule && <h1> { currentModule.title } </h1> }
    </>
  )
}
