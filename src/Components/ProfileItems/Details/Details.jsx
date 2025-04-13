// OTHERS //
import useProfileList from '../../../Contexts/ProfileContext/ListContext';

export default function Details(){
  const { activeMainList, activeSubList, mainListItems } = useProfileList()

  let classes ="flex-1"
  if(activeSubList === '') classes += ' hidden md:block'

  return (
    <>
      {
        activeSubList && mainListItems[activeMainList].list ? <div className={ classes }>
                          { 
                            mainListItems[activeMainList].list[activeSubList].section
                          }
                        </div> : null
      }
    </>
  )
}