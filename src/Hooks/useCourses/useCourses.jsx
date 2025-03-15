import coursesDb from "./coursesDb";
import { useEffect, useState } from "react";

export default function useCourses(){
  const [Courses, setCourses] = useState(coursesDb)

  const coursesList = []
  Courses.map(el => {
    coursesList.push({ course: el.course })
  })

  async function fetchCourses(){
    return
  }
  async function addCourse(){

  }

  function getCourse(course){
    const findCourse = Courses.find(el => el.course === course.trim().toLowerCase())
    if(!findCourse) return null
    return findCourse
  }

  return { coursesList, getCourse }
}