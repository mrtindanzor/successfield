import { useState, useMemo } from "react"
import { ChevronDown } from "lucide-react"

export default function Navbar({ NavLinks, setCurrentPage, mainSection }) {
  const currentPage = useMemo(() => {
    return NavLinks[mainSection].title
  }, [mainSection])
  const [ navToggle, setNavToggle ] = useState(false)

  return (
    <>
      <span
        className="p-1 flex text-lg justify-between sm:hidden bg-white rounded cursor-pointer" 
        onClick={ () => {
          setNavToggle(c => !c)
        } }
        >
          { currentPage }
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
                setCurrentPage({ m: `${linkIndex}` })
                setNavToggle(c => !c)
              } }> { currentLink.title } </li>
          })
        }
      </ul>
    </>
  )
}
