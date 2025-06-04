import { useState } from "react"
import { ChevronDown } from "lucide-react"

const FaqQuestionCard = ({ question }) => {
  const [ visible, setVisible ] = useState(true)
  return (
    <li
      className={`${visible ? 'pb-5' : '*:not-first:hidden ' } grid gap-4 bg-gray-100 rounded-md`}
      >
      <button
        onClick={ () => setVisible( v => !v )}
        className="p-2 bg-gray-600 md:bg-gray-500 rounded-md grid grid-cols-[1fr_auto] justify-between items-center gap-x-2 cursor-pointer"
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

export default FaqQuestionCard