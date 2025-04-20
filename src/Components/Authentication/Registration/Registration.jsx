import { useState, useReducer, useMemo } from "react";
import { useNavigate } from 'react-router-dom'
import { useSetAlert } from "../../../Hooks/Alerter/Alerter";
import useAuth from './../../../Contexts/AuthenticationContext/AuthenticationContext'
import useCourses from './../../../Contexts/CourseContext/CoursesContext'
import { capitalize } from "../../../core";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

const ACTIONS = {
  FILL_MAIN_INPUT: 'fill_main_input',
  FILL_ADDRESS: 'fill_address'
}

const formClasses = "w-94vw max-w-[95vw] md:max-w-[950px] mx-auto relative top-5 py-10 grid gap-10 *:not-first:bg-gray-200 *:not-first:py-5 *:not-first:px-3 *:not-first:rounded *:not-first:grid *:not-first:gap-7 rounded-xl *:not-first:not-last:w-full *:not-first:not-last:mx-auto"
const labelClasses = "grid gap-3 w-[100%] mx-auto object-contain relative *:first:uppercase *:first:font-bold *:first:text-lg"
const inputClasses = "border-2 border-b-gray-600 py-1 px-2 overflow-hidden whitespace-nowrap block w-[100%] rounded"
const selectorClasses = " grid bg-white *:p-1 text-sm *:hover:bg-green-600 *:cursor-pointer *:hover:text-white *:border-b-1 *:border-b-gray-400 "
const imageContainerClasses = "!w-[calc(100%-1.5rem)] overflow-hidden"
const imageClasses = "aspect-square max-w-[250px] object-left object-contain rounded"
const uploadButtonClasses = " w-[200px] relative before:absolute before:top-0 before:left-0 before:inset-0 py-1 px-2 rounded before:w-full before:h-[40px] before:content-['☁️_upload'] cursor-pointer before:bg-green-400 before:text-gray-700 before:py-2 before:text-xl uppercase before:flex before:items-center before:pl-1 before:rounded overflow-hidden"
const listWrapperClasses = "grid gap-3 w-full *:first:font-bold mb-3"
const listSelectorClasses = 'p-2 cursor-pointer flex justify-between items-center bg-gray-800 hover:bg-gray-950 text-white rounded'
const dropdownMenuListClasses = 'bg-gray-100 *:p-2 *:capitalize *:border-b-1 *:border-b-gray-500 *:hover:bg-green-300 font-normal '
const submitButtonClasses = '!py-2 !px-3 !bg-green-600 !text-white cursor-pointer uppercase font-2xl font-bold'
const togglePasswordVisiblityClasses = 'absolute right-2 bottom-2'

function userReducer(state, action){
  
  switch (action.type) {
    case ACTIONS.FILL_MAIN_INPUT:
      return {
        ...state,
        [action.position]: action.value
      }

    case ACTIONS.FILL_ADDRESS:
      return {
        ...state,
        address: { ...state.address, [action.position]: action.value }
      }
  
    default:
      return state
  }
}

