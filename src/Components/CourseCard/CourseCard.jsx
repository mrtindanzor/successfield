import styles from "./CourseCard.module.css";
import { Link } from "react-router-dom";
import { capitalize, createAcronym } from "../../core";

export default function CourseCard({ pic = '', title, overview }){
  const courseLink = title.toLowerCase().trim().split(' ').join('-')
  const courseAcronym = createAcronym(title)
  const placeholder = pic ? <img src={ pic } alt={ courseAcronym } className={ styles.coursePic } /> : <div className={ styles.acronym}> { courseAcronym } </div>

  return (
    <div className={ styles.courseCard } >
      { placeholder }
      <span className={ styles.title }> { capitalize( title ) } </span>
      { overview && <Link to={ '/courses/' + courseLink } className={ styles.cardLink }> Start course </Link> }
    </div>
  )
}