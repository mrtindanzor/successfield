import useAuth from './../../../Contexts/AuthenticationContext/AuthenticationContext'

export default function Header(){
  const { userFullName } = useAuth()


  return (
    <div className="bg-red-500 font-bold text-2xl text-white text-shadow-black-1 texturina mx-auto w-[98vw] py-4 px-3">
      Admin: { userFullName }
    </div>
  )
}