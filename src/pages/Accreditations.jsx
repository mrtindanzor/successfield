import { useCallback, useEffect, useState } from "react"
import useServerUri from "../Contexts/baseServer"
import AccreditationCard from "../Components/AccreditationCard"


const Accreditations = () => {
  const [ accreditations, setAccreditations ] = useState(null)
  const uri = useServerUri() + 'get_accreditations'
  const getAccreditations = useCallback(async () => {
    try {
      const response = await fetch(uri, { method: 'POST' })
      const res = await response.json()
      console.log(res)
      setAccreditations(res.accreditations)
    } catch (error) {
      
    }
  }, [])

  useEffect(() => {
    getAccreditations()
  }, [])

  if(!accreditations) return null

  return (
    <ul
      className="px-5 sm:px-8 md:px-10 md:pt-10 pb-40 pt-5 lg:max-w-[1440px] mx-auto grid sm:grid-cols-[repeat(auto-fit,_minmax(500px,_1fr))] gap-x-5 gap-y-10"
      >
      { accreditations && accreditations.map( agent => {
        return <li
          key={agent._id}
          >
            <AccreditationCard { ...{ accreditation: agent } } />
          </li>
      } ) }
    </ul>
  )
}

export default Accreditations