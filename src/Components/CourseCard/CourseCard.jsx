import styles from "./CourseCard.module.css";
import { Link } from "react-router-dom";
import { capitalize, createAcronym } from "../../core";

export default function CourseCard({ pic = '', title }){
  const courseLink = title.toLowerCase().trim().split(' ').join('-')
  const courseAcronym = createAcronym(title)
  const placeholder = pic ? <img src={ pic } alt={ courseAcronym } className={ styles.coursePic } /> : <div className={ styles.acronym}> { courseAcronym } </div>

  return (
    <Link className={ styles.courseCard } to={ '/courses/' + courseLink }>
      { placeholder }
      <span className={ styles.title }> { capitalize( title ) } </span>
    </Link>
  )
}