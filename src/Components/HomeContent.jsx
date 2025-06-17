import { useMemo } from 'react'

export default function HomeContent(){
  const contents = useMemo(() =>  [
      {
        title: 'Our Mission',
        content: 'To empower students with industry-relevant skills, knowledge and values, fostering academic excellence, innovation and professional success. We strive to create a supportive learning environment that promotes intellectual growth, creativity and critical thinking.'
      }, 
      {
        title: 'Our Vision',
        content: 'To become a leading institution of excellence in education and training, producing highly skilled and competent professionals who make a positive impact in their communities and the world at large.'
      },
      {
        title: 'Our Commitment',
        content: 'We are committed to creating a transformative learning experience that equips our students with the knowledge, skills, and values necessary to succeed in their chosen fields and make a positive difference in the world.'
      },
      {
        title: 'Memberships and Accreditations',
        content: 'At Successfield College, we are proud to hold memberships and accreditations from reputable organizations, demonstrating our commitment to excellence and quality education.'
      },
      {
        title: 'About Successfield College',
        content: 'Successfield College is the trading name of Successfield Training Agency, a registered institution dedicated to providing professional training, certification, and recognition of prior experience to individuals from all walks of life. Our mission is to empower individuals to achieve their full potential, enhance their lives, and pursue their passions.'
      }
    ], [])


  return (
    <ul className="py-10 grid gap-y-10 gap-x-5 md:gap-x-10 md:gap-y-15 px-5 sm:px-10 2xl:px-0 md:grid-cols-2 lg:max-w-[1440px] mx-auto">
      { contents.map( (content, index) => <Card key={ content.title } { ...{ content, index } } /> ) }
    </ul>
  )
}

function Card({ content, index }){

  return(
    <li key={ content.title } className={`bg-gray-200 flex flex-col items-center gap-5 rounded-md pt-10 pb-20 px-5 sm:px-10 border-2 border-gray-200/20 drop-shadow-md drop-shadow-gray-700 ${ index === 4 && 'sm:col-span-2' }`}>
      <h3 className="font-bold text-3xl text-black text-center"> { content.title } </h3>
      <p className="text-gray-700 text-xl text-justify"> { content.content } </p>
    </li>
  )
}