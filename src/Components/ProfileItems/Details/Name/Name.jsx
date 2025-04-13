import useAuth from './../../../../Contexts/AuthenticationContext/AuthenticationContext'
import { useState } from 'react'

export default function Name(){
  const { currentUser } = useAuth()
  const [ firstname, setFirstname ] = useState(currentUser.firstname)
  const [ middlename, setMiddlename ] = useState(currentUser.middlename)
  const [ surname, setSurname ] = useState(currentUser.surname)

  return (
    <form className=" grid gap-5 py-10 px-3 my-10 mx-auto w-[95%] max-w-[500px] md:px-10 bg-white rounded-xl *:*:first:font-bold *:*:last:border-1 *:*:last:p-1 *:*:last:rounded *:not-first:grid *:not-first:gap-3 " >
      <i>Name may only be changed once. For any subsequent changes, contact support.</i>
      <label >
        <span>Firstname: </span>
        <input type="text" onChange={ (e) => setFirstname(e.target.value) } value={ firstname } />
      </label>
      <label >
        <span>Middlename: </span>
        <input type="text" onChange={ (e) => setMiddlename(e.target.value) } value={ middlename } />
      </label>
      <label >
        <span>Surname: </span>
        <input type="text" onChange={ (e) => setSurname(e.target.value) } value={ surname } />
      </label>
      {
        !currentUser.nameChanged && <button className=" bg-green-400 text-white w-fit py-2 px-3 rounded justify-self-center cursor-pointer hover:bg-green-600 "> Apply changes </button>
      }
    </form>
  )
}