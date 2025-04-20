import useProfileList from '../../../Contexts/ProfileContext/ListContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function MainList(){
  const { mainListItems, activeMainList, activeSubList, setActiveMainList, setActiveSubList } = useProfileList()

  function handleBackBtn(){
    if(activeSubList) return setActiveSubList('')
    return setActiveMainList('')
  }
  
  let classes ="bg-white md:bg-gray-800 mt-[1px] md:min-h-100 md:max-w-[fit-content]"
  if(activeMainList) classes += ' hidden md:block '

  return (
    <>
      { ( activeSubList || activeMainList) && <button onClick={ handleBackBtn } className=' bg-gray-400 flex justify-center p-1 items-center text-gray-800 cursor-pointer m-3 md:hidden rounded-tl-lg rounded-bl-lg '> <ChevronLeft className=' w-8 h-8 ' /> </button> }
      <ul className={ classes }>
      {
        mainListItems.map((item, index) => {
          return <li key={ index } className={`flex gap-3 justify-between items-center hover:bg-gray-950 cursor-pointer md:text-white w-full  p-2 border-b-1 border-b-gray-300 md:border-b-white ${ index == activeMainList ? 'md:bg-gray-950' : '' } `} onClick={ (e) => {
            setActiveSubList('')
            setActiveMainList( String(index) ) 
          } }>
            { item.title }
            <ChevronRight />
          </li>
        })
      }
    </ul>
    </>
  )
}