import { useState, useEffect, useContext, createContext, useMemo, useCallback } from 'react'

const promptBoxClasses = 'fixed z-[1001] bg-white w-full h-full grid items-center justify-center'
const promptContainerClasses = 'w-[90%] max-w-[500px] gap-[10px] grid rounded-lg bg-gray-100 grid px-5 py-10 *:first:font-semibold *:first:text-xl justify-center'
const promptButtonClasses = '*:p-2 flex gap-1 *:rounded *:cursor-pointer *:hover:opacity-80 w-fit mx-auto *:min-w-fit *:font-bold  *:w-[100px] *:text-white'
const promptDenyClasses = 'bg-red-500'
const promptAcceptClasses = 'bg-green-600'

const PromptContext = createContext()

export function PromptContextProvider({ children }){
  const [ prompt, prompterSetter ] = useState({ message: '', setter: '' })
  const promptMessage = useMemo(() => prompt.message, [prompt])
  const setter = useMemo(() => prompt.setter, [prompt])

  return (
    <PromptContext.Provider  value={ { promptMessage, setter, prompterSetter } }>
      { children }
    </PromptContext.Provider>
  )
}

export function Prompter() {
  const { promptMessage, prompterSetter, setter } = usePrompter()

  if(!promptMessage) return <></>

  return (
    <div className={ promptBoxClasses }>
      <div className={ promptContainerClasses }>
        <p> { promptMessage } </p>
        <div className={ promptButtonClasses }>
          <button className={ promptDenyClasses }
            onClick={
              () => {
                prompterSetter('')
              }
            }  > No </button>
          <button className={ promptAcceptClasses } 
          onClick={
            () => {
              prompterSetter('')
              setter(true)
            }
          } > Yes </button>
        </div>
      </div>
    </div>
  )
}

export default function usePrompter(){ return useContext( PromptContext ) }