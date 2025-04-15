import { useState } from 'react'
import useAuth from '../../../../../Contexts/AuthenticationContext/AuthenticationContext'
import useServerUri from '../../../../../Contexts/serverContexts/baseServer'
import { useSetAlert } from '../../../../../Hooks/Alerter/Alerter'

export default function ChangePassword(){
  const [ oldPassword, setOldPassword ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ cpassword, setCpassword ] = useState('')
  const { currentUser, setCurrentUser } = useAuth()
  const serverUri = useServerUri()
  const setMsg = useSetAlert()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const options = { method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentUser.email, oldPassword, newPassword: password, confirmNewPassword: cpassword })
    }

    fetch( serverUri + 'users/changePassword', options )
      .then( res => res.json())
      .then( data => {
        setMsg(data.msg)
      })

  }

  return (
    <form onSubmit={ e => handleSubmit(e) } className=" grid gap-5 py-10 px-3 my-10 mx-auto w-[95%] max-w-[500px] md:px-10 bg-white rounded-xl *:*:first:font-bold *:*:last:border-1 *:*:last:p-1 *:*:last:rounded *:grid *:gap-3 ">
      <label>
        <span> Old password: </span>
        <input type="password" value={ oldPassword } onChange={ (e) => setOldPassword(e.target.value) } />
      </label>
      <label>
        <span> New password: </span>
        <input type="password" value={ password } onChange={ (e) => setPassword(e.target.value) } />
      </label>
      <label>
        <span> Confirm new password </span>
        <input type="password" value={ cpassword } onChange={ (e) => setCpassword(e.target.value) } />
      </label>
      <button className=" bg-green-400 text-white w-fit py-2 px-3 rounded justify-self-center cursor-pointer hover:bg-green-600 "> Apply changes </button>
    </form>
  )
}