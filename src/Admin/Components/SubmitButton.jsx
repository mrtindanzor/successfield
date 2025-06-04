import React from 'react'

const SubmitButton = ({ text = 'submit', loadingText = 'submitting', loading, classes }) => {
  return (
    <button
      className={`${ classes } ${ loading ? 'pointer-events-none' : '' } bg-gray-800 text-white py-2 px-8 rounded-md block w-fit h-fit cursor-pointer font-semibold text-lg capitalize`}
    >
      { loading ? loadingText : text }
    </button>
  )
}

export default SubmitButton