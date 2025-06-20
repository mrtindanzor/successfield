// REACT //
import { useEffect, useReducer, useState, useCallback } from 'react';

// OTHERS //
import { useSelector, useDispatch } from 'react-redux'
import { studentsSelector, getStudents } from '../../Slices/adminSlice'
import { 
  coursesListSelector,
  moduleOperation,
  getCourse
 } from '../../Slices/coursesSlice'
import { setLoader } from '../../Slices/settingsSlice'
import { ChevronDown, Info, Trash } from 'lucide-react';
import { useMemo } from 'react';
import usePrompter from './../Components/Prompt'
import axios from 'axios';
import { useSetFeedback } from '../Home/AdminHome';
import SubmitButton from '../Components/SubmitButton'
import { 
  AddMoreField,
  CourseSeletor,
  toggleModuleList
 } from './Courses'

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
    SWITCH_COURSE: 'switch_course',
    SET_COURSE_CODE: 'set_course_code'
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
    case ACTIONS.MODULE.SET_COURSE_CODE:
      return state.map( module => ({
        ...module,
        courseCode: action.courseCode
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
            if(tIndex !== action.itemIndex) return t
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

    case ACTIONS.MODULE.DELETE_MODULE:
      return state.filter( module => module.title !== action.title )
  }
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
  const [ modules, modulesDispatch ] = useReducer(moduleReducer, [emptyModule])
  const dispatch = useDispatch()
  const [ promptResponse, setPromptResponse ] = useState(null)
  const [ deleteModule, setDeleteModule ] = useState()
  const [ markedForDeletion, setMarkedForDeletion ] = useState([])
  const { prompterSetter } = usePrompter()
  const setFeedback = useSetFeedback()

  const handleModulesSubmit = useCallback( async e => {
    e.preventDefault()
    
    dispatch( setLoader(true))
    modulesDispatch({ type: ACTIONS.MODULE.RESET_ERRORS })
    
    try {
      const res = await dispatch( moduleOperation({ modules, markedForDeletion, operation }) ).unwrap()
      if(operation === 'add' && res.status === 201) modulesDispatch({ type: ACTIONS.MODULE.START_NEW_MODULE, emptyModule })
      if(res.failed && res.failed.length > 0) modulesDispatch({ type: ACTIONS.MODULE.FETCH_ERRORS, modules: res.failed })
      setFeedback({ success: true, message: res.msg })
    } catch (error) {
      setFeedback({ error: true, message: error.message || error || 'Something went wrong' })
    } finally{
      dispatch( setLoader(false))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [modules, deleteModule] )
  useEffect(() => {
    if(currentModules){
      modulesDispatch({ type: ACTIONS.MODULE.SWITCH_COURSE, currentModules })
    }
  }, [ currentModules ])
  useEffect(() => {
    if(courseCode){
      modulesDispatch({ type: ACTIONS.MODULE.SET_COURSE_CODE, courseCode })
    }
  }, [ courseCode ])

  useEffect(() => {
    if(promptResponse) {
      setMarkedForDeletion( m => [ ...m, deleteModule.module ])
      modulesDispatch({ type: ACTIONS.MODULE.DELETE_MODULE, title: deleteModule.module.title })
      setDeleteModule()
      setPromptResponse(null)
    }
  }, [promptResponse])
 
  return (
    <form 
      className='grid z-0 gap-5 relative bg-gray-200 my-10  px-2 sm:px-5 md:10 rounded-lg py-10 *:grid *:gap-3 *:p-2 *:w-[calc(100%-10px)] md:*:w-[calc(100%-20px)] mx-auto *:rounded *:*:first:font-bold *:*:text-lg' 
      onSubmit={ handleModulesSubmit }>
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
                  </span> }
            { module.previousCourseCode && <Trash
                className="!w-10 h-10 text-red-500 border-1 cursor-pointer bg-white border-red-500 rounded p-1 ml-auto hover:text-white hover:bg-red-500"
                onClick={ () => {
                  prompterSetter({ 
                    message: `Are you sure you want to delete, ${ module.title }`, 
                    setter: setPromptResponse })
                  setDeleteModule({ module })
                } } /> }
            <ModuleList { ...{ 
              title: 'Course code',
              value: courseCode,
              readOnly: true,
              dispatchOptions: { 
                type: ACTIONS.MODULE.FILL_MAIN_INPUT,
                index,
                position: 'courseCode', },
              dispatch: modulesDispatch } } />
            <ModuleList { ...{ 
              title: 'Title',
              value: module.title,
              dispatchOptions: { 
                type: ACTIONS.MODULE.FILL_MAIN_INPUT,
                index, 
                position: 'title', },
              dispatch: modulesDispatch } }  />
            <ModuleList { ...{ 
              title: 'Outline',
              value: module.outline,
              dispatchOptions: { 
                type: ACTIONS.MODULE.FILL_MAIN_INPUT,
                index, 
                position: 'outline', },
              dispatch: modulesDispatch } }  />
            <ModuleList { ...{ 
              title: 'Video link',
              value: module.link,
              dispatchOptions: { 
                type: ACTIONS.MODULE.FILL_MAIN_INPUT,
                index, 
                position: 'link', },
              dispatch: modulesDispatch } } />
            <ModuleSublist { ...{ 
              title: 'Topics',
              position: 'topics', 
              index, 
              list: module.topics,
              dispatch: modulesDispatch } } /> 
            <ModuleSublist { ...{ 
              title: 'Notes',
              position: 'notes', 
              index, 
              list: module.notes,
              dispatch: modulesDispatch } } /> 
            <ModuleSublist { ...{ 
              title: 'Objectives',
              position: 'objectives', 
              index, 
              list: module.objectives,
              dispatch: modulesDispatch } } /> 
          </div>
          )
        })
      }
      <hr />
      { operation === 'add' && <span className='font-semibold text-xl'>Add new module</span> }
      { operation === 'add' &&  <AddMoreField dispatch={ modulesDispatch } reverse type={ ACTIONS.MODULE.ADD_NEW_MODULE } emptyModule={ emptyModule } /> }
      <SubmitButton { ...{ text: 'Save' } } />
    </form>
  )
}

