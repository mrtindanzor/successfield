import { useEffect } from 'react'
import styles from './Prompt.module.css'

export default function ConfirmDialogPrompt(){
  
  
  return (
    <div className={ styles.prompt }>
      <p> { question } </p>
      <span> { message } </span>

      <div>
        <button> Yes </button>
        <button> No </button>
      </div>
    </div>
  )
}