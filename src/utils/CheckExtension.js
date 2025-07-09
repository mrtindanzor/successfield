export const getExtension = file => {
  if(!file) return null
  const splitName = file.name.split('.')
  return splitName[splitName.length - 1].toLowerCase()
}