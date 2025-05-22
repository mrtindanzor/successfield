import { useMemo, useReducer, useState, useCallback } from "react"
import useServerUri from "../../Contexts/baseServer"
import DisplayNotification from "../../Components/DisplayNotification"
import { CloudUpload } from "lucide-react"

const ACTIONS = {
  FILL_INPUT: 'fill_input',
  RESET_ACCREDITATIONS: 'empty_accreditations',
  NEW_ACCREDITATION: 'new_accreditation'

}

const accreditationsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FILL_INPUT:
      return {
          ...state,
          [action.position]: action.value
        }
  
    default:
      return state
  }
}

const InputField = ({ title, file, value, index, position, dispatch }) => {
  const [ image, setImage ] = useState(null)

  return (
    <label
      className="grid gap-2"
    >
      <span
        className="font-bold capitalize text-lg"
        >
        { title }
      </span>

      <input
        className={`${ file && 'hidden' } border-2 border-gray-500 rounded-sm px-3 py-2`}
        type={`${ file ? 'file' : 'text' }`}
        value={`${ file ? '' : value }`}
        onChange={ e => {
          dispatch({ type: ACTIONS.FILL_INPUT, index, position, value: file ? e.target.files[0] : e.target.value })
          if(file) setImage(e.target.files[0])
        } }
        />
      
      { file && <div
          className=""
          >
            <CloudUpload
          className="bg-green-500 w-30 h-10 p-2 rounded text-white cursor-pointer"
          />
          { file && image && <span
              className="text-lg font-bold text-green-600"
              > Image selected </span> }
          </div> }
    </label>
  )
}

const AccreditationStructure = ({ currentAccreditations, operation }) => {
  const emptyAccreditationForm = useMemo(() => {
    return {
      name: '',
      image: ''
    }
  }, [])
  const uri = useServerUri() + 'new_accreditation'
  const [ submitted, setSubmitted ] = useState(false)
  const [ feedback, setFeedback ] = useState({ message: '', error: false, success: false })
  const [ Accreditations, dispatchAccreditations ] = useReducer(accreditationsReducer, ( currentAccreditations ||  emptyAccreditationForm ) )
  const handleSubmit = useCallback( async e => {
    e.preventDefault()
    const body = new FormData()
    for(const key in Accreditations ){
      body.append(key, Accreditations[key])
    }
    const method = 'POST'
    try {
      const response = await fetch(uri, { method, body })
      if(!response.ok) setFeedback({ message: 'Something went wrong', error: true })
      if(response.ok){
        const res = await response.json()
        switch(res.status){
          case 201:
            dispatchAccreditations({ type: ACTIONS.RESET_ACCREDITATIONS, emptyAccreditationForm })
            setFeedback({ message: res.msg, success: true })
          break
          
          default:
            setFeedback({ message: res.msg, error: true })
          break
        }
      }
    } catch (error) {
      setFeedback({ message: error.message, error: true })
    } finally{
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setSubmitted(false)
    }


  }, [operation, Accreditations, submitted])

  return (
    <form
      onSubmit={ handleSubmit }
      className="max-w-[600px] grid gap-y-5 h-fit"
      >
      { feedback.message && <DisplayNotification { ...{ feedback } } />
        }
          
        <InputField { ...{ title: 'Name', value: Accreditations.name, position: 'name', dispatch: dispatchAccreditations } } />
        <InputField { ...{ title: 'Image', file: true, position: 'image', dispatch: dispatchAccreditations } } />
                
      <button
        onClick={ () => setSubmitted(true) }
        className={`${ submitted && 'pointer-events-none cursor-progress' } w-25 min-w-fit px-5 py-2 font-bold rounded-sm bg-gray-800 hover:bg-gray-950 text-white text-lg cursor-pointer`}
      >
        { !submitted && 'Submit' }
        { submitted && 'Submitting' }
      </button>
    </form>
  )

}

export const NewAccreditations = () => {
  return <AccreditationStructure />
}