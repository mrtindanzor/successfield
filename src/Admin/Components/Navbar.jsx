import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export default function Navbar({ NavLinks, setCurrentPage, mainSection }) {
  const [ currentSection, setCurrentSection ] = useState('Courses')
  const [ navToggle, setNavToggle ] = useState(false)

  useEffect(() => {
    if(navToggle) return
    const menuBtn = document.querySelector('.adminMenuBtn')
    const navbar = document.querySelector('.adminNavbar')
    document.body.addEventListener('click', e => {
      if(e.target !== menuBtn && !menuBtn.contains(e.target) && navbar !== e.target && !navbar.contains(e.target)) setNavToggle(false)
    })
  }, [])

  return (
    <>
      <span
        className="p-1 flex justify-between sm:hidden bg-white rounded cursor-pointer" 
        onClick={ () => {
          setNavToggle(c => !c)
        } }
        >
          { currentSection }
          <ChevronDown />
      </span>
      <ul 
        className={`p-2 md:h-full bg-white rounded ${ navToggle ? 'block' : 'hidden' } sm:block`}
        >
        {
          NavLinks.map((currentLink, linkIndex) => {
            return <li 
              className={`block p-2 px-3 border-b-1 border-b-gray-200 last:border-none sm:border-none sm:p-1 sm:rounded hover:text-black hover:bg-gray-300 cursor-pointer  items-center md:text-lg md:text-semi-bold ${ mainSection == linkIndex ? 'bg-gray-950 text-white' : 'text-gray-500' }`}
              key={ linkIndex } 
              onClick={ () => {
                setCurrentSection(currentLink.title)
                setCurrentPage({ m: `${linkIndex}` })
                setNavToggle(c => !c)
              } }> { currentLink.title } </li>
          })
        }
      </ul>
    </>
  )
}
