import { useCallback, useMemo, useState } from 'react'
import InputField from '../Components/InputField'
import TextArea from '../Components/TextArea'
import SubmitButton from '../Components/SubmitButton'
import DisplayNotification from '../../Components/DisplayNotification'
import useServerUri from '../../Contexts/baseServer'

export const AddFaq = () => {
  const serverUri = useServerUri()
  const uri = useMemo(() => serverUri + 'add_faq')
  const [ feedback, setFeedback ] = useState({ success: false, error: false, message: null })
  const [faq, setFaq] = useState({ question: '', answer: '' })
  const [ loading, setLoading ] = useState(false)
  const submitForm = useCallback( async e => {
    e.preventDefault()

    setLoading(true)
    try{
      const method = 'POST'
      const body = JSON.stringify(faq)
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const options = {
        headers,
        method,
        body
      }
      const _res = await fetch(uri, options)
      if(!_res.ok) throw Error('Something went wrong') 
      const res = await _res.json()
      if(res.status !== 201) throw Error(res.msg) 
      setFeedback({ success: true, message: res.msg })
      if(res.status === 201) setFaq({ question: '', answer: '' })
    } catch(error){
      setFeedback({ error: true, message: error.message }) 
    } finally{
      setLoading(false)
    }
  }, [faq])

  return (
    <form
    onSubmit={ submitForm }
      className="grid h-fit gap-4"
      >
      { feedback.message && <DisplayNotification  { ...{ feedback } } /> }
      <InputField { ...{
          placeholder: 'Question...',
          setter: setFaq,
          value: faq.question,
          position: 'question'
        } }
      />
      <TextArea { ...{
          placeholder: 'Answer...',
          setter: setFaq,
          value: faq.answer,
          position: 'answer'
        } }
      />
      <SubmitButton { ...{ 
          loading,
        } }
      />
    </form>
  )
}