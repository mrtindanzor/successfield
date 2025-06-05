import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../Contexts/AuthenticationContext'
import { EyeOff, Eye } from 'lucide-react'
import DisplayNotification from '../DisplayNotification'

export default function Login(){
  const [ credentials, setCredentials ] = useState({ email: '', password: '' })
  const [ isPassVisible, setIsPassVisible ] = useState(false)
  const [ feedback, setFeedback ] = useState({})
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleFormSubmission(e){
    e.preventDefault()

    try{
      const res = await login(credentials, navigate)
      if(!res) throw Error('Something went wrong')
      if(res){
        if(!res.status || res.status !== 200) throw Error(res.msg)
        setFeedback({ success: true, message: res.msg })
      }
    } catch(err){
      setFeedback({ error: true, message: err.message })
    }
  }

  return (
    <>
      <form onSubmit={ (e) => handleFormSubmission(e) } className=" relative grid gap-10 bg-gray-100 mx-auto w-[98%] max-w-[400px] sm:max-w-[600px] rounded-xl py-5 mt-10 sm:py-10 px-5 mb-10 md:px-10 pb-20">
        { feedback.message && <DisplayNotification { ...{ feedback } } /> }
        <h3 className=" text-4xl sm:text-6xl text-green-500 font-bold [text-shadow:_1px_1px_1px_black] "> Sign in </h3>
        <TextField { ...{ value: credentials.email, title: 'Email', position: 'email', setter: setCredentials } } />
        <TextField { ...{ value: credentials.password, title: 'Password', position: 'password', setter: setCredentials, setIsPassVisible, isPassVisible } } />
        <button className=" text-white text-xl font-bold w-fit px-7 py-2 bg-green-500 hover:rounded-lg rounded cursor-pointer "> Log in </button>
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