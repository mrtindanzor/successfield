import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../Contexts/AuthenticationContext'
import { EyeOff, Eye } from 'lucide-react'
import DisplayNotification from '../DisplayNotification'
import LoginQuestion from './LoginQuestion'
import SubmitButton from '../SubmitButton'

export default function Login(){
  const [ submitted, setSubmitted ] = useState(false)
  const [ credentials, setCredentials ] = useState({ email: '', password: '' })
  const [ isPassVisible, setIsPassVisible ] = useState(false)
  const [ feedback, setFeedback ] = useState({})
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleFormSubmission(e){
    e.preventDefault()

    try{
      setSubmitted(true)
      const res = await login(credentials, navigate)
      if(!res) throw Error('Something went wrong')
      if(res){
        if(!res.status || res.status !== 200) throw Error(res.msg)
        setFeedback({ success: true, message: res.msg })
      }
    } catch(err){
      setFeedback({ error: true, message: err.message })
    } finally{
      setSubmitted(false)
    }
  }

  return (
    <>
      <form onSubmit={ (e) => handleFormSubmission(e) } className="relative grid gap-10 bg-gray-100 mx-5 w-[calc(100%-2.5rem)] sm:max-w-[600px] rounded-xl py-5 mt-10 sm:py-10 px-8 sm:mx-auto mb-10 md:px-10 pb-20">
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
    </>
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