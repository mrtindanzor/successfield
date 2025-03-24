import { useEffect } from 'react'
import styles from './Details.module.css'
import useProfileList from '../../../Contexts/ProfileContext/ListContext'

export default function Details(){
  const { activeMainList, activeSubList, mainListItems, dashboardRef } = useProfileList()
  useEffect(() => {
    if(activeSubList){
      // dashboardRef.current.style.transform = 'translateX(-200%)'
    }
  }, [activeSubList])

  return (
    <>
      {
        activeSubList ? <div className={ styles.detailsList }>
                          { 
                            mainListItems[activeMainList].list[activeSubList].section
                          }
                        </div> : null
      }
    </>
  )
}