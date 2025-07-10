import { useEffect, useState } from 'react'
import { ChevronDown } from "lucide-react"
import { useSelector, useDispatch } from 'react-redux'
import { 
  faqsSelector,
  getFaqs
 } from '../Slices/FaqsSlice'
import { Loading } from '../Components/Loader'

export default function Faq(){
  const dispatch = useDispatch()
  const { faqs, loading } = useSelector( faqsSelector )

  useEffect(() => {
    dispatch( getFaqs() )
    document.title = 'Successfield | FAQs'
  }, [])

  if(loading) return <Loading />

  return (
    <main-content
      className="px-5 sm:px-8 md:px-10 flex flex-col max-w-[1440px] mx-auto gap-y-8 py-10 bg-gray-100 min-h-screen"
      >
      <h1
        className="text-2xl md:text-4xl font-semibold md:font-bold border-b-2 pb-2"
        >Frequently Asked Questions</h1>
      <section 
      aria-label="Frequently asked questions"
      className="grid gap-y-8"
      >
        { faqs?.map( ( _question, index ) => <FaqQuestionCard key={ index } { ...{ question: _question } } /> ) }
    </section>
    </main-content>
  )
}

function FaqQuestionCard ({ question }){
  const [ visible, setVisible ] = useState(true)
  return (
    <li
      className={`${visible ? 'pb-5' : '*:not-first:hidden ' } tuffy grid gap-4 bg-white rounded-md`}>
      <button
        onClick={ () => setVisible( v => !v )}
        className="p-2 bg-gray-800 rounded-md grid grid-cols-[1fr_auto] justify-between items-center gap-x-2 cursor-pointer"
        >
      <h2
        aria-label="question"
        className="font-bold text-lg text-white text-left h-fit"
        > { question.question } </h2>
        <ChevronDown
          className={`${ visible ? 'rotate-[-180deg]' : '' } w-7 h-7 md:w-8 md:h-8 block ml-auto text-white transition-transform duration-200 ease-linear`} />
      </button>
      <p
        aria-label="answer"
        className="text-lg md:text-xl px-2"
        > { question.answer } </p>
    </li>
  )
}