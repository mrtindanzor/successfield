import sample from './../assets/images/certificate.jpg'

export default function Certificate({ certificate }){
  if(!certificate) return null

  return (
    <div
      className="relative w-[calc(100%-2.5rem)] mx-auto sm:w-100 md:w-150 rounded [font-family:_sans-serif]"
      >
        <img
          src={ sample }
          className="object-fit"
          />
        <span
          className="absolute whitespace-nowrap text-base sm:text-lg w-[80%] text-center text-green-600 z-1 font-bold uppercase top-[38%] left-[50%] translate-x-[-50%]"
          >
          { certificate.name }
        </span>
        <span 
          className="uppercase font-semibold text-center [font-size:14px] md:font-base w-[80%] text-black absolute left-[50%] translate-x-[-50%] top-[51%]"
          > { certificate.programme } </span>
        <div
          className="absolute grid justify-center gap-0.5 w-[80%] sm:gap-1 md:gap-1.5 *:text-base *:not-first:whitespace-nowrap z-1 top-[62%] left-[50%] translate-x-[-50%] scale-[0.8]"
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