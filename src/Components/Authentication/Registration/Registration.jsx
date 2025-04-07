import icons from "../../../Icons/icons";
import styles from './Registration.module.css'
import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAlert } from "../../../Hooks/Alerter/Alerter";
import useAuth from './../../../Contexts/AuthenticationContext/AuthenticationContext'
import useCourses from './../../../Contexts/CourseContext/CoursesContext'
import { capitalize } from "../../../core";

const hideIcon = icons.eyeClose(styles.passwordIcon, 'Show')
const showIcon = icons.eyeOpen(styles.passwordIcon, 'Hide')


export default function Registration(){
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
                                            country: null,
                                            region: null,
                                            city: null,
                                            address1: null,
                                            address2: null
                                          })
  const [ isPassVisible, setIsPassVisible ] = useState(false)
  const [ isCpassVisible, setIsCpassVisible ] = useState(false)
  const [ educationLevel, setEducationLevel] = useState('')
  const firstname = useRef('')
  const middlename = useRef('')
  const surname = useRef('')
  const birthDate = useRef('2000-01-01')
  const idDocument = useRef('')
  const passportPhoto = useRef('')
  const phoneNumber = useRef('')
  const email = useRef('')
  const contact = useRef('')
  const password = useRef('')
  const cpassword = useRef('')
  const setMsg = useSetAlert()
  const navigate = useNavigate()
  const { coursesList } = useCourses()
  
  const { registration } = useAuth()
  
  const programmeLabel = <label>
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

  const firstnameLabel = <label>
                          <span>First name: *</span>
                          <input type="text" ref={ firstname } required />
                        </label>

  const middlenameLabel = <label>
                            <span>Middle name: </span>
                            <input type="text" ref={ middlename } />
                          </label>

  const surnameLabel = <label>
                          <span>Surname: *</span>
                          <input type="text" ref={ surname } required />
                        </label>

  const birthDateLabel = <label>
                            <span>Birth date: *</span>
                            <input type="date" ref={ birthDate } required  />
                          </label>

  const genderOptions = <div className={ styles.gender }>
                          <span>Gender: *</span>
                          <label>
                            <input type="radio" name="gender" checked={ gender === 'male' } onChange={ (e) => setGender('male') } />
                            <span>Male</span>
                          </label>
                          <label>
                            <input type="radio" name="gender" checked={ gender === 'female' } onChange={ (e) => setGender('female') } />
                            <span>Female</span>
                          </label>
                      </div>

  const addressSection = <div className={ styles.address }>
                            <span>Address:</span>
                            <label>
                              <span>Country: *</span>
                              <input type="text" value={ address.country } onChange={ (e) => setAddress(p => ({ ...p, country: e.target.value.toLowerCase() })) } required />
                            </label>

                            <label>
                              <span>State/Region: *</span>
                              <input type="text" value={ address.region } onChange={ (e) => setAddress(p => ({ ...p, region: e.target.value.toLowerCase() })) } required />
                            </label>

                            <label>
                              <span>City: *</span>
                              <input type="text" value={ address.city } onChange={ (e) => setAddress(p => ({ ...p, city: e.target.value.toLowerCase() })) } required />
                            </label>

                            <label>
                              <span>Address Line 1: *</span>
                              <input type="text" value={ address.address1 } onChange={ (e) => setAddress(p => ({ ...p, address1: e.target.value.toLowerCase() })) } required />
                            </label>

                            <label>
                              <span>Address Line 2:</span>
                              <input type="text" value={ address.address2 } onChange={ (e) => setAddress(p => ({ ...p, address2: e.target.value?.toLowerCase() })) } />
                            </label>
                         </div>

  const idLabel = <label>
                      <span>National ID / Passport Document:</span>
                      <input type="file" accept="image/*" className={ styles.uploadButton } ref={ idDocument } />
                  </label>

  const idPhotoLabel = <label>
                    <span>Passport Photo:</span>
                    <input type="file" accept="image/*" className={ styles.uploadButton } ref={ passportPhoto } />
                       </label>

  const phoneNumberLabel = <label>
                          <span>Contact number: </span>
                          <input type="number" ref={ phoneNumber } />
                           </label>

  const emailLabel = <label>
                          <span>Email: </span>
                          <input type="email" ref={ email } />
                     </label>

  const highestEducationLevelLabel = <label >
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

  const passwordLabel = <label>
                          <span>Password: </span>
                          <input type={ isPassVisible ? 'text' : 'password' } ref={ password } />
                          <span className={ styles.passwordIconBtn } onClick={ () => toggleIconVisibility('password') }> { !isPassVisible ? hideIcon : showIcon } </span>
                        </label>

  const cpasswordLabel = <label>
                          <span>Confirm password: </span>
                          <input type={ isCpassVisible ? 'text' : 'password' } ref={ cpassword } />
                          <span className={ styles.passwordIconBtn } onClick={ () => toggleIconVisibility('cpassword') }> { !isCpassVisible ? hideIcon : showIcon } </span>
                        </label>

  const honeyPot = <label className={ styles.contactLabel }>
                          <span>Contact: </span>
                          <input type="number" ref={ contact } autoComplete="off" />
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
function toggleList(e, el){
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
async function handleFormSubmission(e){
  e.preventDefault()

  const credentials = { 
    programme, 
    firstname: firstname.current.value, 
    middlename: middlename.current.value, 
    surname: surname.current.value, 
    birthDate: birthDate.current.value, 
    address, 
    idDocument: idDocument.current?.files[0], 
    passportPhoto: passportPhoto.current?.files[0], 
    phoneNumber: phoneNumber.current.value, 
    email: email.current.value, 
    educationLevel, 
    contact: contact.current.value, 
    password: password.current.value, 
    cpassword: cpassword.current.value
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
          { programmeLabel }
          { firstnameLabel }
          { middlenameLabel }
          { surnameLabel }
          { birthDateLabel }
          { genderOptions }
        </div>
        <div className={ styles.section }>
          { idPhotoLabel }
          { idLabel }
          { addressSection }
          { highestEducationLevelLabel }
        </div>
        <div className={ styles.section }>
          { phoneNumberLabel }
          { emailLabel }
          { passwordLabel }
          { cpasswordLabel }
          { honeyPot }
        </div>
        <button className={ styles.button }> Apply </button>
      </form>
    </>
  )
}