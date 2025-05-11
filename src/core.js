export function capitalize(phrase){
  const words = []
  const sentence = phrase.toLowerCase().trim().split(' ')
  sentence.map(el => {
    const cap = el[0].toUpperCase()
    let rest = el.slice(1)
    const word = cap + rest
    words.push(word)
  })
  const newPhrase = words.join(' ')
  if(newPhrase.includes('(')){
    const sentence = newPhrase.split('(')
    const cap = sentence[1][0].toUpperCase()
    const rest = sentence[1].slice(1)

    return sentence[0] + '(' + cap + rest
  }
  return newPhrase
}

export function formatUrl(url){
  let newUrl = url.toLowerCase().trim().split('_').join(' ')
  return newUrl
}

export function createHyphenUrl(url){
  return url.toLowerCase().trim().split(' ').join('_')
}

export function getBaseUrl(url){
  let splitUrl = url.split('/').splice(0,3)
  return splitUrl.join('/')
}

export function createAcronym(title){
  let ac = []
  let words = title.trim().toUpperCase().split('(')[0]
  words = words.split(' ')
  words.map(el => {
    ac.push(el[0])
  }) 
  let word =  ac.join('.')
  if(word.includes('(')) word = word.replace('(', '')
  if(word.includes(')')) word = word.replace(')', '')
  if(word.includes('-')) word = word.replace('-', '')
  if(word.includes('_')) word = word.replace('_', '')
  if(word.includes('..')) word = word.replace('..', '.')
  if(word.includes('..')) word = word.replace('..', '.')
  if(word.endsWith('.')) word = word.slice(0, -1)
  return word
}