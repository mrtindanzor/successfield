import { useRef, useState } from 'react'
import styles from './VerifyCertificate.module.css'
import { useCallback } from 'react'

export default function VerifyCerificate(){
  const certificateCodeRef = useRef('')
  const [ details, setDetails ] = useState('')
  const [ invalid, setInvalid ] = useState(false)

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault()

    const res = {name:'simon', studentNumber: 'sfc', certificateCode: 'sfc', programme: 'business', dateCompleted: 'december'}
    return setDetails({...res})

  }, [])

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