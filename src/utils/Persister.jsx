import CryptoJS from 'crypto-js'

const SECRET_KEY = 'this_is_just someform of text'

export default function usePersister() {

function encrypt(data) {
  const json = JSON.stringify(data)
  return CryptoJS.AES.encrypt(json, SECRET_KEY).toString()
}

function decrypt(ciphertext) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return decrypted
  } catch {
    return null
  }
}

  const setPersistedItem = (name, data) => {
    const item = encrypt(JSON.stringify(data))
    localStorage.setItem(name, item)
  }

  const getPersistedItem = (name) => {
    if(!name) return null
    try{
      const item = localStorage.getItem(name)
      if(!item) return null
      console.log(JSON.parse(decrypt(item)))
      return JSON.parse(decrypt(item))
    } catch(error){ console.log(error) }
  } 

  return [ setPersistedItem, getPersistedItem ] 
}
