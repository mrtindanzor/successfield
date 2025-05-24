import { useState } from "react"


const AccreditationCard = ({ accreditation }) => {
  const [ imageLoaded, setImageLoaded ] = useState(false)
  return (
    <div
      className="grid grid-rows-[1fr_auto] mb-5 sm:mb-8 md:mb-10 gap-2 h-auto w-full pb-5 overflow-hidden bg-gray-100 rounded-md"
      >
      <img
        className={`${ imageLoaded && '!opacity-100 transition duration-3000 ease-out' } opacity-0 w-full h-auto object-cover`}
        src={ accreditation?.image.secure_url.split('upload').join('upload/q_auto/f_auto') || null }
        loading="lazy"
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