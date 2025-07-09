import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, changeEmail } from '../../../Slices/userSlice'
import { setLoader, setAlertMessage } from '../../../Slices/settingsSlice'
import SubmitButton from '../../SubmitButton'
import InputField from '../../InputField'

export default function Email(){
  const dispatch = useDispatch()
  const { user } = useSelector( userSelector )
  const [ email, setEmail ] = useState( user.email )
  const [ submitted, setSubmitted ] = useState(false)
  const handleSubmit = useCallback( async e => {
    e.preventDefault()
   
    try{
      setSubmitted(true)
      setLoader(true)
      const res = await dispatch( changeEmail( email ) ).unwrap()
      dispatch( setAlertMessage( res.msg ) )
    } catch(error){
      dispatch( setAlertMessage( error.message ) )
    } finally{
      setLoader(false)
      setSubmitted(false)
    }
  },[ email ])

  return (
    <form 
      onSubmit={ handleSubmit } 
    className=" grid gap-5 py-10 px-3 mx-auto w-full max-w-[500px] md:px-10 bg-white rounded-xl *:*:first:font-bold *:*:last:border-1 *:*:last:p-1 *:*:last:rounded *:grid *:gap-3 ">
      <InputField { ...{
        title: 'Email address',
        value: email,
        setter: setEmail,
      } } />
      <SubmitButton { ...{
        classes: 'w-full',
        submitted,
        setter: setSubmitted,
        text: 'Save changes',
        submitText: 'Saving...'
      } } />
    </form>
  )
}