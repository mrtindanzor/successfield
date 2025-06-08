import { useState } from "react"


const AccreditationCard = ({ accreditation }) => {
  const [ imageLoaded, setImageLoaded ] = useState(false)
  return (
    <li
      className="grid grid-rows-[auto_1fr] gap-5 bg-green-950 p-5 py-10 text-center rounded-2xl"
      >
      <div
        className="h-80 w-full overflow-hidden bg-green-950"
      >
        <img
        className={`${ imageLoaded && '!opacity-100 transition duration-3000 ease-out' } opacity-0 w-auto h-full mx-auto`}
        src={ accreditation?.image?.secure_url?.split('upload').join('upload/q_auto/f_auto') || null }
        loading="lazy"
        onLoad={ () => setImageLoaded(true) }
        alt={ accreditation.name } />
      </div>

      <span
        className="text-xl md:text-2xl capitalize px-1 font-semibold text-white"
        >
        { accreditation.name }
      </span>
    </li>
  )
}

export default AccreditationCard