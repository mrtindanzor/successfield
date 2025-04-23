import { useRef, useState } from 'react'
import useServerUri from '../Contexts/baseServer'

export default function VerifyCerificate(){
  const certificateCodeRef = useRef('')
  const serverUri = useServerUri()
  const [ details, setDetails ] = useState('')
  const [ invalid, setInvalid ] = useState(false)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const uri = serverUri + 'verify-certificate'
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const method = 'POST'
    const certificateCode = certificateCodeRef.current.value
    const body = JSON.stringify({ certificateCode: certificateCode.toLowerCase().trim() })
    console.log('here')
    const response = await fetch(uri, { method, headers, body })
    console.log('there')
    if(!response.ok) return { status: 500, msg: 'An error occured.' }

    const res = await response.json()
    
    switch(res.status){
      case 200: 
          setDetails(res.certificate)
        break

      case 403:
          setInvalid(true)
        break
    }
  }

  const resetDetailsAndInvalid = () => {
    setDetails('')
    setInvalid(false)
  }

  return (
   <>
     <form onSubmit={ (e) => handleFormSubmit(e) } className=" grid gap-10 bg-white w-[95%] max-w-[600px] mx-auto py-10 px-5 rounded-xl relative top-10 " > 
      <h1 className=" text-4xl font-bold text-green-800 "> Verify Certificate </h1>
      <label className=" grid gap-3 ">
        <span className=" text-2xl font-semibold ">Certificate ID: </span>
        <input type="text" ref={ certificateCodeRef } className=" py-2 px-4 uppercase border-1 rounded " onChange={ resetDetailsAndInvalid } />  
      </label>
      <button className=" bg-green-600 py-2 px-4 text-white rounded cursor-pointer "> Search </button>
    </form>
    { details && <CertificateDetails studentDetails={ details } /> }
    { invalid && <InvalidCertificate certificateCode={ certificateCodeRef.current.value } /> }
   </>
  )
}

function CertificateDetails( { studentDetails } ){

  console.log(studentDetails)
  const { name, studentNumber, certificateCode, programme, dateCompleted } = studentDetails

  return (
    <div className=" grid gap-10 bg-white w-[95%] max-w-[600px] mx-auto py-10 px-5 rounded-xl mt-30 relative bottom-10 *:*:uppercase *:*:last:text-gray-600">
      <div>
        <b>Name: </b>
        <span> { name } </span>
      </div>
      <div>
        <b>Student Number: </b>
        <span> { studentNumber } </span>
      </div>
      <div>
        <b>Certificate ID: </b>
        <span> { certificateCode } </span>
      </div>
      <div>
        <b>Programme: </b>
        <span> { programme } </span>
      </div>
      <div>
        <b>Status:</b>
        <span className=" !text-green-500 font-bold "> VALID </span>
      </div>
      <div>
        <b>Date Completed: </b>
        <span> { dateCompleted } </span>
      </div>
    </div>
  )
}

function InvalidCertificate( { certificateCode } ){

  return (
    <div className=" grid gap-5 bg-white w-[95%] max-w-[600px] mx-auto py-10 px-5 rounded-xl mt-30 relative bottom-10 ">
      <h2 className=" font-bold text-xl uppercase ">Invalid Certificate ID: <span className=" text-lg font-semibold "> { certificateCode }  </span></h2>
      <div>
        <b> Status: </b>
        <span className=" font-bold text-red-500 "> INVALID </span>
      </div>
    </div>
  )
}