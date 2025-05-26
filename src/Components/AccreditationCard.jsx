import { useState } from "react"


const AccreditationCard = ({ accreditation }) => {
  const [ imageLoaded, setImageLoaded ] = useState(false)
  return (
    <li
      className="grid grid-rows-[1fr_auto]gap-2 bg-white"
      >
      <img
        className={`${ imageLoaded && '!opacity-100 transition duration-3000 ease-out' } opacity-0 w-full h-auto`}
        src={ accreditation?.image?.secure_url?.split('upload').join('upload/q_auto/f_auto') || null }
        loading="lazy"
        onLoad={ () => setImageLoaded(true) }
        alt={ accreditation.name } />
      <span
        className="text-lg capitalize px-1 font-semibold "
        >
        { accreditation.name }
      </span>
    </li>
  )
}

export default AccreditationCard