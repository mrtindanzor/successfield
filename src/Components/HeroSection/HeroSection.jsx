import background from "./../../assets/images/hero.webp";
import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";

const Content = {
  title: 'Excel with Successfield!',
  description: 'Get the expertise you need with our Executive Certificates and Doctrates. Enroll now and stay ahead!'
}

export default function HeroSection(){
  
  return (
    <div className={ styles.heroSection }>
      <h2 className={ styles.leadHeading }> { Content.title } </h2>
      <p className={ styles.description }> { Content.description } </p>
      <Link to='courses' className={ styles.callToAction }> Start a course </Link>
      <img src={ background } className={ styles.backgroundImage } />
    </div>
  )
}