import { useEffect } from 'react'
import useProfileList from '../../../Contexts/ProfileContext/ListContext'
import styles from './SubList.module.css'

export default function SubList(){
  const { activeMainList, setActiveSubList, mainListItems, arrowRight } = useProfileList()

  return (
    <>
      {
        activeMainList ? <ul className={ styles.subList }>
                            { 
                              mainListItems[activeMainList].list && mainListItems[activeMainList].list.map((item, index) => {
                              return <li key={ index } data-section={ index } onClick={ (e) => setActiveSubList(e.target.dataset.section) }> { item.subList } { arrowRight } </li>
                            }) }
                          </ul> : null
      }
    </>
    
  )
}