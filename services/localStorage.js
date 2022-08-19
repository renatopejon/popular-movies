const localStoragekey = 'favMovies'

function saveFav(id) {
    const favArr = getFav() || []
    if (!favArr.includes(id)) {
        favArr.push(id)
        const favArrJSON = JSON.stringify(favArr)
        localStorage.setItem(localStoragekey, favArrJSON)
    }
}

function removeFav(id) {
    const favArr = getFav() || []
    if (favArr.includes(id)) {
        const newFavArr = favArr.filter(i => i !== id)
        const newFavArrJSON = JSON.stringify(newFavArr)
        localStorage.setItem(localStoragekey, newFavArrJSON)
    }
}

function getFav() {
    return JSON.parse(localStorage.getItem(localStoragekey))
}

function checkFav(id) {
    const favArr = getFav() || []
    return favArr.includes(`${id}`)
}

export const LocalStorage = {
    saveFav,
    removeFav,
    getFav,
    checkFav,
    
}