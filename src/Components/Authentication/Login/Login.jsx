import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../Contexts/AuthenticationContext/AuthenticationContext'
import { useSetAlert } from '../../../Hooks/Alerter/Alerter'
import { EyeOff, Eye } from 'lucide-react'

const hideIcon = <EyeOff />
const showIcon = <Eye />


export default function Login(){
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isPassVisible, setIsPassVisible ] = useState(false)
  const setMsg = useSetAlert()
  const navigate = useNavigate()
  
  const credentials =  { email, password }
  const { login } = useAuth()
  
  const labelClasses = "relative flex flex-col items-start sm:flex-row sm:items-center w-full gap:2 sm:gap-5"
  const inputClasses = "w-full flex-1 border-1 py-1 px-3 border-gray-500 rounded"
  const emailLabel = <label className={ labelClasses }>
                          <span>Email: </span>
                          <input type="email" className={ inputClasses } onChange={ (e) => setEmail(e.target.value) } value={ email } />
                        </label>

  const passwordLabel = <label className={ labelClasses }>
                          <span>Password: </span>
                          <input type={ isPassVisible ? 'text' : 'password' } className={ inputClasses } onChange={ (e) => setPassword(e.target.value) } value={ password } />
                          <span className=" absolute right-5 bottom-2 " onClick={ () => toggleIconVisibility('password') }> { !isPassVisible ? hideIcon : showIcon } </span>
                        </label>

const handler = login

function toggleIconVisibility(object){
  if(object === 'password'){
      setIsPassVisible(v => !v)
    }
}

async function handleFormSubmission(e){
  e.preventDefault()

  try{
    const res = await handler(credentials, navigate)
    if(res && res.msg) setMsg(res.msg)
    } catch(err){
      setMsg(err.message)
    }
  }

  return (
    <>
      <form onSubmit={ (e) => handleFormSubmission(e) } className=" relative top-20 grid gap-10 bg-white mx-auto w-[98%] max-w-[400px] sm:max-w-[600px] rounded-xl py-10 px-3 md:px-10 ">
        <h3 className=" text-4xl text-green-500 font-bold "> Sign in </h3>
        { emailLabel }
        { passwordLabel }
        <button className=" text-white border-2 bg-green-600 w-fit ml-auto px-5 py-1 font-bold hover:bg-green-800 rounded-lg cursor-pointer "> Log in </button>
      </form>
    </>
  )
}