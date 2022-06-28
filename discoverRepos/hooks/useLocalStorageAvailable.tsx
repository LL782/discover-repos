export const useLocalStorageAvailable = () => {
  let storage
  try {
    storage = window['localStorage']
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return false
  }
}
