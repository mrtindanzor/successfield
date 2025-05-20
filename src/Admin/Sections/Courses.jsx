// REACT //
import { useEffect, useReducer, useState } from 'react';

// OTHERS //
import useCourses from '../../Contexts/CoursesContext';
import { useSetAlert } from '../../Hooks/Alerter';
import usePendingLoader from '../../Contexts/PendingLoaderContext';
import useServerUri from '../../Contexts/baseServer';
import { ArrowBigLeftDash, ChevronDown, Info, Trash } from 'lucide-react';
import { useMemo } from 'react';
import usePrompter from './../Components/Prompt'

//tailwind classes for courses components
const formClasses = 'grid z-0 gap-5 relative bg-gray-200 my-10  px-2 sm:px-5 md:10 rounded-lg py-10 *:grid *:gap-3 *:p-2 *:w-[calc(100%-10px)] md:*:w-[calc(100%-20px)] mx-auto *:rounded *:*:first:font-bold *:*:text-lg'
const inputClasses = 'py-2 px-3 border-2 border-gray-600 rounded-lg block w-full'
const courseInputTitleClasses = "uppercase text-xl after:content-[':']"
const appendButtonClasses = "!w-fit px-4 py-2 text-3xl cursor-pointer text-white rounded bg-gray-950 ml-auto block"
const courseContainerClasses = "grid gap-3 w-[100%-10px] mx-auto border-t-8 border-t-gray-700 pt-5 *:first:font-bold *:first:text-3xl mt-5 mb-3"
const courseSelectorClasses = 'p-2 cursor-pointer hover:bg-gray-300 rounded font-semibold text-lg border-1 border-gray-900 '
const coursesDropdownClasses = 'bg-gray-100 *:p-2 *:border-b-1 *:border-b-gray-500 *:hover:bg-green-300 font-normal '
const submitButtonClasses = "w-[90%] !max-w-[200px] font-bold text-2xl h-fit block px-4 py-2 bg-gray-900 ml-auto cursor-pointer mt-5 hover:bg-gray-500 text-white rounded"
const labelClasses = "grid gap-2 *:first:uppercase *:first:font-bold"
const courseOperations = "*:w-[calc(100%-10px)] sm:*:w-[calc(100%-30px)] *:mx-auto :*max-w-[750px]"
const trashIconClasses = "!w-10 h-10 text-red-500 border-1 cursor-pointer bg-white border-red-500 rounded p-1 ml-auto hover:text-white hover:bg-red-500"


const ACTIONS = {
  MODULE: { 
    ADD_INPUT: 'add_input',
    ADD_NEW_MODULE: 'add_new_module',
    FILL_MAIN_INPUT: 'fill_main_input',
    FILL_SUB_INPUT: 'fill_sub_input',
    RESET_ERRORS: 'reset_errors',
    START_NEW_MODULE: 'start_new_module',
    FETCH_ERRORS: 'fetch_errors',
    DELETE_MODULE: 'delete_module', 
    SWITCH_COURSE: 'switch_course'
  },
  COURSE: {
    RESET_FORM: 'reset_form',
    ADD_INPUT: 'add_input_field',
    FILL_MAIN_INPUT: 'fill_input',
    FILL_SUB_INPUT: 'fill_sub_input',
    SET_PREVIOUS_COURSE_CODE: 'set_previous_course_code'
  }
}

export function Modules(){
  const sections = [
    {
      title: 'Add', section: <AddModule />
    },
    {
      title: 'Edit', section: <EditModule />
    }
  ]

  const [ currentSection, setCurrentSection ] = useState(0)
  const [ activeSection, setActiveSection ] = useState(sections[0].section)
  
  useEffect(() => {
    setActiveSection(sections[currentSection].section)
  }, [currentSection])
   
  return (
    <div > 
      <ul className="w-full grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mx-auto">
        {
          sections.map((section, index) => {
            return <li key={ section.title } className={`text-white bg-green-400 rounded cursor-pointer font-semibold text-xl py-1 px-3 ${ currentSection === index ? '!bg-green-700' : '' }`} onClick={ () => setCurrentSection(index) }> { section.title } </li>
          })
        }
      </ul>
      <div>
        {
        activeSection
      }
      </div>
      
    </div>
  )
}

export default function Courses(){
  return null
}

