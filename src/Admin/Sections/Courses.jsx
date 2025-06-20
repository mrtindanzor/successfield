// REACT //
import { useEffect, useReducer, useState, useCallback } from 'react';

// OTHERS //
import { useSelector, useDispatch } from 'react-redux'
import { 
  coursesListSelector, 
  getCourse, 
  addCourse,
  editCourse,
  deleteCourse
 } from '../../Slices/coursesSlice'
import { setLoader } from '../../Slices/settingsSlice'
import { ChevronDown, Info, Trash } from 'lucide-react';
import { useMemo } from 'react';
import usePrompter from './../Components/Prompt'
import axios from 'axios';
import { useSetFeedback } from '../Home/AdminHome';
import SubmitButton from '../Components/SubmitButton'
import { Selector } from '../../Components/Authentication/Registration'

const ACTIONS = {
  COURSE: {
    RESET_FORM: 'reset_form',
    ADD_INPUT: 'add_input_field',
    FILL_MAIN_INPUT: 'fill_input',
    FILL_SUB_INPUT: 'fill_sub_input',
    SET_PREVIOUS_COURSE_CODE: 'set_previous_course_code',
    CHANGE_COURSE: 'change_course'
  }
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

    case ACTIONS.CHANGE_COURSE:
      return action.payload

    default:
      return state
  }
}

