import { useEffect, useState } from "react"
import useServerUri from "../../Contexts/baseServer"


export default function useGetApplications(){
  const uri = useServerUri() + 'users/applications'
  const [ allApplications, setAllAplications ] = useState([])
  useEffect(() => {
    getApplications()
  }, [])
  
  async function getApplications(){
    try {
      const response = await fetch(uri, { method: 'POST' })
      if(!response.ok) setAllAplications(null)
      const res = await response.json()
      if(response.ok) setAllAplications(res)
    } catch (err) {
      setAllAplications(null)
    }
  }

  return allApplications
}