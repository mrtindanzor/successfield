const SubmitButton = ({ text = 'submit', submitText = '...', classes, submitted, setter }) => {
  return (
    <button
      onClick={ () => setter(true) }
      className={`${ classes } bg-gray-900 text-white font-bold capitalize hover:bg-gray-600 
      cursor-pointer rounded-md w-fit min-w-30 h-fit py-3 px-5 ${ submitted ? 'pointer-events-none':'' }`}
    >
      { !submitted && text }
      { submitted && submitText }
    </button>
  )
}

export default SubmitButton