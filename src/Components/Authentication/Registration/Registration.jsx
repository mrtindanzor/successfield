import icons from "../../../Icons/icons";
import styles from './Registration.module.css'
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAlert } from "../../../Hooks/Alerter/Alerter";
import useAuth from './../../../Contexts/AuthenticationContext/AuthenticationContext'

const hideIcon = icons.eyeClose(styles.passwordIcon, 'Show')
const showIcon = icons.eyeOpen(styles.passwordIcon, 'Hide')


export default function Registration(){
  const educationLevels = useMemo(() => {
    const e = [
      "No Formal Education",
      "Primary Education",
      "Junior High School",
      "Senior High School / Secondary School",
      "Vocational / Technical Training",
      "Diploma / HND",
      "Bachelor's Degree",
      "Postgraduate Diploma",
      "Master's Degree",
      "Doctorate / PhD",
      "Professional Certification",
      "Other"
    ];
    return e 
  },[])
  
  const [ firstname, setFirstname ] = useState('')
  const [ middlename, setMiddlename ] = useState('')
  const [ surname, setSurname ] = useState('')
  const [ birthDate, setBirthDate ] = useState('')
  const [ gender, setGender ] = useState('')
  const [ address, setAddress ] = useState({  })
  const [ idDocument, setIdDocument ] = useState('')
  const [ passportPhoto, setPassportPhoto ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ educationLevel, setEducationLevel] = useState('')
  const [ contact, setContact ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ cpassword, setCpassword ] = useState('')
  const [ isPassVisible, setIsPassVisible ] = useState(false)
  const [ isCpassVisible, setIsCpassVisible ] = useState(false)
  const setMsg = useSetAlert()
  const navigate = useNavigate()
  
  const credentials = { firstname, middlename, surname, email, contact, password, cpassword }
  const { registration } = useAuth()
  
  const firstnameLabel = <label>
                          <span>First name: </span>
                          <input type="text" onChange={ (e) => setFirstname(e.target.value) } value={ firstname } required />
                        </label>

  const middlenameLabel = <label>
                            <span>Middle name: </span>
                            <input type="text" onChange={ (e) => setMiddlename(e.target.value) } value={ middlename } />
                          </label>

  const surnameLabel = <label>
                          <span>Surname: </span>
                          <input type="text" onChange={ (e) => setSurname(e.target.value) } value={ surname } required />
                        </label>

  const birthDateLabel = <label>
                            <span>Birth date:</span>
                            <input type="date" value={ birthDate } onChange={ (e) => setBirthDate(e.target.value) } required  />
                          </label>

  const genderOptions = <div>
                          <span>Gender: </span>
                          <label>
                            <input type="radio" name="gender" value='male' onChange={ (e) => setGender(e.target.value) } />
                            <span>Male</span>
                          </label>
                          <label>
                            <input type="radio" name="gender" value='female' onChange={ (e) => setGender(e.target.value) } />
                            <span>Female</span>
                          </label>
                      </div>

  const addressSection = <div>
                            <span>Address:</span>
                            <label>
                              <span>Country:</span>
                              <input type="text" value={ address.country } onChange={ (e) => setAddress(p => ({ ...p, country: e.target.value })) } required />
                            </label>

                            <label>
                              <span>State/Region:</span>
                              <input type="text" value={ address.region } onChange={ (e) => setAddress(p => ({ ...p, region: e.target.value })) } required />
                            </label>

                            <label>
                              <span>Zip Code:</span>
                              <input type="text" value={ address.postalCode } onChange={ (e) => setAddress(p => ({ ...p, postalCode: e.target.value })) } required />
                            </label>

                            <label>
                              <span>City:</span>
                              <input type="text" value={ address.city } onChange={ (e) => setAddress(p => ({ ...p, city: e.target.value })) } required />
                            </label>

                            <label>
                              <span>Address Line 1:</span>
                              <input type="text" value={ address.address1 } onChange={ (e) => setAddress(p => ({ ...p, address1: e.target.value })) } required />
                            </label>

                            <label>
                              <span>Address Line 2:</span>
                              <input type="text" value={ address.address2 } onChange={ (e) => setAddress(p => ({ ...p, address2: e.target.value })) } />
                            </label>
                         </div>

  const idLabel = <label>
                      <span>National ID / Passport Document:</span>
                      <input type="file" accept="image/*" className={ styles.uploadButton } value={ idDocument } onChange={ (e) => setIdDocument(e => e.target.value[0]) } />
                  </label>

  const idPhotoLabel = <label>
                    <span>Passport Photo:</span>
                    <input type="file" accept="image/*" className={ styles.uploadButton } value={ passportPhoto } onChange={ (e) => setPassportPhoto(e => e.target.value[0]) } />
                       </label>

  const phoneNumberLabel = <label>
                          <span>Contact number: </span>
                          <input type="number" value={ phoneNumber } onChange={ e => setPhoneNumber(e.target.value.trim()) } />
                           </label>

  const emailLabel = <label>
                          <span>Email: </span>
                          <input type="email" onChange={ (e) => setEmail(e.target.value) } value={ email } />
                     </label>

  const highestEducationLevelLabel = <label>
                                  <span>Highest Level of Education:</span>
                                  <input type="text" type='hidden' value={ educationLevel } />
                                  <ul>
                                    <span> {educationLevel} </span>

                                  </ul>
                                </label>

  const passwordLabel = <label>
                          <span>Password: </span>
                          <input type={ isPassVisible ? 'text' : 'password' } onChange={ (e) => setPassword(e.target.value) } value={ password } />
                          <span className={ styles.passwordIconBtn } onClick={ () => toggleIconVisibility('password') }> { !isPassVisible ? hideIcon : showIcon } </span>
                        </label>

  const cpasswordLabel = <label>
                          <span>Confirm password: </span>
                          <input type={ isCpassVisible ? 'text' : 'password' } onChange={ (e) => setCpassword(e.target.value) } value={ cpassword } />
                          <span className={ styles.passwordIconBtn } onClick={ () => toggleIconVisibility('cpassword') }> { !isCpassVisible ? hideIcon : showIcon } </span>
                        </label>

  const honeyPot = <label className={ styles.contactLabel }>
                          <span>Contact: </span>
                          <input type="number" onChange={ (e) => setContact(e.target.value) } value={ contact } autoComplete="off" />
                        </label>

const handler = registration

function toggleIconVisibility(object){
  if(object === 'password'){
      setIsPassVisible(v => !v)
    }
  if(object === 'cpassword'){
      setIsCpassVisible(v => !v)
    }
}

async function handleFormSubmission(e){
  e.preventDefault()
  
  try{
    const res = await handler(credentials, navigate)
    if(res && res.msg) setMsg(res.msg)
    } catch(err) {
  setMsg(err.message)
  }
}

  return (
    <>
      <form onSubmit={ (e) => handleFormSubmission(e) } className={ styles.authForm }>
        <h3> Admission </h3>
        { firstnameLabel }
        { middlenameLabel }
        { surnameLabel }
        { birthDateLabel }
        { genderOptions }
        { addressSection }
        { emailLabel }
        { highestEducationLevelLabel }
        { honeyPot }
        { passwordLabel }
        { cpasswordLabel }
        <button className={ styles.button }> Apply </button>
      </form>
    </>
  )
}