export default function Registration(){
  const emptyUser = useMemo(() => ({
    programme: '',
    educationLevel: '',
    firstname: '',
    middlename: '',
    surname: '',
    gender: '',
    birthDate: '2000-01-01',
    address: {
      country: '',
      region: '',
      city: '',
      address1: '',
      address2: ''
    }, 
    nationalId: '',
    userImage: '',
    phoneNumber: '',
    email: '',
    password: '',
    cpassword: '', 
    contact: ''
  }), [])
  const genders = useMemo(() => ([
    { gender: 'male' },
    { gender: 'female' }
  ]), [])
  const [ user, dispatchUser ] = useReducer(userReducer, emptyUser)
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
  const [ submitted, setSubmitted ] = useState(false)

const handler = registration

function readImage(e, setter){
  const allowedExts = ['jpg','png','jpeg']
  const file = e.target.files[0]
  console.log(file)
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

  setSubmitted(true)
  try{
    const res = await handler(user, setSubmitted)
    if(res && res.msg) setMsg(res.msg)
    if(!res.status) setSubmitted(false)
    } catch(err) {
    setMsg(err.message)
  }
}

  return (
    <>
      <form onSubmit={ (e) => handleFormSubmission(e) }
        autoComplete="off"
        autoCapitalize="on"
         className={ formClasses }
         >
        <h3 className="text-3xl font-bold"> Start Your Admission Application </h3>
        <div>
          <TextField { ...{ title: 'Programme', value: user.programme } } disabled />
          <Selector { ...{ dispatch: dispatchUser, db: coursesList, position: 'course', reducerPosition: 'programme', title: 'programme' } } />
          <TextField { ...{ title: 'Highest level of Education', value: user.educationLevel } } disabled />
          <Selector { ...{ dispatch: dispatchUser, db: educationLevels, position: 'level', reducerPosition: 'educationLevel', title: 'your educational level' } } />
          <TextField { ...{ title: 'First name', type: ACTIONS.FILL_MAIN_INPUT, value: user.firstname, position: 'firstname', dispatchUser } } />
          <TextField { ...{ title: 'Middle name', type: ACTIONS.FILL_MAIN_INPUT, value: user.middlename, position: 'middlename', dispatchUser } } />
          <TextField { ...{ title: 'Surname', type: ACTIONS.FILL_MAIN_INPUT, value: user.surname, position: 'surname', dispatchUser } } />
          <TextField { ...{ title: 'Birth date', type: ACTIONS.FILL_MAIN_INPUT, value: user.birthDate, date: true, position: 'birthDate', dispatchUser } } />
          <TextField { ...{ title: 'Gender', value: user.gender } } disabled />
          <Selector { ...{ dispatch: dispatchUser, db: genders, position: 'gender', reducerPosition: 'gender', title: 'gender' } } />
        </div>
        <div >
          <TextField { ...{ title: 'Passport photo', type: ACTIONS.FILL_MAIN_INPUT, readImage, file: true, position: 'userImage', dispatchUser } } />
          <TextField { ...{ title: 'id photo', type: ACTIONS.FILL_MAIN_INPUT, readImage, file: true, position: 'nationalId', dispatchUser } } />
          <TextField { ...{ title: 'country', type: ACTIONS.FILL_ADDRESS, value: user.address.country, position: 'country', dispatchUser } } />
          <TextField { ...{ title: 'region / state', type: ACTIONS.FILL_ADDRESS, value: user.address.region, position: 'region', dispatchUser } } />
          <TextField { ...{ title: 'city', type: ACTIONS.FILL_ADDRESS, value: user.address.city, position: 'city', dispatchUser } } />
          <TextField { ...{ title: 'address1', type: ACTIONS.FILL_ADDRESS, value: user.address.address1, position: 'address1', dispatchUser } } />
          <TextField { ...{ title: 'address2', type: ACTIONS.FILL_ADDRESS, value: user.address.address2, position: 'address2', dispatchUser } } />
        </div>
        <div >
          <TextField { ...{ title: 'contact number', type: ACTIONS.FILL_MAIN_INPUT, value: user.phoneNumber, position: 'phoneNumber', dispatchUser } } />
          <TextField { ...{ title: 'email', type: ACTIONS.FILL_MAIN_INPUT, value: user.email, position: 'email', dispatchUser } } />
          <TextField { ...{ title: 'password', type: ACTIONS.FILL_MAIN_INPUT, value: user.password, password: true, position: 'password', dispatchUser } } />
          <TextField { ...{ title: 'confirm password', type: ACTIONS.FILL_MAIN_INPUT, value: user.cpassword, password: true, position: 'cpassword', dispatchUser } } />
          <TextField { ...{ title: 'contact', type: ACTIONS.FILL_MAIN_INPUT, value: user.contact, position: 'contact', dispatchUser } } />
        </div>
        <button className={ `${ submitted ? "!cursor-not-allowed" : ''} ${ submitButtonClasses }` } disabled={ submitted }> Submit Application </button>
      </form>
    </>
  )
}

function TextField({ title, type, password, position, dispatchUser, disabled, value, date, file, readImage }){
  const [ visible, setIsVisible ] = useState({ type: 'password' })
  const [ image, setImage ] = useState(null)
  const inputType = useMemo(() => {
    let t = password ? visible.type : 'text'
    if(date) t = 'date'
    if(file) t = 'file'
    if(position === 'phoneNumber') t = 'number'
    return t
  }, [visible])
  
  return (
    <>
      <label className={ `${labelClasses} ${ position === 'contact' ? "hidden" : '' }` }>
        <span>{ title }: </span>
        <input type={ inputType } 
        className={ file ? uploadButtonClasses : inputClasses } 
          value={ value ?? '' } 
          autoComplete="off"
          accept='image/jpg/jpeg/png'
          disabled={ disabled }
          onChange={ e => {
            if(!file) dispatchUser({ type, position, value: e.target.value })
            if(file) {
              readImage(e, setImage)
              dispatchUser({ type, position, value: e.target.files[0] })
            }
          } } />
          { 
              password && <span className="absolute right-2 bottom-0"
                onClick={ () => setIsVisible( c => {
                  if(c.type === 'password') return { type: 'text' }
                  return { type: 'password' }
                } ) }
              > { 
                !visible ? 
                  <EyeOff className={ togglePasswordVisiblityClasses } /> 
                    : <Eye className={ togglePasswordVisiblityClasses } /> 
                } </span> 
        }
      </label>
      {
        image && <div className={ imageContainerClasses } >
                  <img src={ image } className={ imageClasses } />
                </div>
      }
    </>
  )
}

function Selector({ title, dispatch, db, position, reducerPosition }){
  const [ isVisible, setIsVisible ] = useState(false)

  return(
    <ul className={ listWrapperClasses }>
        <span className={ listSelectorClasses } onClick={ () => setIsVisible(c => !c) }>
          Select { title }
          <ChevronDown />
        </span>
        {
          isVisible && <div className={ dropdownMenuListClasses }>
          {
            db.map((item, index) => {
              return <li key={ Date.now() + '-' + index } onClick={ e => {
                dispatch({ type: ACTIONS.FILL_MAIN_INPUT, position: reducerPosition, value: item[position] })
                setIsVisible(false)
              }
            }> { item[position] } </li>
            })
          }
        </div>
        }
      </ul>
  )
}