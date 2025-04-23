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
    <div className=" py-10 flex flex-col gap-20 md:gap-3 ">
      {
        contents.map( content => {
          return (<div key={ content.title } className="grid gap-8 pb-[100px]">
                    <div>
                      <span className="block bg-gray-900 text-gray-100 text-3xl mx-auto texturina w-[90%] text-center px-5 py-5 rounded  "> { content.title } </span>
                    </div>
                    <p className=" px-3 flex items-center w-[90%] mx-auto "> { content.content } </p>
                  </div>)
        })
      }
    </div>
  )
}