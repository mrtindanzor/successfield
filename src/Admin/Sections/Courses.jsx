// REACT //
import { useEffect, useReducer, useState } from 'react';

// OTHERS //
import useCourses from '../../Contexts/CoursesContext';
import { useSetAlert } from '../../Hooks/Alerter';
import usePendingLoader from '../../Contexts/PendingLoaderContext';
import useServerUri from '../../Contexts/baseServer';
import { ArrowBigLeftDash, ChevronDown, Info } from 'lucide-react';
import { useMemo } from 'react';

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


const ACTIONS = {
  MODULE: { 
    ADD_INPUT: 'add_input',
    ADD_NEW_MODULE: 'add_new_module',
    FILL_MAIN_INPUT: 'fill_main_input',
    FILL_SUB_INPUT: 'fill_sub_input',
    RESET_ERRORS: 'reset_errors',
    START_NEW_MODULE: 'start_new_module',
    FETCH_ERRORS: 'fetch_errors'
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
  const sections = [
    {
      title: 'View courses', section: <ViewCourses />
    },
    {
      title: 'Add courses', section: <AddCourse />
    },
    {
      title: 'Edit courses', section: <EditCourse />
    },
    {
      title: 'Modules', section: <Modules />
    }
  ]

  const [ currentSection, setCurrentSection ] = useState(0)
  const [ activeSection, setActiveSection ] = useState(sections[0].section)
  
  useEffect(() => {
    setActiveSection(sections[currentSection].section)
  }, [currentSection])
   
  return (
    <div className="grid gap-4 pt-8 sm:grid-cols-[auto_1fr] sm:h-[calc(100vh-70px)]"> 
      <ul className="grid !h-fit pl-2 gap-3 sm:w-fit min-w-[100px] pr-5">
        {
          sections.map((section, index) => {
            return <li key={ section.title } className={`text-white bg-gray-400 rounded cursor-pointer font-semibold text-xl py-1 px-3 ${ currentSection === index ? '!bg-gray-700' : '' }`} onClick={ () => setCurrentSection(index) }> { section.title } </li>
          })
        }
      </ul>
      <div className={ courseOperations }>
        {
        activeSection
      }
      </div>
      
    </div>
  )
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
    case ACTIONS.MODULE.ADD_INPUT:
      return state.map( (module, mIndex) => {
        if(action.index !== mIndex) return module
        return {
          ...module,
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
      return action.emptyModule
  }
}

function setCore(selectedCourse, currentCourse, track, setCurrentCourse, setTrack, getCourse){
  if(track === 1){
    setCurrentCourse(getCourse(selectedCourse, 'course'))
    setTrack(2)
  }

  if(track > 1){
    switch(track){
      case 2:
        setCurrentCourse( c => ({...c, ...currentCourse }))
        setTrack(3)
          break

      case 3:
        setCurrentCourse( c => ({...c, outlines: [...getCourse(currentCourse.courseCode, 'outlines')] }))
        setTrack(4)
          break

      case 4:
        setCurrentCourse( c => ({...c, benefits: [...getCourse(currentCourse.courseCode, 'benefits')] }))
        setTrack(5)
          break

      case 5:
        setCurrentCourse( c => ({...c, objectives: [...getCourse(currentCourse.courseCode, 'objectives')] }))
        setTrack(6)
          break
    }
  }
}

function toggleModuleList(e){
  e.target.parentElement.classList.toggle('*:not-first:hidden')
}

function fetchCurrentModule(courseCode, getCourse){
  const m = getCourse(courseCode, 'modules')
  return m
}

function AddMoreField({ position, type, index, dispatch, reverse, emptyModule, viewCourse  }){
  
  return  <span 
    onClick={ e => {
      e.preventDefault()
      dispatch({ type, emptyModule, position, index })
    } } className={ (reverse ? appendButtonClasses + ' !ml-[4px] !mr-auto' : appendButtonClasses) + ( viewCourse && ' hidden') }> + </span> 
}

function ModuleStructure({ currentModule, operation }){
  const courseCode = currentModule && currentModule[0] && currentModule[0].courseCode
  const { setRefreshCourses } = useCourses()
  const [ modules, modulesDispatch ] = useReducer(moduleReducer, currentModule || [])

  const emptyModule = useMemo( () => [
    {
      courseCode: courseCode || '',
      title: '',
      outline: '',
      link: '',
      topics: [''],
      notes: [''],
      objectives: ['']
    }
  ], [modules])
  const serverUri = useServerUri()
  const setMsg = useSetAlert()
  const { setIsPendingLoading } = usePendingLoader()

  useEffect(() => {
    if(operation === 'add') modulesDispatch({ type: ACTIONS.MODULE.START_NEW_MODULE , emptyModule })
  }, [])

  async function handleModulesSubmit(e){
    e.preventDefault()
    
    setIsPendingLoading(true)
    modulesDispatch({ type: ACTIONS.MODULE.RESET_ERRORS })
    const uri = serverUri + 'modules'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const method = 'PATCH'
    const body = JSON.stringify({ modules, operation })
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
      console.log(res)
      if(res.failed && res.failed.length > 0) modulesDispatch({ type: ACTIONS.MODULE.FETCH_ERRORS, modules: res.failed })
      setRefreshCourses
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
            {
              module.reason && <span className="text-red-500 font-bold text-2xl uppercase flex items-center gap-1"> <Info /> { module.reason } </span>
            }
            <ModuleList position='courseCode' title='Course code' { ...{ index, operation, module, modulesDispatch } } />
            <ModuleList position='title' title='Title'  { ...{ index, operation, module, modulesDispatch } }  />
            <ModuleList position='outline' title='outline'  { ...{ index, operation, module, modulesDispatch } }  />
            <ModuleList position='link' title='Video link'  { ...{ index, operation, module, modulesDispatch } }  />
            <ModuleSublist position='topics' { ...{ index, operation, module, modulesDispatch } } /> 
            <ModuleSublist position='notes' { ...{ index, operation, module, modulesDispatch } } /> 
            <ModuleSublist position='objectives' { ...{ index, operation, module, modulesDispatch } } />
          </div>
          )
        })
      }
      <hr />
      <span className='font-semibold text-xl'>Add new module</span>
      <AddMoreField dispatch={ modulesDispatch } reverse type={ ACTIONS.MODULE.ADD_NEW_MODULE } emptyModule={ emptyModule } />
      <button className={ submitButtonClasses }> Apply Changes </button>
    </form>
  )
}

