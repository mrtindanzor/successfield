import icons from "../../../Icons/icons";
import styles from './Registration.module.css'
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAlert } from "../../../Hooks/Alerter/Alerter";
import useAuth from './../../../Contexts/AuthenticationContext/AuthenticationContext'
import useCourses from './../../../Contexts/CourseContext/CoursesContext'
import { capitalize } from "../../../core";

const hideIcon = icons.eyeClose(styles.passwordIcon, 'Show')
const showIcon = icons.eyeOpen(styles.passwordIcon, 'Hide')

export function toggleList(e, el){
  let list
  let display
  switch(el){
    case 'span':
        list = e.target.nextElementSibling
        display = getComputedStyle(list).display

        switch(display){
          case 'none':
              list.style.display = 'flex'
            break

          default: 
              list.style.display = 'none'
        }
      break

    default: 
        list = e.target.parentElement
        list.style.display = 'none'
  }
}

export default function Registration(){
  const setMsg = useSetAlert()
  const navigate = useNavigate()
  const { coursesList } = useCourses()
  
  const { registration } = useAuth()

  const educationLevels = useMemo(() => {
    const e = [
      { level: "No Formal Education" },
      { level: "Primary Education" },
      { level: "Junior High School" },
      { level: "Senior High School / Secondary School" },
      { level: "Vocational / Technical Training" },
      { level: "Diploma / HND" },
      { level: "Bachelor's Degree" },
      { level: "Postgraduate Diploma" },
      { level: "Master's Degree" },
      { level: "Doctorate / PhD" },
      { level: "Professional Certification" },
      { level: "Other"}
    ];
    return e 
  },[])
  
  const [ programme, setProgramme] = useState('')
  const [ gender, setGender ] = useState('male')
  const [ address, setAddress ] = useState({ 
                                            country: '',
                                            region: '',
                                            city: '',
                                            address1: '',
                                            address2: ''
                                          })
  const [ isPassVisible, setIsPassVisible ] = useState(false)
  const [ isCpassVisible, setIsCpassVisible ] = useState(false)
  const [ educationLevel, setEducationLevel] = useState('')
  const [ firstname, setFirstname ] = useState('')
  const [ middlename, setMiddlename ] = useState('')
  const [ surname, setSurname ] = useState('')
  const [ birthDate, setBirthDate ] = useState('2000-01-01')
  const [ idDocument, setIdDocument ] = useState('')
  const [ passportPhoto, setPassportPhoto ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ contact, setContact ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ cpassword, setCpassword ] = useState('')
  
  const ProgrammeLabel =
    <label>
      <span>Programme: *</span>
      <ul className={ styles.programme }>
        <span onClick={ e => toggleList(e, 'span')}> 
          { !programme && 'Select programme' } 
          { programme && capitalize(programme) }
          </span>
        <div>
          {
            coursesList.map((course, index) => {
              return <li key={ course.course + index } onClick={ e => {
                                                            setProgramme(course.course.trim()?.toLowerCase())
                                                            toggleList(e, 'list')
                                                            } }> 
                        { capitalize(course.course) } 
                      </li>
            })
          }
        </div>
      </ul>
    </label>

  const FirstnameLabel =
    <label>
      <span>First name: *</span>
      <input type="text" key='firstname' value={ firstname } onChange={ e => setFirstname(e.target.value) } required />
    </label>

  const MiddlenameLabel =
    <label>
      <span>Middle name: </span>
      <input type="text" key='middlename' value={ middlename } onChange={ e => setMiddlename(e.target.value) } />
    </label>

  const SurnameLabel =
    <label>
      <span>Surname: *</span>
      <input type="text" key='surname' value={ surname } onChange={ e => setSurname(e.target.value) } required />
    </label>

  const BirthDateLabel =
    <label>
      <span>Birth date: *</span>
      <input type="date" key='birthdate' value={ birthDate } onChange={ e => setBirthDate(e.target.value) } required  />
    </label>

  const GenderOptions =
    <div className={ styles.gender }>
      <span>Gender: *</span>
      <label>
        <input type="radio" key='male' name="gender" checked={ gender === 'male' } onChange={ (e) => setGender('male') } />
        <span>Male</span>
      </label>
      <label>
        <input type="radio" key='female' name="gender" checked={ gender === 'female' } onChange={ (e) => setGender('female') } />
        <span>Female</span>
      </label>
    </div>

  const AddressSection =
    <div className={ styles.address }>
      <span>Address:</span>
      <label>
        <span>Country: *</span>
        <input type="text" key='country' value={ address.country } onChange={ (e) => setAddress(p => ({ ...p, country: e.target.value.toLowerCase() })) } required />
      </label>

      <label>
        <span>State/Region: *</span>
        <input type="text" key='state' value={ address.region } onChange={ (e) => setAddress(p => ({ ...p, region: e.target.value.toLowerCase() })) } required />
      </label>

      <label>
        <span>City: *</span>
        <input type="text" key='city' value={ address.city } onChange={ (e) => setAddress(p => ({ ...p, city: e.target.value.toLowerCase() })) } required />
      </label>

      <label>
        <span>Address Line 1: *</span>
        <input type="text" key='address1' value={ address.address1 } onChange={ (e) => setAddress(p => ({ ...p, address1: e.target.value.toLowerCase() })) } required />
      </label>

      <label>
        <span>Address Line 2:</span>
        <input type="text" key='address2' value={ address.address2 } onChange={ (e) => setAddress(p => ({ ...p, address2: e.target.value?.toLowerCase() })) } />
      </label>
    </div>

  const IdLabel =
    <label>
      <span>National ID / Passport Document:</span>
      <input type="file" key='idDocument' accept="image/*" className={ styles.uploadButton } value={ idDocument }  onChange={ e => setIdDocument(e.target.files[0]) } />
    </label>


  const IdPhotoLabel =
    <label>
      <span>Passport Photo:</span>
      <input type="file" key='passportphoto' accept="image/*" className={ styles.uploadButton } value={ passportPhoto } onChange={ e => setPassportPhoto(e.target.files[0]) } />
    </label>

  const PhoneNumberLabel =
    <label>
      <span>Contact number: </span>
      <input type="number" key='phoneNumber' value={ phoneNumber } onChange={ e => setPhoneNumber(e.target.value) } />
    </label>  

  const EmailLabel =
    <label>
      <span>Email: </span>
      <input type="email" key='email' value={ email } onChange={ e => setEmail(e.target.value) } />
    </label>

  const HighestEducationLevelLabel =
    <label >
      <span>Highest Level of Education:</span>
      <ul className={ styles.educationLevels }>
        <span onClick={ e => toggleList(e, 'span') }> 
          { educationLevel && capitalize(educationLevel) } 
          { !educationLevel && 'Select your highest level of education' }
        </span>
        <div>
          {
            educationLevels.map((el, index) => {
              return <li key={ el + index } onClick={ (e) => {
                                                                setEducationLevel(el.level.toLowerCase()) 
                                                                toggleList(e, 'child')
                                                              } }>
                        { el.level } 
                      </li>
            })
          }
        </div>
      </ul>
    </label>

  const PasswordLabel =
    <label>
      <span>Password: </span>
      <input type={ isPassVisible ? 'text' : 'password' } key='password' value={ password } onChange={ e => setPassword(e.target.value) } />
      <span className={ styles.passwordIconBtn } onClick={ () => toggleIconVisibility('password') }> { !isPassVisible ? hideIcon : showIcon } </span>
    </label>

  const CpasswordLabel =
    <label>
      <span>Confirm password: </span>
      <input type={ isCpassVisible ? 'text' : 'password' } key='cpassword' value={ cpassword } onChange={ e => setCpassword(e.target.value) } />
      <span className={ styles.passwordIconBtn } onClick={ () => toggleIconVisibility('cpassword') }> { !isCpassVisible ? hideIcon : showIcon } </span>
    </label>

  const HoneyPot =
    <label className={ styles.contactLabel }>
      <span>Contact: </span>
      <input type="number" key='contact' value={ contact } onChange={ e => setContact(e.target.value) } autoComplete="off" />
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

  const credentials = { 
    programme, 
    firstname, 
    middlename, 
    surname, 
    birthDate, 
    address, 
    idDocument, 
    passportPhoto, 
    phoneNumber, 
    email, 
    educationLevel, 
    contact, 
    password, 
    cpassword
  }
  
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
        <div className={ styles.section }>
          { ProgrammeLabel }
          { FirstnameLabel }
          { MiddlenameLabel }
          { SurnameLabel }
          { BirthDateLabel }
          { GenderOptions }
        </div>
        <div className={ styles.section } >
          { IdPhotoLabel }
          { IdLabel }
          { AddressSection }
          { HighestEducationLevelLabel }
        </div>
        <div className={ styles.section } >
          { PhoneNumberLabel }
          { EmailLabel }
          { PasswordLabel }
          { CpasswordLabel }
          { HoneyPot }
        </div>
        <button className={ styles.button }> Apply </button>
      </form>
    </>
  )
}