export function AddModule(){
  const dispatch = useDispatch()
  const [ selectedCourse, setSelectedCourse ] = useState('')
  const [ currentCourse, setCurrentCourse ] = useState('')

  const getCurrentCourse = useCallback( async () => {
    if(selectedCourse) {
      const course = await dispatch( getCourse(selectedCourse) ).unwrap()
      setCurrentCourse(course)
    }
  }, [selectedCourse] )

  useEffect(() => {
    getCurrentCourse()
  }, [ selectedCourse ])

  return (
    <div>
      <CourseSeletor { ...{ selectedCourse, setSelectedCourse } } />
      { currentCourse && <ModuleStructure { ...{ 
          operation: 'add',
          courseCode: currentCourse.courseCode 
        } } /> }
    </div>
  )
}

export function EditModule(){
  const dispatch = useDispatch()
  const [ selectedCourse, setSelectedCourse ] = useState('')
  const [ currentCourse, setCurrentCourse ] = useState('')

  const getCurrentCourse = useCallback( async () => {
    if(selectedCourse) {
      const course = await dispatch( getCourse(selectedCourse) ).unwrap()
      setCurrentCourse(course)
    }
  }, [selectedCourse] )

  useEffect(() => {
    getCurrentCourse()
  }, [ selectedCourse ])

  return (
    <div>
      <CourseSeletor { ...{ selectedCourse, setSelectedCourse } } />
      { currentCourse && currentCourse?.modules?.length > 0 && 
          <ModuleStructure { ...{ 
            currentModules: currentCourse.modules,
            courseCode: currentCourse.courseCode,
            operation: 'edit' } } />  }
      { currentCourse && currentCourse?.modules?.length < 1 && <span
        className='w-fit mx-auto font-semibold uppercase text-lg pt-10'> 
        No modules added for selected course </span> }
    </div>
  )
}
 
function ModuleList({ readOnly, value, title, dispatch, dispatchOptions }){
  
  return(
    <label
      className="grid gap-2">
      { title && <span
        className="uppercase font-bold">
          { title }
      </span> }
      <textarea 
        className='py-2 px-3 border-2 border-gray-600 rounded-lg block w-full'
        value={ value }
        readOnly={ readOnly }
        onChange={ e =>  dispatch({ ...dispatchOptions, value: e.target.value  }) }  ></textarea>
    </label>
  )
}

function ModuleSublist({ title, index, list, position, dispatch }){

  return(
    <div 
      className="grid gap-2">
      <span
        className="uppercase font-bold">
          { title }
      </span>
      { list.map((item, itemIndex) => <ModuleList
        key={ itemIndex }
        { ...{ 
          value: item,
          dispatchOptions: { 
            type: ACTIONS.MODULE.FILL_SUB_INPUT,
            itemIndex,
            index, 
            position },
          dispatch } } /> ) }
      <AddMoreField { ...{
        dispatch,
        index,
        type: ACTIONS.MODULE.ADD_INPUT,
        position
      } } />
  </div>
  )
}