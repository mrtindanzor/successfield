import { useMemo, useReducer, useState } from "react"
import useServerUri from "../../../Contexts/serverContexts/baseServer"
import usePendingLoader from "../../../Contexts/PendingLoaderContext/PendingLoaderContext"
import { useSetAlert } from "../../../Hooks/Alerter/Alerter"


const mainContainerClasses = "grid sm:grid-cols-[auto_1fr] pt-[10px]"
const navigationClasses = 'grid px-2 py-3 *:bg-gray-950 *:text-white'
const certificateFormClasses = 'grid p-2 w-full'
const textFielClasses = ''
const searchCertificateClasses = ''
const submitButtonClasses = ''
const addNewButtonClasses = ''
const currentTabClasses = ''

const ACTIONS = {
  FILL_INPUT: 'fill_input',
  ADD_NEW_CERTIFICATE: 'add_new_certificate',
  RESET_CERTIFICATES: 'reset_certificates'
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
          [action.position]: action.value
        }
      })

    case ACTIONS.ADD_NEW_CERTIFICATE:
      return [...state, ...action.emptyCertificate]

    case ACTIONS.RESET_CERTIFICATES:
      return action.emptyCertificate

    case ACTIONS.FAILED_CERTIFICATES:
      return action.failed
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
  const [ currentCertificate, setCurrentCertificate ] = useState([])
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
        <label>
          <span> Student number </span>
          <input onChange={ e => setStudentNumber(e.target.value.trim().toLowerCase()) }  />
          <button className={ submitButtonClasses } > find certificates </button>
        </label>
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
      const res = await res.json()
      setMsg(res.msg)
      if(res.status !== 201){
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
          return(<>
            <TextField { ...{ index, certificatesDispatch, postion: "courseCode", value: certificate.courseCode, title: 'Course code' } } />
            <TextField { ...{ index, certificatesDispatch, postion: "studentNumber", value: certificate.studentNumber, title: 'Student number' } } />
            <TextField { ...{ index, certificatesDispatch, postion: "dateCompleted", value: certificate.dateCompleted, title: 'Date of completion' } } />
          </>)
        })
      }
      <span className={ addNewButtonClasses } onClick={ () => certificatesDispatch({ type: ACTIONS.ADD_NEW_CERTIFICATE }) }> New </span>
      <button className={ submitButtonClasses } > Save </button>
    </form>
  )
}

function TextField({ title, position, certificatesDispatch, value, index }){

  return (
    <label>
      <span className={ textFielClasses }> { title } </span>
      <input value={ value } onChange={ () => certificatesDispatch({ type: ACTIONS.FILL_INPUT, position, index }) } />
    </label>
  )
}