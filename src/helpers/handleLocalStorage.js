export const addToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new Event('storage'))
}

export const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}