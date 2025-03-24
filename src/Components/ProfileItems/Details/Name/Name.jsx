import styles from './Name.module.css'
import useAuth from './../../../../Contexts/AuthenticationContext/AuthenticationContext'
import { useState } from 'react'

export default function Name(){
  const { currentUser } = useAuth()
  const [firstname, setFirstname] = useState(currentUser.firstname)
  const [middlename, setMiddlename] = useState(currentUser.middlename)
  const [surname, setSurname] = useState(currentUser.surname)

  return (
    <form className={ styles.form } >
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
        !currentUser.nameChanged && <button> Apply changes </button>
      }
    </form>
  )
}