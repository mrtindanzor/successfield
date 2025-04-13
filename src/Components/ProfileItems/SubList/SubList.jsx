import useProfileList from '../../../Contexts/ProfileContext/ListContext'
import { ChevronRight } from 'lucide-react'

export default function SubList(){
  const { activeSubList, activeMainList, setActiveSubList, mainListItems } = useProfileList()

  let classes = "ml-[1px] mt-[1px] bg-white md:bg-green-300 w-[100vw] md:max-w-[240px]"
  if(activeSubList === '' && activeMainList === "") classes += ' hidden md:block'
  if(activeSubList !== '') classes += ' hidden md:block'

  return (
    <>
      {
        activeMainList ? <ul className={ classes }>
                            { 
                              mainListItems[activeMainList].list && mainListItems[activeMainList].list.map((item, index) => {
                              return <li key={ index } className=" flex items-center justify-between hover:bg-green-600 hover:text-white cursor-pointer gap-3 p-2 border-b-1 border-b-gray-300 md:border-b-white h-fit  " data-section={ index } onClick={ (e) => setActiveSubList(e.target.dataset.section) }>
                                { item.subList }
                                <ChevronRight />
                                </li>
                            }) }
                          </ul> : null
      }
    </>
    
  )
}