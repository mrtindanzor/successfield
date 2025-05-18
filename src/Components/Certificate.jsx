import sample from './../assets/images/certificate.jpg'

export default function Certificate({ certificate }){
  if(!certificate) return null

  return (
    <div
      className="relative w-[calc(100%-2.5rem)] mx-auto sm:w-100 md:w-150 rounded"
      >
        <img
          src={ sample }
          className="object-fit"
          />
        <span
          className="absolute whitespace-nowrap text-base z-1 font-extrabold uppercase top-[38%] left-[50%] translate-x-[-50%] text-black "
          >
          { certificate.name }
        </span>
        <div
          className="absolute grid gap-0.5 sm:gap-1 md:gap-1.5 *:text-base *:not-first:whitespace-nowrap z-1 top-[50%] left-5 scale-[0.8]"
          >
            <span
              className="capital text-black font-extrabold"
              >
              Programme: <span className="uppercase font-semibold text-black"> { certificate.programme } </span>
            </span>
            <span
              className="capital text-black font-extrabold"
              >
              Student ID: <span className="uppercase font-semibold text-black"> { certificate.studentNumber } </span>
            </span>
            <span
              className="capital text-black font-extrabold"
              >
              Certificate ID: <span className="uppercase font-semibold text-black"> { certificate.certificateCode } </span>
            </span>
            <span
              className="capital text-black font-extrabold"
              >
              Date of Completion: <span className="uppercase font-semibold text-black"> { certificate.dateCompleted } </span>
            </span>
        </div>
    </div>
  )
}