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
      className="grid xl:grid-cols-2 2xl:grid-cols-3 py-10 mx-auto px-5 sm:px-8 md:px-10"
      >
      { accreditations && accreditations.map( agent => <AccreditationCard key={agent._id} { ...{ accreditation: agent } } />) }
    </ul>
  )
}

export default Accreditations