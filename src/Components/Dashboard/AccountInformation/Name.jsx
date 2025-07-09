import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, changeName } from '../../../Slices/userSlice'
import { setLoader, setAlertMessage } from '../../../Slices/settingsSlice'
import InputField from '../../InputField'
import SubmitButton from '../../SubmitButton'

export default function Name(){
  const dispatch = useDispatch()
  const { user } = useSelector( userSelector )
  const [ submitted, setSubmitted ] = useState(false)
  const [ name, setName ] = useState(() => ({
    firstname: user.firstname,
    middlename: user.middlename,
    surname: user.surname
  }))
  const handleSubmit = useCallback( async e => {
    e.preventDefault()
    try{
      setSubmitted(true)
      setLoader(true)
      const res = await dispatch( changeName({ ...name }) ).unwrap()
      dispatch( setAlertMessage( res.msg ) )
    } catch(error){
      dispatch( setAlertMessage( error.message ) )
    } finally{
      setLoader(false)
      setSubmitted(false)
    }

  } )

  return (
    <form 
      onSubmit={ handleSubmit } 
      className=" grid gap-5 py-10 px-5 md:px-10 mx-auto w-full max-w-[500px] bg-white rounded-xl *:*:first:font-bold *:*:last:border-1 *:*:last:p-1 *:*:last:rounded *:not-first:grid *:not-first:gap-3 " >
      <i>Name may only be changed once. For any subsequent changes, contact support.</i>
      <InputField { ...{
        classes: 'capitalize',
        value: name.firstname,
        title: 'Firstname',
        nested: 1,
        setter: setName,
        position: 'firstname'
      } } />
      <InputField { ...{
        classes: 'capitalize',
        value: name.middlename,
        title: 'Middle name',
        nested: 1,
        setter: setName,
        position: 'middlename'
      } } />
      <InputField { ...{
        classes: 'capitalize',
        value: name.surname,
        title: 'Surname',
        nested: 1,
        setter: setName,
        position: 'surname'
      } } />
      {
        !user.namechanged || user.admin && 
          <SubmitButton { ...{
            classes: 'w-full',
            setter: setSubmitted,
            submitted,
            text: 'Save changes',
            submitText: 'Saving...'
          } } />
      }
    </form>
  )
}