function CourseStructure({ currentCourse, setSelectedCourse,  setCurrentCourse, viewCourse, operation }){
  const setMsg = useSetAlert()
  const { setRefreshCourses } = useCourses()
  const { setIsPendingLoading } = usePendingLoader()
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

  const [ course, courseDispatch ] = useReducer(coursesReducer, currentCourse || emptyCourse)
  const uri = useServerUri() + 'courses'

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
                  
  useEffect(() => {
    if(operation !== 'add') courseDispatch({ type: ACTIONS.COURSE.SET_PREVIOUS_COURSE_CODE, value: currentCourse.courseCode })
  },[])

return console.log(course)

  return (
    <form className={ formClasses } onSubmit={ handleCourseOperation }>
        <CourseList { ...{ title: 'course name', viewCourse, value: course.course, courseDispatch, position: 'course' } } />
        <CourseList { ...{ title: 'course code', viewCourse, value: course.courseCode, courseDispatch, position: 'courseCode' } } />
        <CourseList { ...{ title: 'course overview', viewCourse, value: course.overview, courseDispatch, position: 'overview' } } />
        <CourseList { ...{ title: 'course fee', viewCourse, value: course.fee, courseDispatch, position: 'fee' } } />
        <CourseList { ...{ title: 'certification', viewCourse, value: course.certificate, courseDispatch, position: 'certificate' } } />
        <CourseList { ...{ title: 'course availability', viewCourse, value: course.availability, courseDispatch, position: 'availability' } } />
        <CourseList { ...{ title: 'course duration', viewCourse, value: course.duration, courseDispatch, position: 'duration' } } />
        <CourseSubList { ...{  course, title: 'objectives', viewCourse, courseDispatch, position: 'objectives' } } />
        <CourseSubList { ...{  course, title: 'outlines', viewCourse, courseDispatch, position: 'outlines' } } />
        <CourseSubList { ...{  course, title: 'benefits', viewCourse, courseDispatch, position: 'benefits' } } />

        { !viewCourse && <button className={ submitButtonClasses }> { currentCourse ? 'Edit course' : 'Add course' }  </button> }
      </form>
  )
}

