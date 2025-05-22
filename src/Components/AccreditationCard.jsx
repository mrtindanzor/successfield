import { useState } from "react"


const AccreditationCard = ({ accreditation }) => {
  const [ imageLoaded, setImageLoaded ] = useState(false)
  return (
    <div
      className="grid grid-rows-[1fr_auto] gap-2 h-100 sm:h-130 pb-5 overflow-hidden bg-gray-100 rounded-md"
      >
      <span
        className={`${ imageLoaded && 'hidden' } w-full h-90 sm:h-120 bg-gray-100 rounded flex items-center justify-center text-6xl`}
      >...</span>
      <img
        className={`${ !imageLoaded && 'hidden' } w-full h-90 sm:h-120 object-cover`}
        src={ accreditation?.image.secure_url || null }
        onLoad={ () => setImageLoaded(true) }
        alt={ accreditation.name } />
      <span
        className="text-lg capitalize px-3 sm:px-5 font-bold"
        >
        { accreditation.name }
      </span>
    </div>
  )
}

export default AccreditationCard