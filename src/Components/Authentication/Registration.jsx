import { useState, useReducer, useMemo } from "react";
import { useNavigate } from 'react-router-dom'
import { useSetAlert } from "../../Hooks/Alerter";
import useAuth from './../../Contexts/AuthenticationContext'
import useCourses from './../../Contexts/CoursesContext'
import usePendingLoader from './../../Contexts/PendingLoaderContext'
import { Eye, EyeOff, ChevronDown, ArrowRight, Plus } from "lucide-react";

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
    birthDate: '',
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
  const setMsg = useSetAlert()
  const navigate = useNavigate()
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

  setIsPendingLoading(true)
  setSubmitted(true)
  const res = await handler(user)
  setMsg(res.msg)
  setIsPendingLoading(false)
  if(res.status !== 201) setSubmitted(false)
  if(res.status === 201){
    dispatchUser({ type: ACTIONS.RESET_FORM, emptyUser })
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  setCurrentForm(1)
}

  return (
    <>
      <form onSubmit={ (e) => handleFormSubmission(e) }
        autoComplete="off"
        autoCapitalize="on"
         className="grid px-5 gap-10 sm:px-8 md:px-10 w-[95%] sm:max-w-[900px] mx-auto pt-10 pb-50"
         >
        <div
          className={`grid items-end sm:grid-cols-2 gap-10 ${ currentForm !== 1 && 'hidden' }`}
          >
          <h3 
            className="text-3xl sm:4xl md:text-5xl font-bold sm:col-span-2 text-black"
            > Start Your Admission Application </h3>
          <TextField { ...{ title: 'First name', type: ACTIONS.FILL_MAIN_INPUT, value: user.firstname, position: 'firstname', dispatchUser} } />
          <TextField { ...{ title: 'Middle name', type: ACTIONS.FILL_MAIN_INPUT, value: user.middlename, position: 'middlename', dispatchUser } } />
          <TextField { ...{ title: 'Surname', type: ACTIONS.FILL_MAIN_INPUT, value: user.surname, position: 'surname', dispatchUser, classList: 'sm:col-span-2'  } } />
          <TextField { ...{ title: 'Birth date', type: ACTIONS.FILL_MAIN_INPUT, value: user.birthDate, date: true, position: 'birthDate', dispatchUser, classList: 'sm:col-span-2' } } />
          <TextField { ...{ title: 'Gender', value: user.gender } } disabled />
          <Selector { ...{ dispatch: dispatchUser, type: ACTIONS.FILL_MAIN_INPUT, db: genders, position: 'gender', reducerPosition: 'gender', title: 'gender' } } />
          <NextButton { ...{ setter: setCurrentForm, location: 2 } } />
        </div>
        <div className={`${ currentForm !== 2 && 'hidden' } grid gap-10`} >
          <TextField { ...{ title: 'Programme', value: user.programme, classList: "sm:col-span-2" } } disabled />
          <Selector { ...{ dispatch: dispatchUser, type: ACTIONS.FILL_MAIN_INPUT, db: coursesList, position: 'course', reducerPosition: 'programme', title: 'programme', classList: "sm:col-span-2"} } />
          <TextField { ...{ title: 'Highest level of Education', value: user.educationLevel, classList: "sm:col-span-2" } } disabled />
          <Selector { ...{ dispatch: dispatchUser, type: ACTIONS.FILL_MAIN_INPUT, db: educationLevels, position: 'level', reducerPosition: 'educationLevel', title: 'your educational level', classList: "sm:col-span-2" } } />
          <TextField { ...{ title: 'Passport photo', type: ACTIONS.FILL_MAIN_INPUT, readImage, file: true, position: 'userImage', dispatchUser, classList: "sm:col-span-2" } } />
          <TextField { ...{ title: 'id photo', type: ACTIONS.FILL_MAIN_INPUT, readImage, file: true, position: 'nationalId', dispatchUser, classList: "sm:col-span-2" } } />
          <NextButton { ...{ setter: setCurrentForm, location: 3 } } />
        </div>
        <div  className={`${ currentForm !== 3 && 'hidden' } grid gap-10`}>
          <h3 
            className="text-2xl sm:3xl md:text-4xl font-bold sm:col-span-2 text-black"
            > Address* </h3>
          <TextField { ...{ title: 'country', type: ACTIONS.FILL_ADDRESS, value: user.address.country, position: 'country', dispatchUser } } />
          <TextField { ...{ title: 'region / state', type: ACTIONS.FILL_ADDRESS, value: user.address.state, position: 'state', dispatchUser } } />
          <TextField { ...{ title: 'city', type: ACTIONS.FILL_ADDRESS, value: user.address.city, position: 'city', dispatchUser, classList: "sm:col-span-2" } } />
          <TextField { ...{ title: 'address1', type: ACTIONS.FILL_ADDRESS, value: user.address.address1, position: 'address1', dispatchUser, classList: "sm:col-span-2" } } />
          <TextField { ...{ title: 'address2', type: ACTIONS.FILL_ADDRESS, value: user.address.address2, position: 'address2', dispatchUser, classList: "sm:col-span-2" } } />
          <TextField { ...{ title: 'contact number', type: ACTIONS.FILL_MAIN_INPUT, value: user.phoneNumber, position: 'phoneNumber', dispatchUser, classList: "sm:col-span-2" } } />
          <NextButton { ...{ setter: setCurrentForm, location: 4 } } />
        </div>
        <div className={`${ currentForm !== 4 && 'hidden' } grid gap-10`}>
          <h3 
            className="text-2xl sm:3xl md:text-4xl font-bold sm:col-span-2 text-black"
            > Login Information* </h3>
          <TextField { ...{ title: 'email', type: ACTIONS.FILL_MAIN_INPUT, value: user.email, position: 'email', dispatchUser, classList: 'sm:col-span-2' } } />
          <TextField { ...{ title: 'password', type: ACTIONS.FILL_MAIN_INPUT, value: user.password, password: true, position: 'password', dispatchUser, classList: 'sm:col-span-2' } } />
          <TextField { ...{ title: 'confirm password', type: ACTIONS.FILL_MAIN_INPUT, value: user.cpassword, password: true, position: 'cpassword', dispatchUser, classList: 'sm:col-span-2' } } />
          <TextField { ...{ title: 'contact', type: ACTIONS.FILL_MAIN_INPUT, value: user.contact, position: 'contact', dispatchUser } } />
        </div>
        <button className={ `${ submitted ? "!cursor-not-allowed" : ''} ${ currentForm !== 4 && 'hidden' } cursor-pointer [box-shadow:_2px_2px_2px_2px_gray] w-fit sm:col-span-2 bg-green-600 px-5 py-2 ml-auto text-white text-xl sm:text-2xl font-bold rounded-sm` } disabled={ submitted }> Submit Application </button>
      </form>
    </>
  )
}

