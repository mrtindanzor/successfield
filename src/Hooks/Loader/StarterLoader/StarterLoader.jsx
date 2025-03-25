import styles from "./StarterLoader.module.css";
import useAuth from "./../../../Contexts/AuthenticationContext/AuthenticationContext";
import icons from './../../../Icons/icons'

const logo = icons.logo(styles.logo, 'SUCCESSFIELD COLLEGE')

const loader = <div className={ styles.loader }>
                  { logo }
                  {/* <div className={ styles.one }></div> */}
                  <span className={ styles.loadText } > Loading... </span>
              </div>

export default function StarterLoader(){
  const { initialFetch } = useAuth()

  return  initialFetch ? loader : null 
}