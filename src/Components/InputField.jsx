import { useCallback } from 'react'

const InputField = ({ title, setter, type = 'text', position, nested, value, classes }) => {
  const setInput = useCallback( text => {
    if(!nested) setter(text)
    if(nested === 1) setter( prev => ({ ...prev, [position]: text }) )
  } ,[])

  return (
    <label
      className="grid gap-y-3"
    >
      <span
        className="font-semibold text-lg md:text-xl capitalize text-gray-800"
      > { title } : </span>
      <input 
        type={type}
        value={value}
        className={`${ classes } border-2 border-gray-500 rounded-md px-4 py-2`}
        onChange={ e => setInput(e.target.value) }
       />
    </label>
  )
}

export default InputField