function CourseStructure({ currentCourse, setSelectedCourse, setCurrentCourse, operation }){
  const dispatch = useDispatch()
  const setFeedback = useSetFeedback()
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
    previousCourseCode: '',
    hidden: false
  }), [])
  const [ course, courseDispatch ] = useReducer(coursesReducer, emptyCourse )
  const hideOptions = useMemo(() => [ 'Yes', 'No' ], [])
  const handleCourseOperation = useCallback( async (action = operation) => {
    dispatch( setLoader(true))
    
    try {
      let data
      switch(action){
        case 'add':
          data = await dispatch( addCourse(course) ).unwrap()
          setFeedback({ success: true, message: data.msg })
          courseDispatch({ type: ACTIONS.COURSE.RESET_FORM, emptyCourse })
        break

        case 'edit':
          data = await dispatch( editCourse(course) ).unwrap()
          setFeedback({ success: true, message: data.msg })
        break

        case 'delete':
          data = await dispatch( deleteCourse({ courseCode: course.courseCode }) ).unwrap()
          setFeedback({ success: true, message: data.msg })
          setCurrentCourse('')
          setSelectedCourse('')
      }
    } catch (error) {
        setFeedback({ error: true, message: error || 'Something went wrong' })
    } finally{
        dispatch( setLoader(false))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [course])
  const handleSubmit = useCallback( e => {
    e.preventDefault()
    handleCourseOperation(operation)
  }, [handleCourseOperation, course])

  useEffect(() => {
    if(operation !== 'add'){
      courseDispatch({ type: ACTIONS.CHANGE_COURSE, payload: currentCourse })
      courseDispatch({ type: ACTIONS.COURSE.SET_PREVIOUS_COURSE_CODE, value: currentCourse.courseCode })
    } 
  }, [currentCourse])

  useEffect(() => {
    if(promptResponse) handleCourseOperation('delete')
    if(promptResponse) setPromptResponse(false)
  }, [promptResponse])

  return (
    <form 
      className='grid z-0 gap-5 relative bg-gray-200 my-10  px-2 sm:px-5 md:10 rounded-lg py-10 *:grid *:gap-3 *:p-2 *:w-[calc(100%-10px)] md:*:w-[calc(100%-20px)] mx-auto *:rounded *:*:first:font-bold *:*:text-lg' 
      onSubmit={ handleSubmit }>
        { operation === 'edit' && <Trash 
            className="!w-10 h-10 text-red-500 border-1 cursor-pointer bg-white border-red-500 rounded p-1 ml-auto hover:text-white hover:bg-red-500" 
            onClick={
            () => prompterSetter({ message: `Are you sure you want to delete, ${ course.course }`, setter: setPromptResponse })
          }  /> }
        <CourseList { ...{ title: 'course name', value: course.course, courseDispatch, position: 'course' } } />
        <CourseList { ...{ title: 'course code', value: course.courseCode, courseDispatch, position: 'courseCode' } } />
        <CourseList { ...{ title: 'course overview', value: course.overview, courseDispatch, position: 'overview' } } />
        <CourseList { ...{ title: 'course fee', value: course.fee, courseDispatch, position: 'fee' } } />
        <Selector { ...{ 
          title: 'Hidden', 
          dispatch: courseDispatch, 
          type: ACTIONS.FILL_MAIN_INPUT, 
          db: hideOptions, 
          position: course.hidden, 
          reducerPosition: 'hidden' } } />
        <CourseList { ...{ title: 'certification', value: course.certificate, courseDispatch, position: 'certificate' } } />
        <CourseList { ...{ title: 'course availability', value: course.availability, courseDispatch, position: 'availability' } } />
        <CourseList { ...{ title: 'course duration', value: course.duration, courseDispatch, position: 'duration' } } />
        <CourseSubList { ...{  course, title: 'objectives', courseDispatch, position: 'objectives' } } />
        <CourseSubList { ...{  course, title: 'outlines', courseDispatch, position: 'outlines' } } />
        <CourseSubList { ...{  course, title: 'benefits', courseDispatch, position: 'benefits' } } />
        
        <SubmitButton { ...{ 
          text:  currentCourse ? 'Edit course' : 'Add course'
        } } />
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
  const dispatch = useDispatch()
  const [ selectedCourse, setSelectedCourse ] = useState('')
  const [ currentCourse, setCurrentCourse ] = useState('')

  const setCourse = useCallback( async () => {
    const data = await dispatch( getCourse(selectedCourse) ).unwrap()
    setCurrentCourse(data)
  }, [currentCourse, selectedCourse])

  useEffect(() => {
    if(selectedCourse) setCourse()
  }, [ selectedCourse ])

  return (
    <div className={  '' }>
      <CourseSeletor { ...{ selectedCourse, setSelectedCourse } }  />
      { currentCourse && <CourseStructure { ...{ currentCourse, setCurrentCourse, setSelectedCourse, operation: 'edit' } } /> }
    </div>
  )
}

export function CourseSeletor({ selectedCourse, setSelectedCourse }){
  const coursesList = useSelector( coursesListSelector )
  const [ activeCourse, setActiveCourse ] = useState()
  const [ courseVisible, setCoursesVisible ] = useState(false)
  console.log(activeCourse)

  return(
    <ul 
      className="grid gap-3 w-[100%-10px] mx-auto border-t-8 border-t-gray-700 pt-5 *:first:font-bold *:first:text-3xl mt-5 mb-3">
        <label> Programme </label>
        <span 
          className='p-2 cursor-pointer hover:bg-gray-300 rounded font-semibold text-lg border-1 border-gray-900 '
          onClick={ () => setCoursesVisible(c => !c) }>
          { !activeCourse && 'Select programme' }
          { activeCourse && coursesList[activeCourse].course }
        </span>
        { courseVisible && <div 
            className='bg-gray-100 *:p-2 *:border-b-1 *:border-b-gray-500 *:hover:bg-green-300 font-normal '>
          { coursesList.map((course, index) => {
              return <li 
                key={ course._id } 
                onClick={ () => {
                  setActiveCourse(index.toString())
                  setSelectedCourse(course.course)
                  setCoursesVisible(false)
                }
            }> { course.course } </li>
            }) }
        </div> }
      </ul>
  )
}

function CourseList({ title, viewCourse, value, courseDispatch, position }){

  return(
    <label>
      <span 
        className="uppercase text-xl after:content-[':']"> { title } </span>
      <input 
        className='py-2 px-3 border-2 border-gray-600 rounded-lg block w-full'
        disabled={ viewCourse } 
        type="text" value={ value } 
        onChange={ e => courseDispatch({ type: ACTIONS.COURSE.FILL_MAIN_INPUT, position, value: e.target.value }) }  />
    </label>
  )
}

function CourseSubList({  course, title, viewCourse, courseDispatch, position }){

  return(
    <label>
      <span 
        className="uppercase text-xl after:content-[':']"> { title } </span>
      {
        course[position].length > 0 && course[position].map((currentItem, index) => {
          return <textarea
            key={ index }
            className='py-2 px-3 border-2 border-gray-600 rounded-lg block w-full' 
            disabled={ viewCourse } 
            value={ currentItem } 
            onChange={ e => courseDispatch({ type: ACTIONS.COURSE.FILL_SUB_INPUT, position, index, value: e.target.value }) }  ></textarea>
        }) 
      }
      <AddMoreField { ...{ position, type: ACTIONS.COURSE.ADD_INPUT, dispatch: courseDispatch, viewCourse  } } />
    </label>
  )
}

export function toggleModuleList(e){
  e.target.parentElement.classList.toggle('*:not-first:hidden')
}

export function AddMoreField({ position, type, index, dispatch, reverse, emptyModule, viewCourse  }){
  
  return  <span 
    onClick={ e => {
      e.preventDefault()
      dispatch({ type, emptyModule, position, index })
    } } 
    className={`"!w-fit px-4 py-2 text-3xl cursor-pointer text-white 
      rounded bg-gray-950 ml-auto block" ${ reverse ? + ' !ml-[4px] !mr-auto' : '' }
      ${ viewCourse ? ' hidden':'' }` }> + </span> 
}