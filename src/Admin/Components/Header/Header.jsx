import useAuth from './../../../Contexts/AuthenticationContext/AuthenticationContext'

export default function Header(){
  const { userFullName } = useAuth()


  return (
    <div className="bg-green-500 font-bold fixed top-0 left-0 text-2xl text-white text-shadow-black-1 texturina w-full z-999 py-4 px-3">
      Admin: { userFullName }
    </div>
  )
}