import { useState, useReducer, useMemo } from "react";
import { useSetAlert } from "../../Hooks/Alerter";
import useAuth from './../../Contexts/AuthenticationContext'
import useCourses from './../../Contexts/CoursesContext'
import usePendingLoader from './../../Contexts/PendingLoaderContext'
import { Eye, EyeOff, ChevronDown, ArrowRight, Upload } from "lucide-react";
import PreviewImage from "../PreviewImage";
import DisplayNotification from '../DisplayNotification'
import LoginQuestion from "./LoginQuestion";

const ACTIONS = {
  FILL_MAIN_INPUT: 'fill_main_input',
  FILL_ADDRESS: 'fill_address',
  RESET_FORM: 'reset_form'
}

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

    case ACTIONS.RESET_FORM:
      return action.emptyUser
  
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
    gender: 'male',
    birthDate: '00-00-0000',
    address: {
      country: '',
      state: '',
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
  const [ feedback, setFeedback ] = useState({})
  const { coursesList } = useCourses()
  const { setIsPendingLoading } = usePendingLoader()
  const { registration } = useAuth()
  const [ currentForm, setCurrentForm ] = useState(1)
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

async function handleFormSubmission(e){
  e.preventDefault()

  setIsPendingLoading(true)
  setSubmitted(true)
  const res = await handler(user)
  setFeedback(() => !res.status ? ({ error: true, message: res.msg }) : res.status === 201 ? ({ success: true, message: res.msg }) : ({ error: true, message: res.msg }) )
  setIsPendingLoading(false)
  if(res.status !== 201) setSubmitted(false)
  if(res.status === 201) dispatchUser({ type: ACTIONS.RESET_FORM, emptyUser })
  window.scrollTo({ top: 0, behavior: 'smooth' })
  setCurrentForm(res?.currentForm || 1)
}

  return (
    <>
      
      <form onSubmit={ (e) => handleFormSubmission(e) }
        autoComplete="off"
        autoCapitalize="on"
         className="w-[calc(100%-2.5rem)] grid sm:grid-cols-[1fr_3fr] gap-y-10 my-10 sm:max-w-[900px] mx-auto pt-10 pb-30 sm:bg-gray-100 sm:px-5 md:px-10 sm:my-10 sm:rounded-md "
         >
          { feedback.message && <div className="sm:col-span-2">
            <DisplayNotification { ...{ feedback } } />
          </div> }
        <h3 className="text-3xl md:text-4xl font-bold text-green-500 [text-shadow:_1px_1px_1px_black]">
          { currentForm === 1 && 'Start Your Admission Application' }
          { currentForm === 2 && 'Verification' }
          { currentForm === 3 && 'Address' }
          { currentForm === 4 && 'Login Information' }
        </h3>
        <div
          className={`grid gap-10 md:gap-5 ${ currentForm !== 1 && 'hidden' }`}
          >
          <TextField { ...{ title: 'First name:*', type: ACTIONS.FILL_MAIN_INPUT, value: user.firstname, position: 'firstname', dispatchUser} } />
          <TextField { ...{ title: 'Middle name:', type: ACTIONS.FILL_MAIN_INPUT, value: user.middlename, position: 'middlename', dispatchUser } } />
          <TextField { ...{ title: 'Surname:*', type: ACTIONS.FILL_MAIN_INPUT, value: user.surname, position: 'surname', dispatchUser  } } />
          <div>
            <TextField { ...{ title: 'Gender:*', value: user.gender } } disabled />
            <Selector { ...{ dispatch: dispatchUser, type: ACTIONS.FILL_MAIN_INPUT, db: genders, position: 'gender', reducerPosition: 'gender', title: 'gender' } } />
          </div>
          <TextField { ...{ title: 'Birth date:*', type: ACTIONS.FILL_MAIN_INPUT, value: user.birthDate, date: true, position: 'birthDate', dispatchUser } } />
          <NextButton { ...{ setter: setCurrentForm, location: 2 } } />
        </div>
        <div className={`${ currentForm !== 2 && 'hidden' } grid gap-10 md:gap-5`} >
          <div>
            <TextField { ...{ title: 'Programme:*', value: user.programme } } disabled />
            <Selector { ...{ dispatch: dispatchUser, type: ACTIONS.FILL_MAIN_INPUT, db: coursesList, position: 'course', reducerPosition: 'programme', title: 'programme'} } />
          </div>
          <div>
            <TextField { ...{ title: 'Highest level of Education:*', value: user.educationLevel } } disabled />
            <Selector { ...{ dispatch: dispatchUser, type: ACTIONS.FILL_MAIN_INPUT, db: educationLevels, position: 'level', reducerPosition: 'educationLevel', title: 'your educational level' } } />
          </div>
          <TextField { ...{ title: 'Passport photo:*', type: ACTIONS.FILL_MAIN_INPUT, file: true, value: user.userImage, setFeedback, position: 'userImage', dispatchUser } } />
          <TextField { ...{ title: 'id photo:*', type: ACTIONS.FILL_MAIN_INPUT, file: true, value: user.nationalId, setFeedback, position: 'nationalId', dispatchUser } } />
          <NextButton { ...{ setter: setCurrentForm, location: 3 } } />
        </div>
        <div  className={`${ currentForm !== 3 && 'hidden' } grid gap-10 md:gap-5`}>
          <TextField { ...{ title: 'country:*', type: ACTIONS.FILL_ADDRESS, value: user.address.country, position: 'country', dispatchUser } } />
          <TextField { ...{ title: 'region / state:*', type: ACTIONS.FILL_ADDRESS, value: user.address.state, position: 'state', dispatchUser } } />
          <TextField { ...{ title: 'city:*', type: ACTIONS.FILL_ADDRESS, value: user.address.city, position: 'city', dispatchUser } } />
          <TextField { ...{ title: 'address1:*', type: ACTIONS.FILL_ADDRESS, value: user.address.address1, position: 'address1', dispatchUser } } />
          <TextField { ...{ title: 'address2:', type: ACTIONS.FILL_ADDRESS, value: user.address.address2, position: 'address2', dispatchUser } } />
          <TextField { ...{ title: 'contact number:*', type: ACTIONS.FILL_MAIN_INPUT, value: user.phoneNumber, position: 'phoneNumber', dispatchUser } } />
          <NextButton { ...{ setter: setCurrentForm, location: 4 } } />
        </div>
        <div className={`${ currentForm !== 4 && 'hidden' } grid gap-10 md:gap-5 sm:max-w-[600px] mx-auto`}>
          <TextField { ...{ title: 'email:*', type: ACTIONS.FILL_MAIN_INPUT, value: user.email, position: 'email', dispatchUser, classList: 'sm:col-span-2' } } />
          <TextField { ...{ title: 'password:*', type: ACTIONS.FILL_MAIN_INPUT, value: user.password, password: true, position: 'password', dispatchUser, classList: 'sm:col-span-2' } } />
          <TextField { ...{ title: 'confirm password:*', type: ACTIONS.FILL_MAIN_INPUT, value: user.cpassword, password: true, position: 'cpassword', dispatchUser, classList: 'sm:col-span-2' } } />
          <TextField { ...{ title: 'contact', type: ACTIONS.FILL_MAIN_INPUT, value: user.contact, position: 'contact', dispatchUser, hidden: true } } />
          <button className={ `${ submitted ? "!cursor-not-allowed" : ''} cursor-pointer [box-shadow:_2px_2px_2px_2px_gray] w-fit bg-green-600 px-5 py-2 ml-auto mt-5 text-white text-xl sm:text-2xl font-bold rounded-sm` } disabled={ submitted }> Submit Application </button>
        </div>
        <LoginQuestion { ...{
          question: "Already have account?",
          label: 'Sign in',
          link: '/users/students-area'
        } } />
      </form>
    </>
  )
}

