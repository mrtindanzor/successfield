import { useRef, useState, useCallback } from 'react'
import DisplayNotification from '../Components/DisplayNotification'
import SubmitButton from '../Components/SubmitButton'
import axios from "axios";
import { serverUriSelector } from '../Slices/settingsSlice'
import { useSelector } from 'react-redux'
export default function VerifyCerificate(){
  const [ submitted, setSubmitted ] = useState(false)
  const [ feedback, setFeedback ] = useState({})
  const [ certificateCode, setCertificateCode ] = useState('')
  const certificateCodeRef = useRef('')
  const uri = useSelector( serverUriSelector ) + '/verify-certificate'
  const [ details, setDetails ] = useState('')
  const [ invalid, setInvalid ] = useState(false)
  const resetDetailsAndInvalid = useCallback(() => {
    setDetails('')
    setInvalid(false)
  },[])

  const handleFormSubmit = useCallback( async e => {
    e.preventDefault()
    try {
      const res = await axios.post(uri, { certificateCode })
  
      if(res.data.status) return setDetails(res.data.certificate)
      throw Error(`Invalid Certificate ID: ${ certificateCode }`)
    } catch (error) {
      setFeedback({ error: true, message: error.message || 'Something went wrong' })
    }finally{
      setSubmitted(false)
    }
   
  }, [uri, certificateCode])

  return (
   <div
    className="bg-gray-100 h-[100vh] flex flex-col gap-10 py-10">
     <form 
        onSubmit={ handleFormSubmit } 
        className="drop-shadow-xl grid gap-5 bg-white w-[95%] max-w-[600px] mx-auto py-10 px-5 rounded-md tuffy" > 
      <h1 
        className="text-3xl text-gray-800 tuffy-bold">
          Verify Certificate 
      </h1>
      { feedback.message && <DisplayNotification { ...{ feedback } } /> }
      <label 
        className="grid gap-3">
        <span 
          className="text-xl text-gray-700">
            Certificate ID:
        </span>
        <input 
          type="text" 
          className=" py-2 px-4 uppercase border-2 border-gray-400 rounded " 
          onChange={ e => setCertificateCode( e.target.value?.toLowerCase().trim() )  } />  
      </label>
      <SubmitButton { ...{
        setter: setSubmitted,
        submitted,
        text: 'find',
        submitText: 'finding certificate...',
        classes: `w-full ${ submitted ? '!lowercase': '' }`
      } } />
    </form>
    { details && <CertificateDetails { ...{ studentDetails: details } } /> }
   </div>
  )
}

function CertificateDetails( { studentDetails } ){
  const { name, studentNumber, certificateCode, programme, dateCompleted } = studentDetails

  return (
    <div className="grid gap-3 w-[95%] max-w-[600px] mx-auto bg-white drop-shadow-2xl px-5 py-8 rounded-md">
      <List { ...{ title: 'Name', value: name } } />
      <List { ...{ title: 'Student ID', value: studentNumber } } />
      <List { ...{ title: 'Certificate ID', value: certificateCode } } />
      <List { ...{ title: 'Programme', value: programme } } />
      <List { ...{ title: 'Validity', value: 'valid', status: true } } />
      <List { ...{ title: 'Date of completion', value: dateCompleted } } />
    </div>
  )
}

function List({ title, value, status }){
  return (
    <label
      className={`${ status ? 'flex gap-2 items-baseline':'grid gap-1' } uppercase`}>
      <b
        className="text-lg font-normal tuffy-bold text-black/90"> { title }: </b>
      <span
        className={`${ status ? 'text-green-600 font-semibold text-xl':'text-gray-800' } tuffy`}> { value } </span>
    </label>
  )
}