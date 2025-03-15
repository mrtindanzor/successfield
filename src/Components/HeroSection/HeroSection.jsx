import background from "./../../assets/images/hero.webp";
import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";

export default function HeroSection(){
  
  return (
    <div className={styles.heroSection}>
      <h2 className={styles.leadHeading}> Get certified now! </h2>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem beatae soluta dolorum aperiam eius magni necessitatibus laboriosam, delectus neque illo! Minima, ratione. Minima voluptatem enim eius aspernatur doloribus nam iure.
      </p>
      <Link to='courses' className={styles.callToAction}> Browse courses </Link>
      <img src={ background } className={ styles.backgroundImage } />
    </div>
  )
}