import styles from "./Course.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCourses } from "./../../../Hooks/useCourses/useCourses";

export default function Course(){
  const { getCourse, currentCourse } = useCourses()
  let { course } = useParams()
  course = course.trim().toLocaleLowerCase().split('-').join(' ')

  useEffect(() => {
    getCourse(course)
  },[])

  return (
    <>
    </>
  )
}