function coursesReducer(state, action){

  switch(action.type){

    case ACTIONS.COURSE.FILL_MAIN_INPUT:
      return {
        ...state,
        [action.position]: action.value
      }

    case ACTIONS.COURSE.FILL_SUB_INPUT:
      return {
        ...state,
        [action.position]: state[action.position].map(( item, itemIndex ) => {
          if(itemIndex !== action.index) return item
          return action.value
        })
      }

    case ACTIONS.COURSE.SET_PREVIOUS_COURSE_CODE:
      return {
        ...state,
        previousCourseCode: action.value
      }

    case ACTIONS.COURSE.RESET_FORM:
      return action.emptyCourse

    case ACTIONS.COURSE.ADD_INPUT:
      return {
        ...state,
        [action.position]: [ ...state[action.position], '' ]
      }

    default:
      return state
  }
}

function moduleReducer(state, action){
  
  switch(action.type){
    case ACTIONS.MODULE.SWITCH_COURSE:
      return action.currentModules.map( module => ({
        ...module,
        previousCourseCode: module.courseCode,
        previousTitle: module.title
      }) )

    case ACTIONS.MODULE.ADD_INPUT:
      return state.map( (module, mIndex) => {
        if(action.index !== mIndex) return module
        return {
          ...module,
          courseCode: state[0].courseCode,
          [action.position]: [...(module[action.position] || []), '']
        }
      })

    case ACTIONS.MODULE.FILL_SUB_INPUT:
      return state.map( (module, mIndex) => {
        if(mIndex !== action.index) return module
        return {
          ...module,

          [action.position]: [...(module[action.position] || [])].map((t, tIndex) => {
            if(tIndex !== action.arrIndex) return t
            return action.value
          })
        }
      })

    case ACTIONS.MODULE.FILL_MAIN_INPUT:
      return state.map((module, mIndex) => {
        if(mIndex !== action.index) return module
        return {
          ...module,
          [action.position]: action.value
        }
      })

    case ACTIONS.MODULE.RESET_ERRORS:
      return state.map(module => {
        return {
          ...module,
          reason: ''
        }
      })

    case ACTIONS.MODULE.FETCH_ERRORS:
      return action.modules

    case ACTIONS.MODULE.ADD_NEW_MODULE:
      return [...state, action.emptyModule]
      
    case ACTIONS.MODULE.START_NEW_MODULE:
      return [ action.emptyModule ]

    case ACTIONS.MODULE.DELETE_MODULE:
      return state.filter( module => module.title !== action.title )
  }
}

function toggleModuleList(e){
  e.target.parentElement.classList.toggle('*:not-first:hidden')
}

function AddMoreField({ position, type, index, dispatch, reverse, emptyModule, viewCourse  }){
  
  return  <span 
    onClick={ e => {
      e.preventDefault()
      dispatch({ type, emptyModule, position, index })
    } } className={ (reverse ? appendButtonClasses + ' !ml-[4px] !mr-auto' : appendButtonClasses) + ( viewCourse && ' hidden') }> + </span> 
}

