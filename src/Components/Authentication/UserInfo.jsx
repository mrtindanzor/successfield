import { useCallback, useMemo, useState, useReducer, useEffect } from 'react'
import { UserCircle } from 'lucide-react'
import { Selector } from './Registration'
import { useSelector } from 'react-redux'
import { userSelector } from '../../Slices/userSlice'
import { setAlertMessage } from '../../Slices/settingsSlice'

const ACTIONS = {
  ADD_USER: 'add_user',
  EDIT_INPUT: 'edit_input',
  FILL_ADDRESS: 'fill_address'
}

function userReducer(state, action){

  switch (action.type) {
    case ACTIONS.EDIT_INPUT:
      return {
        ...state,
        [action.position]: action.value
      }

    case ACTIONS.ADD_USER:
      return action.user

    case ACTIONS.FILL_ADDRESS:
      return {
        ...state,
        address: {
          ...state.address,
          [action.position]: action.value
        }
      }
      
    default:
      return state
  }
}

export default function  UserInfo() {
  const currentUser = useSelector( userSelector ).user
  const [ user, dispatchUser ] = useReducer(userReducer, currentUser)
  const genders = useMemo(() => [
    { gender: 'male' },
    { gender: 'female' }
  ], [])
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
  
  // useEffect(() => {
  //   document.body.classList.add("overflow-hidden")
  //   if(currentUser) dispatchUser({ type: ACTIONS.ADD_USER, user: currentUser })

  //   return () => document.body.classList.remove('overflow-hidden')
  // }, [currentUser])

  return null
  if(!user) return null

  return (
    <form
      className="fixed flex justify-center items-center w-[100vw] h-[100vh] z-99999 top-0 left-0 *:z-2"
      >
      <div className="absolute inset-0 bg-gray-900/90 !z-1"></div>
      <div
        className="flex flex-col gap-5 bg-white px-2 py-7 rounded-lg w-[99%] sm:max-w-[600px] h-[95vh] overflow-y-scroll">
          <div
            className="grid gap-5">
            <h3 className="flex gap-2 items-center">
              <UserCircle 
                className="bg-green-400 rounded-full text-white" 
                size="50"
              />
              <span className="sm:text-2xl capitalize font-bold">
                Update Your Information
              </span>
            </h3>
            <p
              className="px-4 font-semibold"
              >
              To keep your account secure and give you full access to your courses and certificates, we need a quick identity verification. It only takes a few minutes, and your information is kept safe and confidential.
            </p>
          </div>
        <h3
          className="font-bold "
          > Start Verification </h3>
          <hr />
        <TextField { ...{ dispatchUser, type: ACTIONS.EDIT_INPUT, title: 'First name', position: 'firstname', value: user.firstname } } />
        <TextField { ...{ dispatchUser, type: ACTIONS.EDIT_INPUT, title: 'Middle name', position: 'middlename', value: user.middlename } } />
        <TextField { ...{ dispatchUser, type: ACTIONS.EDIT_INPUT, title: 'Surname', position: 'surname', value: user.surname } } />
        <TextField { ...{ dispatchUser, type: ACTIONS.EDIT_INPUT, title: 'Date of Birth', position: 'birthDate', value: user.birthDate, date: true } } />
        <TextField { ...{ title: 'Gender', value: user.gender, disabled: true } } />
        <Selector { ...{ title: 'Gender', type: ACTIONS.EDIT_INPUT, dispatch: dispatchUser, db: genders, position: "gender", reducerPosition: 'gender' } } />
        <hr />
        <TextField { ...{ title: 'Passport photo', type: ACTIONS.EDIT_INPUT, file: true, position: 'userImage', dispatchUser } } />
        <TextField { ...{ title: 'id photo', type: ACTIONS.EDIT_INPUT, file: true, position: 'nationalId', dispatchUser } } />
        <hr />
        <TextField { ...{ title: 'Highest level of Education', value: user.educationLevel } } disabled />
        <Selector { ...{ dispatch: dispatchUser, type: ACTIONS.EDIT_INPUT, db: educationLevels, position: 'level', reducerPosition: 'educationLevel', title: 'your educational level' } } />
        <hr />
        <TextField { ...{ title: 'country', type: ACTIONS.FILL_ADDRESS, value: user.address.country, position: 'country', dispatchUser } } />
        <TextField { ...{ title: 'region / state', type: ACTIONS.FILL_ADDRESS, value: user.address.state, position: 'state', dispatchUser } } />
        <TextField { ...{ title: 'city', type: ACTIONS.FILL_ADDRESS, value: user.address.city, position: 'city', dispatchUser } } />
        <TextField { ...{ title: 'address1', type: ACTIONS.FILL_ADDRESS, value: user.address.address1, position: 'address1', dispatchUser } } />
        <TextField { ...{ title: 'address2', type: ACTIONS.FILL_ADDRESS, value: user.address.address2, position: 'address2', dispatchUser } } />
      </div> 
    </form>
  )
}

function TextField({ title, dispatchUser, type, position, date, disabled, file, value}){
  const [ image, setImage ] = useState(null)
  const setMsg = useSetAlert()
  const inputType = useMemo(() => {
    let t = 'text'
    if(date) t = 'date'
    if(file) t = 'file'
    if(position === 'phoneNumber') t = 'number'
    return t
  }, [])

  const readImage = useCallback((e, setter) => {
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
})
  
  return (
    <>
      <label
        className="grid gap-2 bg-gray-200 px-3 py-2 rounded">
        <span
          className="font-semibold text-gray-950 capitalize"
          >{ title }: </span>
        <input type={ inputType } 
          className="border-1 border-gray-700 rounded py-1 px-3" 
          value={ value ?? '' } 
          autoComplete="off"
          disabled={ disabled }
          accept='image/jpg/jpeg/png'
          onChange={ e => {
            if(!file) dispatchUser({ type, position, value: e.target.value })
            if(file) {
              readImage(e, setImage)
              dispatchUser({ type, position, value: e.target.files[0] })
            }
          } } />
      </label>
      {
        image && <div className="" >
                  <img src={ image } className="" />
                </div>
      }
    </>
  )
}
