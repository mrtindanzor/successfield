import { useMemo, useReducer, useState } from "react"
import useServerUri from "../../../Contexts/serverContexts/baseServer"
import usePendingLoader from "../../../Contexts/PendingLoaderContext/PendingLoaderContext"
import { useSetAlert } from "../../../Hooks/Alerter/Alerter"
import { Info } from "lucide-react"
import useCourses from "../../../Contexts/CourseContext/CoursesContext"


const mainContainerClasses = "grid sm:grid-cols-[auto_1fr] pt-[10px]"
const navigationClasses = 'grid gap-3 px-2 py-3 *:bg-gray-800 *:hover:bg-gray-950 *:font-bold *:cursor-pointer *:text-white h-fit *:px-4 *:py-2 *:rounded '
const certificateFormClasses = 'grid px-2 py-3 w-[calc(100%-10px)] mx-auto gap-5 sm:max-w-[750px] bg-gray-100 rounded'
const textFieldClasses = 'grid gap-2 w-full *:block *:first:font-bold *:first:uppercase *:first:text-xl *:first:after:content-[":"] *:last:border-2 *:last:border-gray-500 *:last:p-2 *:last:rounded'
const searchCertificateClasses = 'grid gap-5 w-full max-w-[750px] mx-auto px-2 py-5 bg-gray-100 *:block *:!w-[calc(100%-10px)] *:first:uppercase *:first:font-bold *:first:text-xl *:last:uppercase'
const searchInputClasses = 'border-3 border-gray-500 rounded py-2 px-4'
const submitButtonClasses = 'block p-2 bg-gray-800 text-white rounded font-bold text-xl cursor-pointer hover:bg-gray-950'
const addNewButtonClasses = 'px-4 py-2 cursor-pointer block bg-gray-600 w-fit rounded uppercase text-white font-bold'
const currentTabClasses = 'w-[calc(100%-10px)] sm:w-[calc(100%-20px)] grid gap-2 pt-2'
const errorsClasses = " flex gap-2 items-center uppercase text-lg text-red-500 font-bold"
const courseCodeSelectorClasses = "*:first:uppercase *:first:font-bold *:first:text-white *:first:bg-gray-800 *:first:block *:first:p-2 *:first:rounded *:first:hover:bg-gray-950 *:first:cursor-pointer *:last:*:p-2  *:last:bg-white  *:last:p-2 *:last:*:border-b-1  *:last:*:capitalize  *:last:*:hover:bg-gray-200"

const ACTIONS = {
  FILL_INPUT: 'fill_input',
  ADD_NEW_CERTIFICATE: 'add_new_certificate',
  RESET_CERTIFICATES: 'reset_certificates',
  CHOOSE_COURSE_CODE: 'select_course_code'
}

function currentTabReducer(state, action){
  if(action.type === 'switch_tab') return action.sections[action.index].section
  return state
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

    case ACTIONS.FAILED_CERTIFICATES:
      return action.failed

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

export default function Certificates() {
  const sections = useMemo(() => [
    {
      title: 'Add certificate',
      section: <AddCertificate />
    },
    {
      title: 'Edit certificate',
      section: <EditCertificate />
    }
  ],[])
  const [ currentTab, currentTabDispatch ] = useReducer(currentTabReducer, sections[0].section)

  return (
    <div className={ mainContainerClasses }>
      <ul className={ navigationClasses }>
        {
          sections.map((section, index) => {
            return <li key={ index } onClick={ () => currentTabDispatch({ type: 'switch_tab', sections, index }) } > { section.title } </li>
          })
        }
      </ul>
      <div className={ currentTabClasses }> { currentTab } </div>
    </div>
  )
}

function AddCertificate(){
  return <CertificateStructure operation="add" />
}

function EditCertificate(){
  const [ currentCertificate, setCurrentCertificate ] = useState()
  const [ studentNumber, setStudentNumber ] = useState(null)
  const serverUri = useServerUri()
  const { setIsPendingLoading } = usePendingLoader()
  const setMsg = useSetAlert()

  async function findStudent(e) {
    e.preventDefault()

    setIsPendingLoading(true)
    const uri = serverUri + 'certificate'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const method = 'PATCH'
    const body = JSON.stringify({ studentNumber, operation: 'findCertificate' })
    const options = {
      headers,
      method,
      body
    }

    try{
      const response = await fetch(uri, options)
      if(!response.ok) throw Error('Something went wrong')
      const res = await response.json()
      switch(res.status){
        case 200:
          setCurrentCertificate(res.findCertificates)
        break
        
        default:
          setCurrentCertificate(null)
          setMsg(res.msg)
      }
    }
      catch(err){
        setMsg(err.message)
      }
        finally{
          setIsPendingLoading(false)
        }
  }

  return (
    <>
      <form className={ searchCertificateClasses } onSubmit={ findStudent }>
        <span> Student number </span>
        <input className={ searchInputClasses } onChange={ e => setStudentNumber(e.target.value.trim().toLowerCase()) }  />
        <button className={ submitButtonClasses } > find certificate </button>
      </form>
      {
        currentCertificate && <CertificateStructure {...{ currentCertificate, operation: 'edit' }} />
      }
    </>
  )
}

function CertificateStructure({ currentCertificate, operation }){
  const serverUri = useServerUri()
  const setMsg = useSetAlert()
  const { coursesList } = useCourses()
  const { setIsPendingLoading } = usePendingLoader()
  const emptyCertificate = useMemo(() => [
    {
    courseCode: '',
    studentNumber: '',
    dateCompleted: ''
  }
], [])
  const [ certificates, certificatesDispatch ] = useReducer(certificatesReducer, operation === 'add' ? emptyCertificate : currentCertificate)

  async function handleCertificateSubmit(e) {
    e.preventDefault()

    setIsPendingLoading(true)
    const uri = serverUri + 'certificate'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const method = 'PATCH'
    const body = JSON.stringify({ certificates, operation })
    const options = {
      headers,
      method,
      body
    }

    try{
      const response = await fetch(uri, options)
      if(!response.ok) throw Error('Something went wrong')
      const res = await response.json()
      setMsg(res.msg)
      
      switch(res.status){
        case 201:
          certificatesDispatch({ type: ACTIONS.RESET_CERTIFICATES, emptyCertificate })
        break

        default:
          certificatesDispatch({ type: ACTIONS.FAILED_CERTIFICATES, failed: res.failed })
      }
    }
      catch(err){
        setMsg(err.message)
      }
        finally{
          setIsPendingLoading(false)
        }

  }

  return(
    <form className={ certificateFormClasses } onSubmit={ handleCertificateSubmit }>
      {
        certificates && certificates.map((certificate, index) =>{
          const { certificateCode, courseCode, studentNumber, dateCompleted, reason } = certificate
          return(<>
            {
              reason && <div className={ errorsClasses }> <Info /> { reason } </div>
            }
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
          </>)
        })
      }
      {
        operation !== 'edit' && <span className={ addNewButtonClasses } onClick={ () => certificatesDispatch({ type: ACTIONS.ADD_NEW_CERTIFICATE, emptyCertificate }) }> New </span>
      }
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