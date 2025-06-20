import { useMemo, useReducer, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { serverUriSelector, setLoader } from '../../Slices/settingsSlice'
import { coursesListSelector } from '../../Slices/coursesSlice'
import { Info } from "lucide-react"
import { useSetFeedback } from "../Home/AdminHome"
import axios from "axios"

const certificateFormClasses = 'grid px-2 py-3 h-fit w-[calc(100%-10px)] mx-auto gap-5 sm:max-w-[750px] bg-gray-100 rounded'
const textFieldClasses = 'grid gap-2 w-full *:block *:first:font-bold *:first:uppercase *:first:text-xl *:first:after:content-[":"] *:last:border-2 *:last:border-gray-500 *:last:p-2 *:last:rounded'
const searchCertificateClasses = 'grid h-fit gap-5 w-full max-w-[750px] mx-auto px-2 py-5 bg-gray-100 *:block *:!w-[calc(100%-10px)] *:first:uppercase *:first:font-bold *:first:text-xl *:last:uppercase'
const searchInputClasses = 'border-3 border-gray-500 rounded py-2 px-4'
const submitButtonClasses = 'block p-2 bg-gray-800 text-white rounded font-bold text-xl cursor-pointer hover:bg-gray-950'
const addNewButtonClasses = 'px-4 py-2 cursor-pointer block bg-gray-600 w-fit rounded uppercase text-white font-bold'
const errorsClasses = " flex gap-2 items-center uppercase text-lg text-red-500 font-bold"
const courseCodeSelectorClasses = "*:first:uppercase *:first:font-bold *:first:text-white *:first:bg-gray-800 *:first:block *:first:p-2 *:first:rounded *:first:hover:bg-gray-950 *:first:cursor-pointer *:last:*:p-2  *:last:bg-white  *:last:p-2 *:last:*:border-b-1  *:last:*:capitalize  *:last:*:hover:bg-gray-200"

const ACTIONS = {
  FILL_INPUT: 'fill_input',
  ADD_NEW_CERTIFICATE: 'add_new_certificate',
  RESET_CERTIFICATES: 'reset_certificates',
  CHOOSE_COURSE_CODE: 'select_course_code',
  NEW_EDITS: 'new_edits'
}
function certificatesReducer(state, action){
  
  switch(action.type){
    case ACTIONS.FILL_INPUT:
      return state.map((certificate, index) => {
        if(index !== action.index) return certificate
        return {
          ...certificate,
          [action.position]: action.value,
          reason: null
        }
      })

    case ACTIONS.ADD_NEW_CERTIFICATE:
      return [...state, ...action.emptyCertificate]

    case ACTIONS.RESET_CERTIFICATES:
      return action.emptyCertificate

    case ACTIONS.NEW_EDITS:
      return action.newEdits

    case ACTIONS.CHOOSE_COURSE_CODE:
      return state.map((certificate, index) => {
        if(index !== action.index) return certificate
        return {
          ...certificate,
          courseCode: action.courseCode
        }
      })
  }
}

export function AddCertificate(){
  return <CertificateStructure operation="add" />
}

export function EditCertificate(){
  const dispatch = useDispatch()
  const [ currentCertificate, setCurrentCertificate ] = useState()
  const [ studentNumber, setStudentNumber ] = useState(null)
  const serverUri = useSelector( serverUriSelector)
  const setFeedback = useSetFeedback()

  async function findStudent(e) {
    e.preventDefault()

    dispatch( setLoader(true) )
    const uri = serverUri + '/certificate'

    try{
      const res = await axios.patch(uri, { studentNumber, operation: 'findCertificate' })
      switch(res.data.status){
        case 200:
          setCurrentCertificate(res.data.findCertificates)
        break
        
        default:
          setCurrentCertificate(null)
          setFeedback({ error: true, message: res.data.msg })
      }
    } catch(err){
        setFeedback({ error: true, message: err.message })
    } finally{
      dispatch( setLoader(false) )
    }
  }

  return (
    <>
      <form className={ searchCertificateClasses } onSubmit={ findStudent }>
        <span> Student number </span>
        <input className={ searchInputClasses } onChange={ e => {
          setStudentNumber(e.target.value.trim().toLowerCase())
          setCurrentCertificate()
        } }  />
        <button className={ submitButtonClasses } > find certificate </button>
      </form>
      {
        currentCertificate && <CertificateStructure {...{ currentCertificate, operation: 'edit' }} />
      }
    </>
  )
}

function CertificateStructure({ currentCertificate, operation }){
  const dispatch = useDispatch()
  const serverUri = useSelector( serverUriSelector)
  const setFeedback = useSetFeedback()
  const coursesList = useSelector( coursesListSelector )
  const emptyCertificate = useMemo(() => [ {
    courseCode: '',
    studentNumber: '',
    dateCompleted: ''
  } ], [])
  const [ certificates, certificatesDispatch ] = useReducer(certificatesReducer, operation === 'add' ? emptyCertificate : currentCertificate)

  async function handleCertificateSubmit(e) {
    e.preventDefault()

    dispatch( setLoader(true) )
    const uri = serverUri + '/certificate'

    try{
      const res = await axios.patch(uri, { certificates, operation })
      setFeedback({ success: true, message: res.data.msg })
      
      switch(res.data.status){
        case 201:
          if(operation === 'add'){
            if(res.data.newEdits?.length > 0){
              certificatesDispatch({ type: ACTIONS.NEW_EDITS, newEdits: res.data.newEdits })
            } else{
              certificatesDispatch({ type: ACTIONS.RESET_CERTIFICATES, emptyCertificate })
            }
          } else{
            certificatesDispatch({ type: ACTIONS.NEW_EDITS, newEdits: res.data.newEdits })
          }
        break

        default:
          certificatesDispatch({ type: ACTIONS.NEW_EDITS, newEdits: res.data.newEdits })
      }
    } catch(err){
        setFeedback({ error: true, message: err.message || 'Something went wrong' })
    } finally {
       dispatch( setLoader(false) )
    }

  }

  return(
    <form 
      className={ certificateFormClasses } 
      onSubmit={ handleCertificateSubmit }>
      { certificates && certificates.map((certificate, index) =>{
          const { certificateCode, courseCode, studentNumber, dateCompleted, reason } = certificate
          return(
            <div
              key={index}
              className="grid gap-3">
              { reason && <div className={ errorsClasses }> <Info /> { reason } </div>}
              <TextField { ...{ value: courseCode, title: 'Course code' } } disabled />
              <CourseCodeSelector  { ...{ certificatesDispatch, coursesList, index } } />
              {
                certificateCode && <TextField { ...{ index, certificatesDispatch, position: "certificateCode", value: certificateCode, title: 'Certicate ID' } } disabled />
              }
              <TextField { ...{ index, certificatesDispatch, position: "studentNumber", value: studentNumber, title: 'Student number' } } />
              <TextField { ...{ index, certificatesDispatch, position: "dateCompleted", value: dateCompleted, title: 'Date of completion' } } />
              <br />
              <hr />
              <br />
            </div>
          )
        }) }
      { operation !== 'edit' && <span className={ addNewButtonClasses } onClick={ () => certificatesDispatch({ type: ACTIONS.ADD_NEW_CERTIFICATE, emptyCertificate }) }> New </span> }
      <button className={ submitButtonClasses } > Save </button>
    </form>
  )
}

function TextField({ title, position, disabled, certificatesDispatch, value, index }){
  
  return (
    <label className={ textFieldClasses }>
      <span> { title } </span>
      <input value={ value } disabled={ disabled } onChange={ e => certificatesDispatch({ type: ACTIONS.FILL_INPUT, position, index, value: e.target.value }) } />
    </label>
  )
}

function CourseCodeSelector({ certificatesDispatch, coursesList, index }){
  const [ isVisible, setIsVisible ] = useState(false)

  return(
    <label className={ courseCodeSelectorClasses }>
      <span onClick={ () => setIsVisible(v => !v) }> Select course code </span>
      <ul className={ isVisible ? "grid"  : 'hidden' }>
        {
          coursesList && coursesList.map((course, courseIndex) => {
            return <li key={ courseIndex } onClick={ () => {
              setIsVisible(v => !v)
              certificatesDispatch({ type: ACTIONS.CHOOSE_COURSE_CODE, index, courseCode: course.courseCode  })
            } }> { course.course } </li>
          })
        }
      </ul>
    </label>
  )
}