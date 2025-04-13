import useProfileList from '../../../Contexts/ProfileContext/ListContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function MainList(){
  const { mainListItems, activeMainList, activeSubList, setActiveMainList, setActiveSubList } = useProfileList()

  function handleBackBtn(){
    if(activeSubList) return setActiveSubList('')
    return setActiveMainList('')
  }
  
  let classes ="bg-white md:bg-green-400 mt-[1px] md:min-h-100 md:max-w-[fit-content]"
  if(activeMainList) classes += ' hidden md:block '

  return (
    <>
      { ( activeSubList || activeMainList) && <button onClick={ handleBackBtn } className=' bg-green-300 w-7 h-7 m-3 md:hidden '> <ChevronLeft  /> </button> }
      <ul className={ classes }>
      {
        mainListItems.map((item, index) => {
          return <li key={ index } className=" flex gap-3 justify-between items-center hover:bg-green-600 cursor-pointer hover:text-white w-full  p-2 border-b-1 border-b-gray-300 md:border-b-white " data-section={ index } onClick={ (e) => setActiveMainList(e.target.dataset.section) }>
            { item.title }
            <ChevronRight />
          </li>
        })
      }
    </ul>
    </>
  )
}