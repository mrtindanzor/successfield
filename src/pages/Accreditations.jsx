import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Loading } from '../Components/Loader'
import { 
  accreditationsSelector,
  getAccreditations
 } from '../Slices/accreditationsSlice'

const Accreditations = () => {
  const dispatch = useDispatch()
  const { accreditations, loading } = useSelector( accreditationsSelector )

  useEffect(() => {
    dispatch( getAccreditations() )
  }, [])

  if(loading) return <Loading />

  return (
    <ul
      className="grid xl:grid-cols-2 2xl:grid-cols-3 py-10 mx-auto px-5 sm:px-8 md:px-10"
      >
      { accreditations && accreditations.map( agent => <AccreditationCard key={agent._id} { ...{ accreditation: agent } } />) }
    </ul>
  )
}


function AccreditationCard({ accreditation }){
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

export default Accreditations