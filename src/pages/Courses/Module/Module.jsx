import { useEffect, useMemo, useState, useCallback } from 'react'
import useCourses from './../../../Contexts/CourseContext/CoursesContext'
import { PendingLoading } from './../../../Hooks/Loader/PendingLoader/PendingLoader'
import { useParams, useSearchParams } from 'react-router-dom'
import { formatUrl } from '../../../core'
import formatNotesToJSX from '../../../Components/AutoFormatNotes'
import styles from './Module.module.css'

export default function Module(){
  const ACTIONS = useMemo(() => ({
    GO_BACK: 'go_back',
    GO_FORWARD: 'next_page'
  }), [])
  const moduleContainerClasses = useMemo(() => {
    const m = 'grid gap-3 px-5 py-10 md:max-w-[90%] mx-auto'
    return m
  }, [])
  const [ modules, setModules ] = useState()
  const [ currentModule, setCurrentModule ] = useState()
  const [ currentPage, setCurrentPage ] = useSearchParams()
  let { course, module } = useParams()
  course = useMemo(() => formatUrl(course), [course])
  module = useMemo(() => formatUrl(module), [module])
  const { getCourse, coursesList} = useCourses()

  const navigatePage = useCallback((action) => {
    const modulesLength = modules.length - 1
    let currentIndex = Number(currentPage.get('m') ?? 0)

    switch(action.type){
      case ACTIONS.GO_BACK:
        if(currentIndex === 0) return
        currentIndex -= 1
        setCurrentPage({ m: currentIndex.toString() })
      break

      case ACTIONS.GO_FORWARD:
        if(currentIndex === modulesLength) return
        currentIndex += 1
        setCurrentPage({ m: currentIndex.toString() })
      break

      default:
      break

    }
  }, [modules, currentPage])
  
  useEffect(() => {
    if(coursesList){
      const thisCodeSearch = coursesList.find( newcourse => newcourse.course === course)
      let programmeModules 
      if(thisCodeSearch) programmeModules = getCourse(thisCodeSearch.courseCode, 'modules')
      if(programmeModules) setModules(programmeModules)
    }
  }, [coursesList])

  useEffect(() => {
    if(modules){
      const newModule = modules.find(mod => mod.title.toLowerCase() === module )
      setCurrentModule(newModule)
    }
  }, [modules])

  return (
    <div className={ `${styles.container} ${moduleContainerClasses}` }>
      { !currentModule && <PendingLoading /> }
      { currentModule && currentModule.notes.length && currentModule.notes.map(( note, index ) => {
        return formatNotesToJSX(note)
      }) }
    </div>
  )
}