function ModuleStructure({ currentModules, operation, courseCode }){
  const emptyModule = useMemo( () => ({
    courseCode,
    title: '',
    outline: '',
    link: '',
    topics: [''],
    notes: [''],
    objectives: ['']
  }), [ courseCode ])

  const { setRefreshCourses } = useCourses()
  const [ promptResponse, setPromptResponse ] = useState(null)
  const [ deleteModule, setDeleteModule ] = useState()
  const [ markedForDeletion, setMarkedForDeletion ] = useState([])
  const [ modules, modulesDispatch ] = useReducer(moduleReducer, [])
  const { prompterSetter } = usePrompter()

  const serverUri = useServerUri()
  const setMsg = useSetAlert()
  const { setIsPendingLoading } = usePendingLoader()

  useEffect(() => {
    if(operation === 'add') modulesDispatch({ type: ACTIONS.MODULE.START_NEW_MODULE , emptyModule })
  }, [courseCode])

  useEffect(() => {
    if(currentModules){
      modulesDispatch({ type: ACTIONS.MODULE.SWITCH_COURSE, currentModules })
    }
  }, [ currentModules ])

  useEffect(() => {
    if(promptResponse) {
      setMarkedForDeletion( m => [ ...m, deleteModule.module ])
      modulesDispatch({ type: ACTIONS.MODULE.DELETE_MODULE, title: deleteModule.module.title })
      setDeleteModule()
      setPromptResponse(null)
    }
  }, [promptResponse])

  async function handleModulesSubmit(e){
    e.preventDefault()
    
    setIsPendingLoading(true)
    modulesDispatch({ type: ACTIONS.MODULE.RESET_ERRORS })
    const uri = serverUri + 'modules'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const method = 'PATCH'
    const body = JSON.stringify({ modules, markedForDeletion, operation })
    const options = {
      headers,
      method,
      body
    }
    
    try {
      const response = await fetch(uri, options)
      if(!response.ok) throw Error('Something went wrong, try again')
      const res = await response.json()
      setMsg(res.msg)
      if(operation === 'add' && res.status === 201 ) modulesDispatch({ type: ACTIONS.MODULE.START_NEW_MODULE, emptyModule })
      if(res.failed && res.failed.length > 0) modulesDispatch({ type: ACTIONS.MODULE.FETCH_ERRORS, modules: res.failed })
      setRefreshCourses(true)
    } 
      catch (err) {
      setMsg(err.message)
    } 
      finally{
        setIsPendingLoading(false)
        
      }
  }
 
  return (
    <form className={ formClasses } onSubmit={ handleModulesSubmit }>
      {
        modules && modules.map((module, index) => {
          return (
          <div className='p2 grid pt-10 relative *:not-first:hidden' key={ index }>
            <span className="flex items-center relative justify-between py-1 px-2 bg-gray-950 text-white text-2xl rounded hover:bg-gray-800 before:content-[''] before:absolute before:inset-0 before:z-1" onClick={ e => toggleModuleList(e) }>
              <span>
              Module: { index + 1 }
              </span>
              <ChevronDown className='w-8 h-8' />
            </span>
            { module.reason && <span className="text-red-500 font-bold text-2xl uppercase flex items-center gap-1">
                                  <Info /> { module.reason }
                                  </span> 
            }
            { module.previousCourseCode && <Trash className={ trashIconClasses }
                                              onClick={
                                                () => {
                                                  prompterSetter({ 
                                                    message: `Are you sure you want to delete, ${ module.title }`, 
                                                    setter: setPromptResponse })
                                                  setDeleteModule({ module })
                                                }
                                              } /> }
            <ModuleList position='courseCode' title='Course code' { ...{ index, modules, operation, module, modulesDispatch } } />
            <ModuleList position='title' title='Title'  { ...{ index, operation, module, modulesDispatch } }  />
            <ModuleList position='outline' title='Outline'  { ...{ index, operation, module, modulesDispatch } }  />
            <ModuleList position='link' title='Video link'  { ...{ index, operation, module, modulesDispatch } }  />
            <ModuleSublist position='topics' { ...{ index, operation, module, modulesDispatch } } /> 
            <ModuleSublist position='notes' { ...{ index, operation, module, modulesDispatch } } /> 
            <ModuleSublist position='objectives' { ...{ index, operation, module, modulesDispatch } } />
          </div>
          )
        })
      }
      <hr />
      { operation === 'add' && <span className='font-semibold text-xl'>Add new module</span> }
      { operation === 'add' &&  <AddMoreField dispatch={ modulesDispatch } reverse type={ ACTIONS.MODULE.ADD_NEW_MODULE } emptyModule={ emptyModule } /> }
      <button className={ submitButtonClasses }> Apply Changes </button>
    </form>
  )
}

