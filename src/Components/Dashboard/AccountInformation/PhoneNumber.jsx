import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, changePhone } from '../../../Slices/userSlice'
import { setLoader, setAlertMessage } from '../../../Slices/settingsSlice'
import SubmitButton from '../../SubmitButton'
import InputField from '../../InputField'

export default function PhoneNumber(){
  const dispatch = useDispatch()
  const { user } = useSelector( userSelector )
  const [ phoneNumber, setPhoneNumber ] = useState( user.phone )
  const [ submitted, setSubmitted ] = useState(false)
  const handleSubmit = useCallback( async e => {
    e.preventDefault()
   
    try{
      setSubmitted(true)
      setLoader(true)
      const res = await dispatch( changePhone({ phoneNumber }) ).unwrap()
      dispatch( setAlertMessage( res.msg ) )
    } catch(error){
      dispatch( setAlertMessage( error.message ) )
    } finally{
      setLoader(false)
      setSubmitted(false)
    }
  },[ phoneNumber ])

  return (
    <form 
      onSubmit={ handleSubmit } 
    className=" grid gap-5 py-10 px-3 mx-auto w-full max-w-[500px] md:px-10 bg-white rounded-xl *:*:first:font-bold *:*:last:border-1 *:*:last:p-1 *:*:last:rounded *:grid *:gap-3 ">
      <InputField { ...{
        title: 'Phone number',
        value: phoneNumber,
        setter: setPhoneNumber,
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