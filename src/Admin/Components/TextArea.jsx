const InputField = ({ setter, position, placeholder = '', value = '', classes = '' }) => {
  return (
    <textarea
      placeholder={ placeholder }
      className={`${ classes } border-2 border-gray-300 text-gray-500 rounded px-3 py-2 h-fit`}
      value={ value }
      onChange={ e => setter( prev => ({ ...prev, [position]: e.target.value }) ) }
    ></textarea>
  )
}

export default InputField