function CourseStructure({ currentCourse, setSelectedCourse, setCurrentCourse, operation }){
  const setMsg = useSetAlert()
  const { setRefreshCourses } = useCourses()
  const { setIsPendingLoading } = usePendingLoader()
  const [ promptResponse, setPromptResponse ] = useState(null)
  const { prompterSetter } = usePrompter()
  const emptyCourse = useMemo(() => ({
    course: '',
    courseCode: '',
    overview: '',
    fee: '',
    certificate: '',
    availability: '',
    duration: '',
    objectives: [''],
    benefits: [''],
    outlines: [''],
    previousCourseCode: ''
  }), [])
  const baseServer = useServerUri() 
  const uri = useMemo(() => baseServer  + 'courses', [baseServer])
  const [ course, courseDispatch ] = useReducer(coursesReducer, currentCourse || emptyCourse)

  async function handleCourseOperation(e){
    e.preventDefault()
    
    setIsPendingLoading(true)
    try {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const method = "PATCH"
      const body = JSON.stringify({ ...course, operation })
      const options = { 
        headers,
        method,
        body
       }

      const response = await fetch(uri, options)
      const res = await response.json()
      setMsg(res.msg)
      if(res.status === 201){
        setRefreshCourses(true)
        if(operation === 'add'){
          courseDispatch({ type: ACTIONS.COURSE.RESET_FORM, emptyCourse })
        }
          else {
            setCurrentCourse('')
            setSelectedCourse('')
          }
      }
    } 
      catch (err) {
        setMsg(err.msg)
      }
        finally{
          setIsPendingLoading(false)
        }
  }

  async function handleCourseDeletion() {
    try {
      setIsPendingLoading(true)
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const method = 'PATCH'
      const body = JSON.stringify({ courseCode: course.courseCode, operation: 'delete' })
      const response = await fetch(uri, { headers, method, body })
      if(!response.ok) setMsg('Something went wrong')
      const res = await response.json()
      setMsg(res.msg)
      if(res.status !== 201) return
      setRefreshCourses(true)
      setCurrentCourse('')
      setSelectedCourse('')
    } catch (err) {
      setMsg(err.message)
    } finally{
      setIsPendingLoading(false)
    }
  }
                  
  useEffect(() => {
    if(operation !== 'add') courseDispatch({ type: ACTIONS.COURSE.SET_PREVIOUS_COURSE_CODE, value: currentCourse.courseCode })
  },[])

  useEffect(() => {
    if(promptResponse) handleCourseDeletion()
    if(promptResponse) setPromptResponse(false)
  }, [promptResponse])

  return (
    <form className={ formClasses } onSubmit={ handleCourseOperation }>
        { operation === 'edit' && <Trash className={ trashIconClasses }
                                   onClick={
                                    () => prompterSetter({ message: `Are you sure you want to delete, ${ course.course }`, setter: setPromptResponse })
                                  }  /> }
        <CourseList { ...{ title: 'course name', value: course.course, courseDispatch, position: 'course' } } />
        <CourseList { ...{ title: 'course code', value: course.courseCode, courseDispatch, position: 'courseCode' } } />
        <CourseList { ...{ title: 'course overview', value: course.overview, courseDispatch, position: 'overview' } } />
        <CourseList { ...{ title: 'course fee', value: course.fee, courseDispatch, position: 'fee' } } />
        <CourseList { ...{ title: 'certification', value: course.certificate, courseDispatch, position: 'certificate' } } />
        <CourseList { ...{ title: 'course availability', value: course.availability, courseDispatch, position: 'availability' } } />
        <CourseList { ...{ title: 'course duration', value: course.duration, courseDispatch, position: 'duration' } } />
        <CourseSubList { ...{  course, title: 'objectives', courseDispatch, position: 'objectives' } } />
        <CourseSubList { ...{  course, title: 'outlines', courseDispatch, position: 'outlines' } } />
        <CourseSubList { ...{  course, title: 'benefits', courseDispatch, position: 'benefits' } } />

        { <button className={ submitButtonClasses }> { currentCourse ? 'Edit course' : 'Add course' }  </button> }
      </form>
  )
}

export function AddCourse(){
  return (
    <div>
      <h2 className='font-bold text-2xl uppercase'> Add a new programme </h2>
      <hr />
      <CourseStructure { ...{ operation: 'add' } } />
    </div>
  )
  
}

export function EditCourse(){
  const [ selectedCourse, setSelectedCourse ] = useState('')
  const { getCourse } = useCourses()
  const [ currentCourse, setCurrentCourse ] = useState('')

  useEffect(() => {
    if(selectedCourse){
      setCurrentCourse( getCourse(selectedCourse) )
    }
  }, [ selectedCourse ])

  return (
    <div className={  '' }>
      <CourseSeletor { ...{ selectedCourse, setSelectedCourse } }  />
      {
        currentCourse && <CourseStructure { ...{ currentCourse, setCurrentCourse, setSelectedCourse, operation: 'edit' } } />
      }
    </div>
  )
}

