import CourseCard from "../../Components/CourseCard";
import { useSelector } from 'react-redux'
import { coursesListSelector } from '../../Slices/coursesSlice'
import { useMemo } from "react";

export default function CoursesOverview(){
  const coursesList = useSelector( coursesListSelector )
  const Content = useMemo(() => {
    const c = {
      description: `Successfield College offers high-impact professional courses designed for ambitious leaders like you. From Executive Certificates to Doctorates, our programs equip you with the skills and credentials to thrive in today's fast-paced world. Explore our courses and take your career to the next level!`
    }
    return c
  }, [])

  return (
    <section 
      className="px-5 sm:px-8 md:px-10 pb-50 bg-gray-100 mx-auto"
      >
      <p className=" text-900 py-10 font-semibold tuffy-bold"> { Content.description } </p>
      <div 
        className="grid w-full md:grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] gap-x-5 md:gap-y-20 gap-y-10 justify-evenly"
        aria-label="All courses">
        { coursesList.map((course, index) => <CourseCard title={ course.course } key={ index } overview={ true } />) }
      </div>
    </section>
  )
}