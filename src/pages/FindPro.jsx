import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { serverUriSelector } from '../Slices/settingsSlice'
import InputField from '../Components/InputField'
import TextArea from '../Components/TextArea'
import DisplayNotification from '../Components/DisplayNotification'
import SubmitButton from '../Components/SubmitButton'

const FindPro = () => {
  const [ feedback, setFeedback ] = useState({})
  const [ submitted, setSubmitted ] = useState(false)
  const uri = useSelector( serverUriSelector ) + '/get_professional'
  const [ credentials, setCredentials ] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const submitCredentials = useCallback( async e => {
    e.preventDefault()

    try {
      const res = await axios.post(uri, credentials)
      if(res.data.status !== 201) throw Error(res.data.message || 'Something went wrong')
      if(res.data.status === 201) setCredentials({name: '', email: '', phone: '', message: '' })
      setFeedback({ success: true, message: res.data.message })
    } catch (error) {
      setFeedback({ error: true, message: error.message })
    } finally{
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setSubmitted(false)
    }
  }, [credentials])

  useEffect(() => {
    document.title = 'Successfield | Find a professional'
  }, [])

  return (
    <section
      className="w-full mx-auto  md:pt-15  pb-20 bg-gray-100 md:bg-transparent"
    >
      <h2
        className="w-[95%]  md:w-[min(95%,_700px)] rounded-tl-xl rounded-tr-xl mx-auto px-5 sm:px-8 md:px-10 md:bg-gray-100 py-10 text-4xl font-bold md:font-extrabold"
      > Find a professional </h2>
      <form 
        onSubmit={ submitCredentials }
        className="grid gap-y-5 w-[95%] md:w-[min(95%,_700px)] rounded-bl-xl rounded-br-xl px-5 sm:px-8 md:px-10 pb-10 md mx-auto md:bg-gray-100"
      >
        { feedback.message && <DisplayNotification { ...{ feedback } } /> }
        <InputField { ...{
          title: 'Name',
          value: credentials.name,
          setter: setCredentials,
          position: 'name',
          nested: 1,
        } } />
        <InputField { ...{
          title: 'email',
          value: credentials.email,
          setter: setCredentials,
          position: 'email',
          nested: 1,
        } } />
        <InputField { ...{
          title: 'phone',
          value: credentials.phone,
          setter: setCredentials,
          position: 'phone',
          nested: 1,
        } } />
        <TextArea { ...{
          title: 'message',
          value: credentials.message,
          setter: setCredentials,
          position: 'message',
          nested: 1,
        } }  />
        <SubmitButton { ...{ submitted, setter: setSubmitted } } />
      </form>
    </section>
  )
}

export default FindPro