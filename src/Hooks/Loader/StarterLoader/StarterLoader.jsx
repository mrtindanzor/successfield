import styles from "./StarterLoader.module.css";
import useAuthentication from "./../../useAuthentication/useAuthentication";

const loader = <div className={ styles.loader }>
                  <div className={ styles.one }></div>
              </div>

export default function StarterLoader(){
  const { initialRefreshPending } = useAuthentication()

  return  initialRefreshPending ? loader : null 
}