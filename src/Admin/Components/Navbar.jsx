import { useEffect } from "react"

export default function Navbar({ NavLinks, navToggle, setNavToggle, setCurrentPage }) {

  useEffect(() => {
    if(navToggle) return
    const menuBtn = document.querySelector('.adminMenuBtn')
    const navbar = document.querySelector('.adminNavbar')
    document.body.addEventListener('click', e => {
      if(e.target !== menuBtn && !menuBtn.contains(e.target) && navbar !== e.target && !navbar.contains(e.target)) setNavToggle(false)
    })
  }, [])

  //styles
  const navClasses = `adminNavbar position fixed *:px-2 *:py-3 *:border-b-2 *:border-b-white left-0 bottom-0 h-[calc(100vh-65px)] bg-blue-950 w-[calc(100vw-10px)] max-w-[300px] z-1111 *:bg-gray-400 *:text-white *:text-xl *:uppercase *:cursor-pointer *:hover:bg-blue-800 *:font-bold transition-translate duration-300 ease-linear  ${ !navToggle ? 'translate-x-[calc(-100%-20px)]' : '' }`

  return (
    <ul className={ navClasses }>
      {
        NavLinks.map((currentLink, linkIndex) => {
          return <li key={ linkIndex } 
          onClick={ () => {
            setCurrentPage({ m: `${linkIndex}` })
            setNavToggle(c => !c)
          } }> { currentLink.title } </li>
        })
      }
    </ul>
  )
}
