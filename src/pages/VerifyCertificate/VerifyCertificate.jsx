import { useMemo, useRef, useState } from 'react'
import styles from './VerifyCertificate.module.css'
import { useCallback } from 'react'
import useServerUri from '../../Contexts/serverContexts/baseServer'

export default function VerifyCerificate(){
  const certificateCodeRef = useRef('')
  const serverUri = useServerUri()
  console.log(serverUri)
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

  const resetDetailsAndInvalid = useCallback(() => {
    setDetails('')
    setInvalid(false)
  })

  return (
   <>
     <form onSubmit={ (e) => handleFormSubmit(e) } className={ styles.form } > 
      <h1> Verify Certificate </h1>
      <label className={ styles.searchLabel }>
        <span>Certificate ID: </span>
        <input type="text" ref={ certificateCodeRef } className={ styles.searchBox } onChange={ resetDetailsAndInvalid } />  
      </label>
      <button className={ styles.submitButton }> Search </button>
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
    <div className={ styles.certificateDetails }>
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
        <span> VALID </span>
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
    <div className={ styles.invalidCertificate }>
      <h2>Invalid Certificate ID: { certificateCode } </h2>
      <div>
        <b> Status: </b>
        <span> INVALID </span>
      </div>
    </div>
  )
}