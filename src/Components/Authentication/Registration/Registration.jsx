import { useState, useRef, useMemo } from "react";
import { useSetAlert } from "../../../Hooks/Alerter/Alerter";
import useAuth from './../../../Contexts/AuthenticationContext/AuthenticationContext'
import useCourses from './../../../Contexts/CourseContext/CoursesContext'
import { capitalize } from "../../../core";
import { Eye, EyeOff } from "lucide-react";

const hideIcon = <EyeOff className="absolute right-2 bottom-2" />
const showIcon = <Eye className="absolute right-2 bottom-2" />

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
  const [ programmesVisible, setProgrammeVisible ] = useState(false)
  const [ educationLevelsVisible, setEducationLevelsVisible ] = useState(false)
  const [ programme, setProgramme] = useState('Select programme')
  const [ gender, setGender ] = useState('male')
  const [ isPassVisible, setIsPassVisible ] = useState(false)
  const [ isCpassVisible, setIsCpassVisible ] = useState(false)
  const [ educationLevel, setEducationLevel] = useState('Select education level')
  const [ idPicture, setIdPicture ] = useState('')
  const [ userPicture, setUserPicture ] = useState('')
  const address = useRef('')
  const country = useRef('')
  const city = useRef('')
  const region = useRef('')
  const address1 = useRef('')
  const address2 = useRef('')
  const firstname = useRef('')
  const middlename = useRef('')
  const surname = useRef('')
  const birthDate = useRef('2000-01-01')
  const phoneNumber = useRef('')
  const email = useRef('')
  const contact = useRef('')
  const password = useRef('')
  const cpassword = useRef('')


  //tailwind ClassLists
  const labelClasses = "grid gap-3 w-full max-w-[100%] relative"
  const inputClasses = "border-2 border-b-gray-600 py-1 px-2 overflow-hidden whitespace-nowrap block w-full max-w-full rounded"
  const selectorClasses = " grid bg-white *:p-1 text-sm *:hover:bg-green-600 *:cursor-pointer *:hover:text-white *:border-b-1 *:border-b-gray-400 "
  const imageContainerClasses = "overflow-hidden"
  const imageClasses = "w-[90%] aspect-square max-w-[250px] object-contain"
  const uploadButtonClasses = " w-fit bg-white py-1 px-2 rounded before:w-[200px] max-w-fit before:h-[40px] overflow-hidden before:content-['☁️_upload'] cursor-pointer before:bg-green-400 before:text-gray-700 before:text-2xl uppercase before:flex before:items-center before:pl-1 before:rounded"

  const ProgrammeLabel =
    <label className={ labelClasses }>
      <span className="font-semibold text-gray-800">Programme: *</span>
      <div className="w-full overflow-hidden">
        <input type="text" onClick={ () => setProgrammeVisible(p => !p) } onChange={ () => setProgrammeVisible(false) } value={ programme } readOnly className={ inputClasses + " capitalize cursor-pointer hover:bg-green-400 hover:text-white" } />
        {
          programmesVisible && <ul className={ selectorClasses }>
                                  {
                                  coursesList.map((course, index) => {
                                  return <li key={ course.course + index } onClick={ () => setProgramme(course.course) }> 
                                  { capitalize(course.course) } 
                                  </li>
                                        })
                                  }
                                </ul>
        }
      </div>
    </label>

  const FirstnameLabel =
    <label className={ labelClasses }>
      <span>First name: *</span>
      <input type="text" className={ inputClasses } onChange={ e => firstname.current = e.target.value } />
    </label>

  const MiddlenameLabel =
    <label className={ labelClasses }>
      <span>Middle name: </span>
      <input type="text" className={ inputClasses } onChange={ e => middlename.current = e.target.value } />
    </label>

  const SurnameLabel =
    <label className={ labelClasses }>
      <span>Surname: *</span>
      <input type="text" className={ inputClasses } onChange={ e => surname.current = e.target.value } />
    </label>

  const BirthDateLabel =
    <label className={ labelClasses }>
      <span>Birth date: *</span>
      <input type="date" className={ inputClasses } onChange={ e => birthDate.current = e.target.value }  />
    </label>

  const GenderOptions =
    <div className={ labelClasses } >
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

  const AddressSection =
    <div className="">
      <span className="font-semibold">Address:</span>
      <label className={ labelClasses }>
        <span>Country: *</span>
        <input type="text" className={ inputClasses } onChange={ (e) => country.current = e.target.value } />
      </label>

      <label className={ labelClasses }>
        <span>State/Region: *</span>
        <input type="text" className={ inputClasses } onChange={ (e) => region.current = e.target.value } />
      </label>

      <label className={ labelClasses }>
        <span>City: *</span>
        <input type="text" className={ inputClasses } onChange={ (e) => city.current = e.target.value } />
      </label>

      <label className={ labelClasses }>
        <span>Address Line 1: *</span>
        <input type="text" className={ inputClasses } onChange={ (e) => address1.current = e.target.value } />
      </label>

      <label className={ labelClasses }>
        <span>Address Line 2:</span>
        <input type="text" className={ inputClasses } onChange={ (e) => address2.current = e.target.value } />
      </label>
    </div>

  const IdLabel =
    <label className={ labelClasses }>
      <span>National ID / Passport Document:</span>
      <input type="file" accept="image/jpg/jpeg/png" className={ uploadButtonClasses } onChange={ e => readImage(e, setIdPicture) } />
      {
        idPicture && (
          <div className={ imageContainerClasses } onClick={ e => e.preventDefault() }>
            <img src={ idPicture } className={ imageClasses } alt="Id Document" />
          </div>
        )
      }
    </label>


  const IdPhotoLabel =
    <label className={ labelClasses }>
      <span>Passport Photo:</span>
      <input type="file" accept="image/jpg/jpeg/png" className={ uploadButtonClasses } onChange={ e => readImage(e, setUserPicture) } />
      {
        userPicture && (
          <div className={ imageContainerClasses } onClick={ e => e.preventDefault() }>
            <img src={ userPicture } className={ imageClasses } alt="Passport photo" />
          </div>
        )
      }
    </label>

  const PhoneNumberLabel =
    <label className={ labelClasses }>
      <span>Contact number: </span>
      <input type="number" className={ inputClasses } onChange={ e => phoneNumber.current = e.target.value } />
    </label>  

  const EmailLabel =
    <label className={ labelClasses }>
      <span>Email: </span>
      <input type="email" className={ inputClasses } onChange={ e => email.current = e.target.value } />
    </label>

  const HighestEducationLevelLabel =
    <label >
      <span>Highest Level of Education:</span>
      <div className="">
        <input type="text" onClick={ () => setEducationLevelsVisible(p => !p) } onChange={ () => setEducationLevelsVisible(false) } value={ educationLevel } readOnly className={ inputClasses + " capitalize cursor-pointer hover:bg-green-400 hover:text-white" } />
        {
          educationLevelsVisible && <ul className={ selectorClasses }>
                                      {
                                        educationLevels.map((el, index) => {
                                          return <li key={ el.level + index } onClick={ () => setEducationLevel(el.level) }>
                                                    { el.level } 
                                                  </li>
                                        })
                                      }
                                    </ul>
        }
        
      </div>
    </label>

  const PasswordLabel =
    <label className={ labelClasses }>
      <span>Password: </span>
      <input type={ isPassVisible ? 'text' : 'password' } className={ inputClasses } onChange={ e => password.current = e.target.value } />
      <span className="absolute right-2 bottom-0" onClick={ () => toggleIconVisibility('password') }> { !isPassVisible ? hideIcon : showIcon } </span>
    </label>

  const CpasswordLabel =
    <label className={ labelClasses }>
      <span>Confirm password: </span>
      <input type={ isCpassVisible ? 'text' : 'password' } className={ inputClasses } onChange={ e => cpassword.current = e.target.value } />
      <span className="absolute right-2 bottom-0" onClick={ () => toggleIconVisibility('cpassword') }> { !isCpassVisible ? hideIcon : showIcon } </span>
    </label>

  const HoneyPot =
    <label className="hidden">
      <span>Contact: </span>
      <input type="number" onChange={ e => contact.current = e.target.value } autoComplete="off" />
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

