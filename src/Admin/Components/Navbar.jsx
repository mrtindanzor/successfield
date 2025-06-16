import { useState, useMemo } from "react"
import { ChevronDown } from "lucide-react"

export default function Navbar({ NavLinks, setCurrentPage, mainSection }) {
  const currentPage = useMemo(() => {
    return NavLinks[mainSection].title
  }, [mainSection])
  const [ navToggle, setNavToggle ] = useState(false)

  return (
    <div
      className="z-1 relative w-[calc(100%-2.5rem)] md:w-full mx-auto my-4 md:my-0">
      <span
        className="flex text-lg justify-between sm:hidden py-3 px-5 md:p-1 text-gray-300 md:text-gray-700 bg-black/60 md:bg-white rounded cursor-pointer" 
        onClick={ () => {
          setNavToggle(c => !c)
        } }
        >
          { currentPage }
          <ChevronDown />
      </span>
      <ul 
        className={`p-2 absolute md:static w-full top-[100%] left md:h-full bg-gray-300 ${ navToggle ? 'block' : 'hidden' } sm:block`}
        >
        {
          NavLinks.map((currentLink, linkIndex) => {
            return <li 
              className={`block p-2 px-5 border-b-1 border-b-gray-200 last:border-none sm:border-none sm:rounded hover:text-gray-200 hover:bg-black/80 cursor-pointer  items-center md:text-lg md:text-semi-bold ${ mainSection == linkIndex ? 'bg-gray-950 text-white' : 'text-gray-500' }`}
              key={ linkIndex } 
              onClick={ () => {
                setCurrentPage({ m: `${linkIndex}` })
                setNavToggle(c => !c)
              } }> { currentLink.title } </li>
          })
        }
      </ul>
    </div>
  )
}
