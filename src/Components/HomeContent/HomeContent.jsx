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
          return (<div key={ content.title } className=" flex flex-col md:grid md:grid-cols-4 w-[100vw]  gap-10 md:gap-3 py-3 odd:*:first:bg-green-300 md:min-h-[50vh] odd:*:first:rounded-tl-lg odd:*:first:rounded-bl-lg even:*:first:bg-green-600 even:*:first:rounded-tr-lg even:*:first:rounded-br-lg md:odd:*:last:col-start-1 md:odd:*:last:col-end-4 md:odd:*:first:col-start-4 md:odd:*:first:col-end-5 md:even:*:last:col-start-2 even:*:last:col-end-5 ">
                    <div>
                      <span className=" block md:flex texturina place-items-center p-5 text-white text-shadow-black w-fit md:w-full h-auto md:h-100  "> { content.title } </span>
                    </div>
                    <p className=" px-3 flex items-center md:row-start-1 md:row-end-1 "> { content.content } </p>
                  </div>)
        })
      }
    </div>
  )
}