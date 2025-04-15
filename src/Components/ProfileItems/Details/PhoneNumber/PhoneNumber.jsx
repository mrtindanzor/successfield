import { useState } from 'react'
import useAuth from '../../../../Contexts/AuthenticationContext/AuthenticationContext'
import { useSetAlert } from '../../../../Hooks/Alerter/Alerter'
import useServerUri from '../../../../Contexts/serverContexts/baseServer'
import usePendingLoader from '../../../../Contexts/PendingLoaderContext/PendingLoaderContext'

export default function PhoneNumber(){
  const { setIsPendingLoading } = usePendingLoader()
  const { currentUser, setCurrentUser } = useAuth()
  const setMsg = useSetAlert()
  const serverUri = useServerUri()
  const [ phone, setPhone ] = useState( currentUser.phone )
  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsPendingLoading(true)

    const options = { method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentUser.email, phoneNumber: phone })
    }

    fetch( serverUri + 'users/changePhone', options )
      .then( res => res.json())
      .then( data => {
        
        switch(data.status){
          case 201:
            setCurrentUser( user => ({ ...user, phone }) )
              break
        }
        const errorMessage = 'An error occured'
        setMsg(data.msg || errorMessage)
        setIsPendingLoading(false)
      })

  }

  return (
    <form onSubmit={ e => handleSubmit(e) } className=" grid gap-5 py-10 px-3 my-10 mx-auto w-[95%] max-w-[500px] md:px-10 bg-white rounded-xl *:*:first:font-bold *:*:last:border-1 *:*:last:p-1 *:*:last:rounded *:grid *:gap-3 ">
      <label >
        <span> Phone number: </span>
        <input type="tel" value={ phone } onChange={ e => setPhone(e.target.value) } />
      </label>
      <button className=" bg-green-400 text-white w-fit py-2 px-3 rounded justify-self-center cursor-pointer hover:bg-green-600 "> Apply changes </button>
    </form>
  )
}