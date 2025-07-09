import { useState, useReducer, useMemo, useEffect, useCallback } from "react";
import { useSelector } from 'react-redux'
import { registration } from '../../Slices/userSlice'
import { 
  setAlertMessage,
  setLoader,
  serverUriSelector
 } from '../../Slices/settingsSlice'
import { coursesListSelector } from '../../Slices/coursesSlice'
import { Eye, EyeOff, ChevronDown, Upload, MoveRight } from "lucide-react";
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
  const serverUri = useSelector( serverUriSelector )
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
    contact: '',
    serverUri
  }), [])
  const genders = useMemo(() => ([
    { gender: 'male' },
    { gender: 'female' }
  ]), [])
  const [ user, dispatchUser ] = useReducer(userReducer, emptyUser)
  const [ feedback, setFeedback ] = useState({})
  const coursesList = useSelector( coursesListSelector )
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
  const handleSubmit = useCallback( async e => {
    e.preventDefault()

    try{
      setSubmitted(true)
      const res = await registration(user)
      switch(res.status){
        case 201:
          setFeedback({ success: true, message: res.msg })
          dispatchUser({ type: ACTIONS.RESET_FORM, emptyUser })
        break

        default: 
          setFeedback({ error: true, message: res.msg })
      } 
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setCurrentForm(res?.currentForm || 1)
    } catch(error){
      setFeedback({ error: true, message: error.message || 'Something went wrong' })
    } finally{
      setSubmitted(false)
    }
    
  }, [user])

  useEffect(() => { feedback.message && setTimeout(() => setFeedback({}), 7000); }, [feedback])

  return (
    <div
      className="h-[100vh] min-h-fit w-full bg-gray-100 px-1 sm:px-3 py-4">
      <form 
        onSubmit={ handleSubmit }
        autoComplete="off"
        autoCapitalize="on"
        tabIndex={1}
         className="w-full bg-white grid gap-y-5 sm:max-w-[900px] mx-auto py-10 px-5 sm:px-8 md:px-10 rounded-md drop-shadow-md"
         >
          { feedback.message && <DisplayNotification { ...{ feedback } } /> }
        <h3 className="text-xl tuffy-bold border-2 font-extralight bg-black/90 py-3 px-5 rounded text-white text-center">
          { currentForm === 1 && 'Start Your Admission Application' }
          { currentForm === 2 && 'Verification' }
          { currentForm === 3 && 'Address' }
          { currentForm === 4 && 'Login Information' }
        </h3>
        <div
          className={`grid gap-4 ${ currentForm !== 1 && 'hidden' }`}
          >
          <TextField { ...{ title: 'First name:', type: ACTIONS.FILL_MAIN_INPUT, value: user.firstname, position: 'firstname', dispatchUser} } />
          <TextField { ...{ title: 'Middle name (Optional):', type: ACTIONS.FILL_MAIN_INPUT, value: user.middlename, position: 'middlename', dispatchUser } } />
          <TextField { ...{ title: 'Surname:', type: ACTIONS.FILL_MAIN_INPUT, value: user.surname, position: 'surname', dispatchUser  } } />
          <div>
            <TextField { ...{ title: 'Gender:', value: user.gender } } disabled />
            <Selector { ...{ dispatch: dispatchUser, type: ACTIONS.FILL_MAIN_INPUT, db: genders, position: 'gender', reducerPosition: 'gender', title: 'gender' } } />
          </div>
          <TextField { ...{ title: 'Birth date:', type: ACTIONS.FILL_MAIN_INPUT, value: user.birthDate, date: true, position: 'birthDate', dispatchUser } } />
          <NextButton { ...{ setter: setCurrentForm, location: 2 } } />
        </div>
        <div className={`${ currentForm !== 2 && 'hidden' } grid gap-4`} >
          <div>
            <TextField { ...{ title: 'Programme:', value: user.programme } } disabled />
            <Selector { ...{ dispatch: dispatchUser, type: ACTIONS.FILL_MAIN_INPUT, db: coursesList, position: 'course', reducerPosition: 'programme', title: 'programme'} } />
          </div>
          <div>
            <TextField { ...{ title: 'Highest level of Education:', value: user.educationLevel } } disabled />
            <Selector { ...{ dispatch: dispatchUser, type: ACTIONS.FILL_MAIN_INPUT, db: educationLevels, position: 'level', reducerPosition: 'educationLevel', title: 'your educational level' } } />
          </div>
          <TextField { ...{ title: 'Passport photo:', type: ACTIONS.FILL_MAIN_INPUT, file: true, value: user.userImage, setFeedback, position: 'userImage', dispatchUser } } />
          <TextField { ...{ title: 'National ID:', type: ACTIONS.FILL_MAIN_INPUT, file: true, value: user.nationalId, setFeedback, position: 'nationalId', dispatchUser } } />
          <NextButton { ...{ setter: setCurrentForm, location: 3 } } />
        </div>
        <div  className={`${ currentForm !== 3 && 'hidden' } grid gap-4`}>
          <TextField { ...{ title: 'country:', type: ACTIONS.FILL_ADDRESS, value: user.address.country, position: 'country', dispatchUser } } />
          <TextField { ...{ title: 'region / state:', type: ACTIONS.FILL_ADDRESS, value: user.address.state, position: 'state', dispatchUser } } />
          <TextField { ...{ title: 'city:', type: ACTIONS.FILL_ADDRESS, value: user.address.city, position: 'city', dispatchUser } } />
          <TextField { ...{ title: 'address1:', type: ACTIONS.FILL_ADDRESS, value: user.address.address1, position: 'address1', dispatchUser } } />
          <TextField { ...{ title: 'address2 (optional):', type: ACTIONS.FILL_ADDRESS, value: user.address.address2, position: 'address2', dispatchUser } } />
          <TextField { ...{ title: 'contact number:', type: ACTIONS.FILL_MAIN_INPUT, value: user.phoneNumber, position: 'phoneNumber', dispatchUser } } />
          <NextButton { ...{ setter: setCurrentForm, location: 4 } } />
        </div>
        <div className={`${ currentForm !== 4 && 'hidden' } grid gap-4 w-full px-3 mx-auto`}>
          <TextField { ...{ title: 'email:', type: ACTIONS.FILL_MAIN_INPUT, value: user.email, position: 'email', dispatchUser, classList: 'sm:col-span-2' } } />
          <TextField { ...{ title: 'password:', type: ACTIONS.FILL_MAIN_INPUT, value: user.password, password: true, position: 'password', dispatchUser, classList: 'sm:col-span-2' } } />
          <TextField { ...{ title: 'contact', type: ACTIONS.FILL_MAIN_INPUT, value: user.contact, position: 'contact', dispatchUser, hidden: true } } />
          <button className={ `${ submitted ? "!cursor-not-allowed" : ''}  flex items-center  gap-2 cursor-pointer w-fit border-2 border-green-600 bg-green-600 hover:bg-green-300 hover:text-green-600 text-lg text-white px-8 py-2 ml-auto mt-5 rounded-sm` } disabled={ submitted }> 
            <MoveRight
            
            />
            <span>
              Submit Application  
            </span>  
          </button>
        </div>
        <LoginQuestion { ...{
          question: "Already have account?",
          label: 'Sign in',
          link: '/users/students-area'
        } } />
      </form>
    </div>
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
      <label className={ `${ hidden ? 'hidden': '' } grid gap-1 relative` }>
        <span
          className="text-md capitalize tuffy-bold text-green-700">
          { title } </span>

        { inputType === 'file' && <div
            tabIndex={0}
            className="flex gap-2 items-center w-fit h-fit p-2 cursor-pointer rounded-sm bg-green-800 text-white text-sm">
              <Upload /> Upload image
            </div> }

        <input type={ inputType } 
          className={`${ disabled ? 'rounded mb-2 capitalize':'' } border-2 rounded-sm py-1 px-2 text-gray-950/70 w-full outline-none ${ inputType === 'file' && 'hidden' }`}
          value={ file ? '' : value } 
          autoComplete="off"
          accept='image/jpeg, image/png'
          disabled={ disabled }
          onChange={ e => {
            if(!file) dispatchUser({ type, position, value: e.target.value })
            if(file)  dispatchUser({ type, position, value: e.target.files[0] }) 
          } } />
          { password && <span className="absolute right-2 bottom-0 cursor-pointer"
              onClick={ () => setIsVisible( c => {
                if(c.type === 'password') return { type: 'text' }
                return { type: 'password' }
              } ) }
            > { 
              visible && visible.type !== 'password' ?
                <EyeOff className="block mb-2 w-5 h-5"  /> 
                : <Eye className="block mb-2 w-5 h-5"/> 
              } </span> }
      </label>
      { file && value && <PreviewImage { ...{ file: value, setFeedback } } /> }
    </>
  )
}

