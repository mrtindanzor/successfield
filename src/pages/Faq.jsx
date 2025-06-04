import { useCallback, useEffect, useMemo, useState } from 'react'
import FaqQuestionCard from '../Components/FaqQuestionCard'
import useServerUri from '../Contexts/baseServer'

const Faq = () => {
  const [ faqs, setFaqs ] = useState()
  const uri = useServerUri() + 'faqs'
  const getFaqs = useCallback( async () => {
    try{
      const method = 'POST'
      const _res = await fetch(uri, { method }) 
      const res = await _res.json()
      setFaqs( res.faqs )
    } catch(error){

    }
  }, [])

  useEffect(() => {
    getFaqs()
  }, [])

  return (
    <main-content
      className="px-5 sm:px-8 md:px-10 grid gap-y-8 py-10"
      >
      <h1
        className="text-2xl md:text-4xl font-semibold md:font-bold border-b-2 pb-2"
        >Frequently Asked Questions</h1>
      <section 
      aria-label="Frequently asked questions"
      className="max-w-[900px] grid gap-y-8"
      >
        { faqs?.map( ( _question, index ) => <FaqQuestionCard key={ index } { ...{ question: _question } } /> ) }
    </section>
    </main-content>
  )
}

export default Faq