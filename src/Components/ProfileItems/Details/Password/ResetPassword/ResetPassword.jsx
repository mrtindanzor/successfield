import { useState } from 'react'
import useAuth from '../../../../../Contexts/AuthenticationContext/AuthenticationContext'

export default function ResetPassword(){
  const { currentUser } = useAuth()


  return (
    <form className=" grid gap-5 py-10 px-3 my-10 mx-auto w-[95%] max-w-[500px] md:px-10 bg-white rounded-xl *:*:first:font-bold *:*:last:border-1 *:*:last:p-1 *:*:last:rounded *:grid *:gap-3 ">
      <label>
        <span> Email: </span>
        <input type="email" value={ currentUser.email } readOnly />
      </label>
      <button className=" bg-green-400 text-white w-fit py-2 px-3 rounded justify-self-center cursor-pointer hover:bg-green-600 "> Reset </button>
    </form>
  )
}