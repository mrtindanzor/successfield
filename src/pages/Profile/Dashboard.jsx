import { useEffect, useRef } from 'react'
import styles from './Dashboard.module.css'
import useAuth from '../../Contexts/AuthenticationContext/AuthenticationContext'
import { capitalize } from '../../core'
import MainList from '../../Components/ProfileItems/MainList/MainList'
import useProfileList from '../../Contexts/ProfileContext/ListContext'
import SubList from '../../Components/ProfileItems/SubList/SubList'
import icons from '../../Icons/icons'
import Details from '../../Components/ProfileItems/Details/Details'

export default function Dashboard(){
  const { currentUser, userFullName } = useAuth()
  const userIcon = icons.userLine(styles.userIcon, 'Profile pic')
  const { dashboardRef } = useProfileList()

  useEffect(() => {
    document.title = capitalize('Dashboard - ' + userFullName )
  }, [currentUser])
  
  return (
    <> 
      <div className={ styles.profileDetails }>
        { userIcon }
        <div>
          <b> { userFullName } </b>
          <span> <span>Student ID: </span>{ currentUser.studentNumber } </span>
        </div>
      </div>
      <div className={ styles.dashboard } ref={ dashboardRef }>
        <MainList />
        <SubList />
        <Details />
      </div>
    </>
  )
}