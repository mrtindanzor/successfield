import styles from "./StarterLoader.module.css";
import { useAuth } from "./../../useAuthentication/useAuthentication";

const loader = <div className={ styles.loader }>
                  <div className={ styles.one }></div>
              </div>

export default function StarterLoader(){
  const { initialFetch } = useAuth()

  return  initialFetch ? loader : null 
}