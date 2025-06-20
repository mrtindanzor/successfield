import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeOff, Eye } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../Slices/userSlice'
import DisplayNotification from '../DisplayNotification'
import LoginQuestion from './LoginQuestion'
import SubmitButton from '../SubmitButton'

export default function Login(){
  const dispatch = useDispatch()
  const [ submitted, setSubmitted ] = useState(false)
  const [ credentials, setCredentials ] = useState({ email: '', password: '' })
  const [ isPassVisible, setIsPassVisible ] = useState(false)
  const [ feedback, setFeedback ] = useState({})
  const navigate = useNavigate()
  const handleSubmit = useCallback (async e => {
    e.preventDefault()
    
    try{
      setSubmitted(true)
      const res = await dispatch(login(credentials)).unwrap()
      if(res.status !== 200) throw Error(res.msg)
      setFeedback({ success: true, message: res.msg })
      navigate('/')
    } catch(err){
      setFeedback({ error: true, message: err.msg })
    } finally{
      setSubmitted(false)
    }
  }, [credentials])

  return (
    <div
      className="w-full h-[100vh] bg-gray-100 py-10 px-5 tuffy">
      <form 
        onSubmit={ handleSubmit } 
        className="relative grid gap-10 bg-white w-full sm:max-w-[600px] rounded-xl py-5 sm:py-10 px-5 py-10 sm:mx-auto md:px-10 pb-20 drop-shadow-md">
        { feedback.message && <DisplayNotification { ...{ feedback } } /> }
        <h3 className=" text-xl text-center border-2 font-semibold border-black py-2 rounded-md text-black">
          Login to Successfield
        </h3>
        <TextField { ...{ value: credentials.email, title: 'Email', position: 'email', setter: setCredentials } } />
        <TextField { ...{ value: credentials.password, title: 'Password', position: 'password', setter: setCredentials, setIsPassVisible, isPassVisible } } />
        <SubmitButton { ...{
          classes: `!w-full ${ submitted ? '!lowercase':'' }`,
          submitted,
          setter: setSubmitted,
          text: 'Login',
          submitText: 'signing you in...'
        } } />
        <LoginQuestion { ...{
          question: "Don't have account?",
          label: 'Create an account',
          link: '/users/join'
        } } />
      </form>
    </div>
  )
}

function TextField({ value, title, position, setter, setIsPassVisible, isPassVisible }){
  const inputType = useMemo(() => {
    let c = 'email'
    if(position === 'password' && !isPassVisible) c = 'password'
    if(isPassVisible) c = 'text'
    return c
  }, [isPassVisible])

  return (
    <label 
      className="relative grid"
      >
      <h3
        className="font-semibold text-xl sm:text-2xl"
        > { title }: </h3>
      <input 
        type={ inputType } 
        className="border-b-2 py-1 outline-none" 
        onChange={ e => setter( prev => ({ ...prev, [position]: e.target.value }) ) }
        value={ value  } />
      { position === 'password' && <span className="absolute right-5 bottom-2 cursor-pointer" 
        onClick={ () => setIsPassVisible(v => !v) }>
        { isPassVisible ? <EyeOff /> : <Eye /> }
      </span> }
    </label>
  )
}