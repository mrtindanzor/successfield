import { useCallback, useMemo, useState } from 'react'
import InputField from '../Components/InputField'
import TextArea from '../Components/TextArea'
import SubmitButton from '../Components/SubmitButton'
import DisplayNotification from '../../Components/DisplayNotification'
import { useSelector, useDispatch } from 'react-redux'
import { serverUriSelector, setLoader } from '../../Slices/settingsSlice'

export const AddFaq = () => {
  const dispatch = useDispatch()
  const serverUri = useSelector( serverUriSelector )
  const uri = useMemo(() => serverUri + 'add_faq')
  const [ feedback, setFeedback ] = useState({ success: false, error: false, message: null })
  const [faq, setFaq] = useState({ question: '', answer: '' })
  const [ loading, setLoading ] = useState(false)
  const submitForm = useCallback( async e => {
    e.preventDefault()

    setLoading(true)
    
    try{
      dispatch(setLoader(true))
      const res = await axios.post(uri, faq)
      if(res.data.status !== 201) throw Error(res.data.msg) 
      setFeedback({ success: true, message: res.data.msg })
      setFaq({ question: '', answer: '' })
    } catch(error){
      setFeedback({ error: true, message: error.message || 'Something went wrong' }) 
    } finally{
      dispatch(setLoader(false))
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
        } } />
      <TextArea { ...{
          placeholder: 'Answer...',
          setter: setFaq,
          value: faq.answer,
          position: 'answer'
        } } />
      <SubmitButton { ...{ loading } } />
    </form>
  )
}