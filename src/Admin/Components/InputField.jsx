const InputField = ({ setter, position, placeholder = '', value = '', classes }) => {
  return (
    <input
      type='text'
      placeholder={ placeholder }
      className={`${ classes } border-2 border-gray-300 text-gray-500 rounded px-3 py-2 h-fit`}
      value={ value }
      onChange={ e => setter( prev => ({ ...prev, [position]: e.target.value }) ) }
      />
  )
}

export default InputField