function AddCourse(){
  return (
    <div>
      <h2 className='font-bold text-2xl uppercase'> Add a new programme </h2>
      <hr />
      <CourseStructure { ...{ operation: 'add' } } />
    </div>
  )
  
}

function EditCourse(){
  const [ selectedCourse, setSelectedCourse ] = useState('')
  const { getCourse } = useCourses()
  const [ currentCourse, setCurrentCourse ] = useState('')
  const [ track, setTrack ] = useState(0)

  useEffect(() => {
    setCore(selectedCourse,currentCourse, track, setCurrentCourse, setTrack, getCourse)
  }, [ track ])

  return (
    <div className={  '' }>
      <CourseSeletor { ...{ selectedCourse, setTrack, setSelectedCourse } }  />
      {
        currentCourse && track === 6 && <CourseStructure { ...{ currentCourse, setCurrentCourse, setSelectedCourse, operation: 'edit' } } />
      }
    </div>
  )
}

function ViewCourses(){
  const [ selectedCourse, setSelectedCourse ] = useState('')
  const { getCourse } = useCourses()
  const [ currentCourse, setCurrentCourse ] = useState('')
  const [ track, setTrack ] = useState(0)

  useEffect(() => {
    setCore(selectedCourse,currentCourse, track, setCurrentCourse, setTrack, getCourse)
  }, [ track ])

  return (
    <div className={  '' }>
      <CourseSeletor selectedCourse={ selectedCourse } setTrack={ setTrack } setSelectedCourse={ setSelectedCourse }  />
      {
        currentCourse && track === 6 && <CourseStructure currentCourse={ currentCourse } viewCourse />
      }
    </div>
  )
}

function AddModule(){

  return <ModuleStructure { ...{ operation: 'add' } } />
}

function EditModule(){
  const [ selectedCourse, setSelectedCourse ] = useState('')
  const { getCourse } = useCourses()
  const [ currentCourse, setCurrentCourse ] = useState('')
  const [ currentModule, setCurrentModule ] = useState([])
  const [ track, setTrack ] = useState(0)

  useEffect(() => {
    if(track === 1) {
      setCurrentCourse(getCourse(selectedCourse, 'course'))
      setTrack(2)
    }
    if(track === 2){
      setCurrentModule(fetchCurrentModule(currentCourse.courseCode, getCourse))
      setTrack(3)
    }

  }, [ track ])

  return (
    <>
      <CourseSeletor selectedCourse={ selectedCourse } setTrack={ setTrack } setSelectedCourse={ setSelectedCourse }  />
      {
        currentModule && track === 3 && <ModuleStructure 
                                          { ...{ currentModule, operation: 'edit' } } />
      }
    </>
  )
}

function ModuleList({ module, position, title, modulesDispatch, index }){
  
  return(
    <label className={ labelClasses }>
    <span> { title } </span>
    <textarea className={ inputClasses } value={ module[position] }
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

function CourseSeletor({ selectedCourse, setSelectedCourse, setTrack }){
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
                setTrack(1)
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
  console.log(course, position)
  return(
    <label>
      <span className={ courseInputTitleClasses }> { title } </span>
      {
        course && course[position] && course[position].map((currentItem, index) => {
          return <textarea className={ inputClasses } disabled={ viewCourse } value={ currentItem } onChange={ e => courseDispatch({ type: ACTIONS.COURSE.FILL_SUB_INPUT, position, index, value: e.target.value }) }  ></textarea>
        }) 
      }
      <AddMoreField { ...{ position, type: ACTIONS.COURSE.ADD_INPUT, dispatch: courseDispatch, viewCourse  } } />
    </label>
  )
}