function TextField({ title, type, password, position, dispatchUser, disabled, value, date, file, readImage, classList }){
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
      <label className={ `relative grid gap-3 ${classList} ${ position === 'contact' ? "hidden" : '' } ${ inputType === 'file' && image && '!col-span-1' }` }>
        <span
          className="font-semibold text-xl sm:text-2xl uppercase"
          >{ title }: </span>
        {
          inputType === 'file' && <div
            className="w-fit h-fit p-2 cursor-pointer [box-shadow:1px_1px_2px_2px_green] rounded-sm bg-green-600 text-white font-bold"
            >
              <Plus size={50} />
            </div>
        }
        <input type={ inputType } 
        className={`border-b-2 border-b-gray-950 outline-none py-1 ${ inputType === 'file' && 'hidden' }`}
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
                visible && visible.type !== 'password' ?
                  <EyeOff 
                    className="block mb-2"  /> 
                    : <Eye 
                      className="block mb-2"/> 
                } </span> 
        }
      </label>
      {
        image && <div 
                  className="h-50" >
                  <img src={ image } 
                    className="w-full h-full object-contain" />
                </div>
      }
    </>
  )
}

export function Selector({ title, dispatch, type, db, position, reducerPosition, classList }){
  const [ isVisible, setIsVisible ] = useState(false)

  return(
    <div 
      className={`grid items-end gap-2 relative h-fit border-1 ${ classList }`}>
        <span 
          className="flex whitespace-nowrap h-fit w-full px-5 py-2 rounded-sm text-white text-xl font-bold justify-between bg-green-500 cursor-pointer  [box-shadow:_2px_2px_2px_2px_gray]" 
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
                className="px-5 py-1 border-b-1 border-b-gray-300 cursor-pointer hover:bg-gray-950 hover:text-white"
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
      className="flex items-center gap-3 whitespace-nowrap text-white font-bold text-xl w-fit px-5 py-2 rounded-sm bg-green-500 text white mt-10 ml-auto sm:col-span-2 cursor-pointer [box-shadow:_2px_2px_2px_2px_gray]"
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