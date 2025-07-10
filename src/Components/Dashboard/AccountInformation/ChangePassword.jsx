import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, changePassword } from '../../../Slices/userSlice'
import { setLoader, setAlertMessage } from '../../../Slices/settingsSlice'
import SubmitButton from '../../SubmitButton'
import InputField from '../../InputField'
import { Eye, EyeOff } from 'lucide-react'

export default function ChangePassword(){
  const dispatch = useDispatch()
  const [ submitted, setSubmitted ] = useState(false)
  const [ password, setPassword ] = useState({
    oldPassword: '',
    password: ''
  })
  const { user } = useSelector( userSelector )
  const handleSubmit = useCallback( async e => {
    e.preventDefault()

    setSubmitted(true)
    dispatch( setLoader(true) )
    try{
      const res = await dispatch( changePassword({ ...password }) ).unwrap()
      dispatch( setAlertMessage( res.msg ) )
    } catch(error){
      dispatch( setAlertMessage( error.message ) )
    } finally{
      dispatch( setLoader(false) )
      setSubmitted(false)
    }
  }, [user, password])

  useEffect(() => {
    document.title = 'Successfield | Password'
  }, [])

  return (
    <form 
      onSubmit={ e => handleSubmit(e) } 
      className=" grid gap-5 py-10 px-3 mx-auto w-full max-w-[500px] md:px-10 bg-white rounded-xl *:*:first:font-bold *:*:last:border-1 *:*:last:p-1 *:*:last:rounded *:grid *:gap-3 ">
      <PasswordField { ...{
        value: password.oldPassword,
        setter: setPassword,
        position: 'oldPassword',
        title: 'Old password'
      } } />
      <PasswordField { ...{
        value: password.password,
        setter: setPassword,
        position: 'password',
        title: 'New password'
      } } />
      <SubmitButton { ...{
        submitted,
        text: 'Save changes',
        submitText: 'Saving',
        classes: 'w-full'
      } } />
    </form>
  )
}

function PasswordField({ setter, value, position, title }){
  const [type, setType ] = useState('password')

  return(
    <div
      className='relative'
    >
      <InputField { ...{
        value,
        setter,
        nested: 1,
        position,
        title,
        type
      } } />
      <div
        onClick={ () => setType( prev => prev === 'password' ? 'text' : 'password' ) }
        className='absolute right-2 top-1/2'
      >
        { type === 'password' ? <Eye /> : <EyeOff /> }
      </div>
    </div>
  )
}