export function Selector({ title, dispatch, type, db, position, reducerPosition, classList }){
  const [ isVisible, setIsVisible ] = useState(false)

  return(
    <div 
      className={`grid items-end gap-2 relative tuffy h-fit ${ classList }`}>
        <span
          tabIndex={0}
          className="flex whitespace-nowrap h-fit w-full px-3 hover:bg-green-950/90 py-2 items-center rounded-sm text-white justify-between bg-green-800 cursor-pointer" 
          onClick={ () => setIsVisible(c => !c) }
          onKeyDown={ e =>  (e.key === 'Enter') ? setIsVisible(c => !c) :''  }>
          Select { title }
          <ChevronDown />
        </span>
        {
          isVisible && <ul 
            className="[box-shadow:_0_2px_1px_1px_gray] absolute top-[100%] w-full bg-white z-1">
          {
            db.map((item, index) => {
              return <li 
                key={ index }
                tabIndex={0}
                className="px-5 py-1 border-b-1 capitalize border-b-gray-300 cursor-pointer hover:bg-gray-950 hover:text-white"
                onClick={ e => {
                  dispatch({ type, position: reducerPosition, value: item[position] })
                  setIsVisible(false)
                  }
                }
                onKeyDown={ e => {
                    if(e.key === 'Enter'){
                      dispatch({ type, position: reducerPosition, value: item[position] })
                      setIsVisible(false)
                    }
                  }
                }> 
            { item[position] } </li>
            })
          }
        </ul>
        }
      </div>
  )
}

function NextButton({ setter, location }){

  return (
    <button
      role="button"
      tabIndex={0}
      className="flex items-center gap-3 whitespace-nowrap text-white w-fit px-8 py-2 rounded-sm bg-green-500/80 hover:bg-green-500 border-2 border-green-600 ml-auto cursor-pointer drop-shadow-md drop-shadow-gray-300"
      onClick={ e => {
        e.preventDefault()
        setter(location)
        window.scrollTo({ top: 0, behavior: 'auto' })
      } }
      >
        Next
        <MoveRight />
    </button>
  )
}