import { useSelector } from "react-redux"
import MyCertificates from "./MyCertificates"
import { useParams } from "react-router-dom"
import { useMemo } from "react"
import sample from '../../assets/images/certificate.jpg'
import { Loading as Loader } from "../../Components/Loader"
import { userSelector } from "../../Slices/userSlice"

export default function MyCertificate(){
  const { certificates, loading } = useSelector( userSelector )
  const { certificateCode } = useParams()

  const certificate = useMemo(() => {
    if(!certificates) return null
    if(certificates.length < 1) return null
    const _c = certificates.find(cert => cert._id === certificateCode)
    return _c
  }, [certificateCode, certificates, loading])

  if(loading) return <Loader />

  return(
    <MyCertificates>
      { certificate && <Certificate
        { ...{ certificate } }
      /> }
    </MyCertificates>
  )
}

function Certificate({ certificate }) {
  return (
    <div
      className="relative w-auto z-0 h-100 aspect-[12/16] mx-auto rounded [font-family:_sans-serif]"
    >
      <img
        src={ sample }
        className="object-fit h-full w-full absolute z-[-1]"
        />
      <span
        className="absolute whitespace-nowrap text-sm w-[80%] text-center text-green-600 z-1 font-bold uppercase top-[38%] left-[50%] translate-x-[-50%]"
        >
        { certificate.name }
      </span>
      <span 
        className="uppercase font-semibold text-center text-[11px] w-[80%] text-black absolute left-[50%] translate-x-[-50%] top-[51%]"
        > { certificate.programme } </span>
      <div
        className="absolute grid justify-center w-[80%] *:text-[10px] *:not-first:whitespace-nowrap z-1 top-[62%] left-[50%] translate-x-[-50%]"
        >
        
        <span
          className="capital text-black font-semibold"
          >
          Student ID: <span className="uppercase text-gray-700"> { certificate.studentNumber } </span>
        </span>
        <span
          className="capital text-black font-semibold"
          >
          Certificate ID: <span className="uppercase text-gray-700"> { certificate.certificateCode } </span>
        </span>
        <span
          className="capital text-black font-semibold"
          >
          Date of Completion: <span className="uppercase text-gray-700"> { certificate.dateCompleted } </span>
        </span>
    </div>
  </div>
  )
}
