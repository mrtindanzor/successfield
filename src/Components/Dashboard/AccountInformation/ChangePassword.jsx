import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, changePassword } from '../../../Slices/userSlice'
import { setLoader, setAlertMessage } from '../../../Slices/settingsSlice'
import SubmitButton from '../../SubmitButton'
import InputField from '../../InputField'

export default function ChangePassword(){
  const dispatch = useDispatch()
  const [ submitted, setSubmitted ] = useState(false)
  const [ password, setPassword ] = useState({
    oldPassword: '',
    password: '',
    cpassword: ''
  })
  const { user } = useSelector( userSelector )
  const handleSubmit = ( useCallback( async e => {
    e.preventDefault()

    dispatch( setLoader(true) )
    try{
      const res = await dispatch( changePassword({ ...password }) ).unwrap()
      dispatch( setAlertMessage( res.msg ) )
    } catch(error){
      dispatch( setAlertMessage( error.message ) )
    } finally{
      dispatch( setLoader(false) )
    }
  } ), [user, password])

  return (
    <form onSubmit={ e => handleSubmit(e) } className=" grid gap-5 py-10 px-3 mx-auto w-[95%] max-w-[500px] md:px-10 bg-white rounded-xl *:*:first:font-bold *:*:last:border-1 *:*:last:p-1 *:*:last:rounded *:grid *:gap-3 ">
      <InputField { ...{
        value: password.oldPassword,
        setter: setPassword,
        nested: 1,
        position: 'oldPassword',
        title: 'Old password',
        type: 'password',
      } } />
      <InputField { ...{
        value: password.password,
        setter: setPassword,
        nested: 1,
        position: 'password',
        title: 'New password',
        type: 'password'
      } } />
      <InputField { ...{
        value: password.cpassword,
        setter: setPassword,
        nested: 1,
        position: 'cpassword',
        title: 'Confirm new password',
        type: 'password'
      } } />
      <SubmitButton { ...{
        submitted,
        setter: setSubmitted,
        text: 'Save changes',
        submitText: 'Saving',
        classes: 'w-full'
      } } />
    </form>
  )
}