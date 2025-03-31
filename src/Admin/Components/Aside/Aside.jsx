import styles from './Aside.module.css'

export default function Aside(){
 

  return (
    <ul className={ styles.aside }>
      <li>
        <span>students</span>
        <span>10</span>
      </li>
    </ul>
  )
}