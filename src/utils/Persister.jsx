export default function usePersister() {

  const setPersistedItem = (name, data) => {
    const item = JSON.stringify(data)
    localStorage.setItem(name, item)
  }

  const getPersistedItem = (name) => {
    if(!name) return null
    try{
      const item = localStorage.getItem(name)
      if(!item) return null
      return JSON.parse(item)
    } catch(error){ console.log(error) }
  } 

  return [ setPersistedItem, getPersistedItem ] 
}
