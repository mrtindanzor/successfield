import useProfileList from '../../../Contexts/ProfileContext/ListContext'
import { ChevronRight } from 'lucide-react'

export default function SubList(){
  const { activeSubList, activeMainList, setActiveSubList, mainListItems } = useProfileList()

  let classes = "ml-[1px] mt-[1px] bg-white md:bg-gray-800 w-full "
  if(!mainListItems[activeMainList]?.message) classes += ' md:max-w-[240px]'
  if(activeMainList === '1' && mainListItems[activeMainList]?.message) classes += ' flex flex-1 justify-center pt-10 text-2xl font-bold texturina !bg-gray-100 md:!bg-white'
  if(activeSubList === '' && activeMainList === "") classes += ' hidden md:block'
  if(activeSubList !== '') classes += ' hidden md:block'

  return (
    <>
      {
        activeMainList ? <ul className={ classes }>
          { mainListItems[activeMainList].message && mainListItems[activeMainList].message }
          { 
            !mainListItems[activeMainList].message && mainListItems[activeMainList].list && mainListItems[activeMainList].list.map((item, index) => {
            return <li key={ index } className={ `flex capitalize items-center justify-between hover:bg-gray-950 md:text-white cursor-pointer gap-3 p-2 border-b-1 border-b-gray-300 md:border-b-white h-fit  ${ index == activeSubList ? 'md:bg-gray-950' : '' } ` } data-section={ index } onClick={ (e) => setActiveSubList(e.target.dataset.section) }>
              { item.subList }
              <ChevronRight />
              </li>
          }) }
        </ul> : null
      }
    </>
    
  )
}