export function AddModule(){

  const [ selectedCourse, setSelectedCourse ] = useState('')
  const { getCourse } = useCourses()
  const [ currentCourse, setCurrentCourse ] = useState('')

  useEffect(() => {
    if(selectedCourse) setCurrentCourse( getCourse(selectedCourse) )
  }, [ selectedCourse ])

  return (
    <>
      <CourseSeletor { ...{ selectedCourse, setSelectedCourse } } />
      { currentCourse && <ModuleStructure { ...{ operation: 'add', courseCode: currentCourse.courseCode } } /> }
    </>
  )
}

export function EditModule(){
  const [ selectedCourse, setSelectedCourse ] = useState('')
  const { getCourse } = useCourses()
  const [ currentCourse, setCurrentCourse ] = useState('')

  useEffect(() => {
    if(selectedCourse) {
      setCurrentCourse( getCourse(selectedCourse) )
    }
  }, [ selectedCourse ])

  return (
    <>
      <CourseSeletor { ...{ selectedCourse, setSelectedCourse } } />
      {
        currentCourse && currentCourse.modules.length > 0 && <ModuleStructure { ...{ currentModules: currentCourse.modules, operation: 'edit' } } /> 
      }
      {
        currentCourse && currentCourse.modules.length < 1 && <span
        className='w-fit mx-auto font-semibold uppercase text-lg pt-10'
      > No modules added for selected course </span>
      }
    </>
  )
}

function ModuleList({ module, modules, position, title, modulesDispatch, index }){
  
  return(
    <label className={ labelClasses }>
    <span> { title } </span>
    <textarea className={ inputClasses } value={ position === 'courseCode' ? modules[0][position] : module[position] }
      onChange={ e =>  modulesDispatch({ type: ACTIONS.MODULE.FILL_MAIN_INPUT, index, position, value: e.target.value  }) }  ></textarea>
    </label>
  )
}

function ModuleSublist({module, position, index, modulesDispatch }){

  return(
    <div className={ labelClasses }>
    <span>{ position }</span>
    {
      module[position] && module[position].map((arr, arrIndex) => {
        return (
            <label key={ arrIndex }>
              <textarea className={ inputClasses } value={ arr }
                onChange={ e => modulesDispatch({ type: ACTIONS.MODULE.FILL_SUB_INPUT, index, position, arrIndex, value: e.target.value  }) }  ></textarea>
            </label>
        )
      })
    }
    <AddMoreField dispatch={ modulesDispatch } index={ index } type={ ACTIONS.MODULE.ADD_INPUT } position={ position } />
  </div>
  )
}

function CourseSeletor({ selectedCourse, setSelectedCourse }){
  const { coursesList } = useCourses()
  const [ courseVisible, setCoursesVisible ] = useState(false)

  return(
    <ul className={ courseContainerClasses }>
        <label> Programme </label>
        <span className={ courseSelectorClasses } onClick={ () => setCoursesVisible(c => !c) }>
          { !selectedCourse && 'Select programme' }
          { selectedCourse && selectedCourse }
        </span>
        {
          courseVisible && <div className={ coursesDropdownClasses }>
          {
            coursesList.map((course, index) => {
              return <li key={ Date.now() + '-' + index } onClick={ e => {
                setSelectedCourse(course.course)
                setCoursesVisible(false)
              }
            }> { course.course } </li>
            })
          }
        </div>
        }
      </ul>
  )
}

function CourseList({ title, viewCourse, value, courseDispatch, position }){

  return(
    <label>
      <span className={ courseInputTitleClasses }> { title } </span>
      <input className={ inputClasses } disabled={ viewCourse } type="text" value={ value } onChange={ e => courseDispatch({ type: ACTIONS.COURSE.FILL_MAIN_INPUT, position, value: e.target.value }) }  />
    </label>
  )
}

function CourseSubList({  course, title, viewCourse, courseDispatch, position }){

  return(
    <label>
      <span className={ courseInputTitleClasses }> { title } </span>
      {
        course[position].length > 0 && course[position].map((currentItem, index) => {
          return <textarea className={ inputClasses } disabled={ viewCourse } value={ currentItem } onChange={ e => courseDispatch({ type: ACTIONS.COURSE.FILL_SUB_INPUT, position, index, value: e.target.value }) }  ></textarea>
        }) 
      }
      <AddMoreField { ...{ position, type: ACTIONS.COURSE.ADD_INPUT, dispatch: courseDispatch, viewCourse  } } />
    </label>
  )
}