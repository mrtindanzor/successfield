import { useEffect, useMemo, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  coursesListSelector,
  getCourse
 } from '../../../Slices/coursesSlice'
import { Loading } from '../../../Components/Loader'
import { useParams, useSearchParams } from 'react-router-dom'
import { formatUrl } from '../../../core'
import formatNotesToJSX from '../../../Components/AutoFormatNotes'
import styles from './Module.module.css'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Module(){
  const dispatch = useDispatch()
  const ACTIONS = useMemo(() => ({
    GO_BACK: 'go_back',
    GO_FORWARD: 'next_page'
  }), [])
  const [ modules, setModules ] = useState()
  const [ currentPage, setCurrentPage ] = useSearchParams({ m: '0' })
  const currentModule = useMemo(() => currentPage.get('m'), [currentPage])
  const { course } = useParams()
  const formattedCourse = useMemo(() => formatUrl(course), [course])
  const coursesList = useSelector( coursesListSelector )
  const getModule = useCallback( async () => {
    const programmeModules = await dispatch( getCourse(formattedCourse) ).unwrap()
    if(programmeModules) setModules(programmeModules?.modules || [])
  }, [coursesList, formattedCourse] )
  const navigatePage = useCallback((action) => {
    window.scrollTo({ top: 0, behavior: 'auto' })
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
  }, [ modules, currentPage ])
  
  useEffect(() => {
    if(coursesList) getModule()
  }, [ coursesList, formattedCourse ])

  return (
  <div 
    className={ `${styles.container} grid gap-3 px-5 py-10 md:max-w-[90%] mx-auto` }>
    { !modules && <Loading /> }
    { modules && modules[currentModule]?.notes && 
      modules[currentModule].notes.map(( note, index ) => {
        return formatNotesToJSX(note)
      }) }
    { modules && modules[currentModule] && modules[currentModule].link && <div 
      className='w-full mt-10 md:max-w-[950px] h-auto mx-auto'>
        <iframe 
          src={ `https://www.youtube-nocookie.com/embed/${ modules[currentModule].link }` } 
          title={ `${ modules[currentModule].title }` } 
          allow="accelerometer; encrypted-media; gyroscope; controls;" 
          className="h-full w-full">
        </iframe>
      </div> }
    { modules && 
      <div
        className={ 'flex w-full pt-9 *:flex *:gap-2 *:border-2 *:items-center *:rounded *:text-white *:bg-gray-800 *:px-5 *:py-2 *:cursor-pointer *:hover:bg-gray-500' } >
          <button 
            className={ `${ currentModule == 0 ? '!hidden' : '' }` }
            onClick={ () => navigatePage({ type: ACTIONS.GO_BACK }) } > <ChevronLeft /> 
            Previous 
          </button>
          <button 
            className={ `ml-auto ${ currentModule == modules?.length - 1 ? '!hidden' : '' }` }
            onClick={ () => navigatePage({ type: ACTIONS.GO_FORWARD }) }> 
            Next 
            <ChevronRight />
          </button>
        </div>  }
    </div>
  )
}
