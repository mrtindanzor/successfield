import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound(){

  return (
    <div className={styles.notFound}>
      <h2> 404 </h2>
      <p>
        The page or resource you are looking for has either been moved or does not exist.
      </p>
      <Link to='/' > Back to homepage </Link>
    </div>
  )
}