function TextField({ title, type, password, position, dispatchUser, disabled, value, hidden, date, file, setFeedback }){
  const [ visible, setIsVisible ] = useState({ type: 'password' })
  const inputType = useMemo(() => {
    let t = password ? visible.type : 'text'
    if(date) t = 'date'
    if(file) t = 'file'
    if(position === 'phoneNumber') t = 'tel'
    return t
  }, [visible])
  
  return (
    <>
      <label className={ `${ hidden ? 'hidden': '' } relative` }>
        <span
          className="font-semibold text-xl sm:text-2xl uppercase sm:text-gray-950"
          >{ title } </span>
        {
          inputType === 'file' && <div
            className="flex gap-2 items-center w-fit h-fit p-2 cursor-pointer rounded-sm bg-green-600 text-white font-normal"
            >
              <Upload /> upload image
            </div>
        }
        <input type={ inputType } 
          className={`${ disabled ? 'border-2 rounded px-2 mb-2 capitalize': 'border-b-2 border-b-gray-950' } text-gray-800 w-full outline-none py-1 ${ inputType === 'file' && 'hidden' }`}
          value={ file ? '' : value } 
          autoComplete="off"
          accept='image/jpg/jpeg/png'
          disabled={ disabled }
          onChange={ e => {
            if(!file) dispatchUser({ type, position, value: e.target.value })
            if(file)  dispatchUser({ type, position, value: e.target.files[0] }) 
          } } />
          { 
              password && <span className="absolute right-2 bottom-0 cursor-pointer"
                onClick={ () => setIsVisible( c => {
                  if(c.type === 'password') return { type: 'text' }
                  return { type: 'password' }
                } ) }
              > { 
                visible && visible.type !== 'password' ?
                  <EyeOff className="block mb-2 w-7 h-7"  /> 
                  : <Eye className="block mb-2 w-7 h-7"/> 
                } </span> 
        }
      </label>
      { file && value && <PreviewImage { ...{ file: value, setFeedback } } /> }
    </>
  )
}

export function Selector({ title, dispatch, type, db, position, reducerPosition, classList }){
  const [ isVisible, setIsVisible ] = useState(false)

  return(
    <div 
      className={`grid items-end gap-2 relative h-fit ${ classList }`}>
        <span 
          className="flex whitespace-nowrap h-fit w-full px-5 py-1 sm:py-2 rounded-sm text-white text-lg sm:text-xl justify-between bg-green-600 cursor-pointer" 
          onClick={ () => setIsVisible(c => !c) }>
          Select { title }
          <ChevronDown />
        </span>
        {
          isVisible && <ul 
            className="[box-shadow:_0_2px_1px_1px_gray] absolute top-[100%] w-full bg-white z-1">
          {
            db.map((item, index) => {
              return <li 
                key={ item }
                className="px-5 py-1 border-b-1 capitalize border-b-gray-300 cursor-pointer hover:bg-gray-950 hover:text-white"
                onClick={ e => {
                dispatch({ type, position: reducerPosition, value: item[position] })
                setIsVisible(false)
              }
            }> { item[position] } </li>
            })
          }
        </ul>
        }
      </div>
  )
}

function NextButton({ setter, location }){

  return (
    <div 
      className="flex items-center gap-3 whitespace-nowrap text-white font-bold text-xl w-fit px-5 py-2 rounded-sm bg-green-500 text white mt-10 ml-auto cursor-pointer [box-shadow:_2px_2px_2px_2px_gray]"
      onClick={ () => {
        setter(location)
        window.scrollTo({ top: 0, behavior: 'auto' })
      } }
      >
        Next
        <ArrowRight />
    </div>
  )
}