import { useState } from 'react'
import useAuth from '../../../../Contexts/AuthenticationContext/AuthenticationContext'
import useServerUri from '../../../../Contexts/serverContexts/baseServer'
import usePendingLoader from '../../../../Contexts/PendingLoaderContext/PendingLoaderContext'
import { useSetAlert } from '../../../../Hooks/Alerter/Alerter'

export default function Email(){
  const { currentUser, setCurrentUser, setToken } = useAuth()
  const { setIsPendingLoading } = usePendingLoader()
  const setMsg = useSetAlert()
  const serverUri = useServerUri()
  const [ email, setEmail ] = useState( currentUser.email )
  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsPendingLoading(true)

    const options = { 
      method: 'POST', 
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentUser.email, newEmail: email })
    }
    
    fetch( serverUri + 'users/changeEmail', options )
      .then( res => res.json())
      .then( data => {

        if(data.status){
          setCurrentUser( user => ({ ...user, email }) )
          setToken(data.token)
        }

        const errorMessage = 'An error occured'
        setMsg(data.msg || errorMessage)
        setIsPendingLoading(false)
      })

  }

  return (
    <form onSubmit={ e => handleSubmit(e) } className=" grid gap-5 py-10 px-3 my-10 mx-auto w-[95%] max-w-[500px] md:px-10 bg-white rounded-xl *:*:first:font-bold *:*:last:border-1 *:*:last:p-1 *:*:last:rounded *:grid *:gap-3 ">
      <label >
        <span> Email address: </span>
        <input type="email" value={ email } onChange={ e => setEmail(e.target.value) } />
      </label>
      <button className=" bg-green-400 text-white w-fit py-2 px-3 rounded justify-self-center cursor-pointer hover:bg-green-600 "> Apply changes </button>
    </form>
  )
}