function readImage(e, setter){
  const allowedExts = ['jpg','png','jpeg']
  const file = e.target.files[0]
  if(!file){
    setMsg("Choose a picture")
    setter('')
    return
  }
  const splitName = file.name.split('.')
  const ext = splitName[splitName.length - 1].toLowerCase()
  if(!allowedExts.includes(ext)){
    e.target.value = ''
    setter('')
    return setMsg("File type not supported, choose a different image")
  }

  const image = new FileReader()
  image.addEventListener('load', () => setter(image.result))
  image.readAsDataURL(file)
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
    const res = await handler(credentials)
    if(res && res.msg) setMsg(res.msg)
    } catch(err) {
  setMsg(err.message)
  }
}

  return (
    <>
      <form onSubmit={ (e) => handleFormSubmission(e) }
         className="w-94vw max-w-[95vw] md:max-w-[700px] mx-auto relative top-5 bg-white py-10 px-3 sm:px-5 grid gap-10 *:not-first:bg-gray-100 *:not-first:py-5 *:not-first:px-3 *:not-first:rounded *:not-first:grid *:not-first:gap-7 rounded-xl"
         >
        <h3 className="text-3xl font-bold"> Start Your Admission Application </h3>
        <div className="">
          { ProgrammeLabel }
          { FirstnameLabel }
          { MiddlenameLabel }
          { SurnameLabel }
          { BirthDateLabel }
          { GenderOptions }
        </div>
        <div className="" >
          { IdPhotoLabel }
          { IdLabel }
          { AddressSection }
          { HighestEducationLevelLabel }
        </div>
        <div className="" >
          { PhoneNumberLabel }
          { EmailLabel }
          { PasswordLabel }
          { CpasswordLabel }
          { HoneyPot }
        </div>
        <button className="!py-2 !px-3 !bg-green-600 !text-white cursor-pointer"> Submit Application </button>
      </form>
    </>
  )
}