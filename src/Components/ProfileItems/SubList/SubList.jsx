import { useEffect } from 'react'
import useProfileList from '../../../Contexts/ProfileContext/ListContext'
import styles from './SubList.module.css'

export default function SubList(){
  const { activeMainList, activeSubList, setActiveSubList, mainListItems, arrowRight, dashboardRef } = useProfileList()

  useEffect(() => {
    if(activeMainList){
      dashboardRef.current.style.transform = 'translateX(-100%)'
    }
  }, [activeMainList])

  return (
    <>
      {
        activeMainList ? <ul className={ styles.subList }>
                            { 
                              mainListItems[activeMainList].list.map((item, index) => {
                              return <li key={ index } data-section={ index } onClick={ (e) => setActiveSubList(e.target.dataset.section) }> { item.subList } { arrowRight } </li>
                            }) }
                          </ul> : null
      }
    </>
    
  )
}