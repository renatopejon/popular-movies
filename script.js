import { config } from "./configs/config.js";

const baseUrl = config.api_base_url
const apiKey = config.api_key
const imageUrl = config.image_base_url
const main = document.querySelector('.main')
const searchBtn = document.querySelector('.search-icon')
const input = document.querySelector('.search-field')
const checkBox = document.querySelector('.show-fav')

searchBtn.addEventListener('click', searchMovies)

input.addEventListener('keypress', function(event) {
    if (event.key == 'Enter') {
        event.preventDefault()
        searchBtn.click()
    }
})

checkBox.addEventListener('click', showFav)

async function getPopularMovies() {
    let data = []
    try {
        const response = await fetch(`${baseUrl}movie/popular?api_key=${apiKey}&language=pt-BR&page=1`)
        const responseData = await response.json()
        data = responseData.results
    } catch (error) {
        console.log('O erro é: ', error)
    }
    return data
}

async function searchMoviesTitle(query) {
    let data = []
    try {
        const response = await fetch(`${baseUrl}search/movie?api_key=${apiKey}&language=pt-BR&query=${query}&page=1`)
        const responseData = await response.json()
        data = responseData.results
    } catch (error) {
        console.log('O erro é: ', error)
    }
    return data
}

async function searchMoviesId(id) {
    let data = []
    try {
        const response = await fetch(`${baseUrl}movie/${id}?api_key=${apiKey}&language=pt-BR`)
        const responseData = await response.json()
        data = responseData
    } catch (error) {
        console.log('O erro é: ', error)
    }
    return data
}

async function searchMovies() {
    const searchValue = input.value
    if (searchValue != '') {
        cleanMovies()
        const movies = await searchMoviesTitle(searchValue)
        movies.forEach(movie => getMovies(movie))
    }
}

async function renderFav() {
    cleanMovies()
    const favArr = getFav() || []
    favArr.forEach(async (id) => {
        let idNum = Number(id)
        const movie = await searchMoviesId(idNum)
        getMovies(movie)
    })
}

function cleanMovies() {
    main.innerHTML = ''
}

function favButtonPress(event) {
    const favoriteState = {
        fav: 'img/Full-heart.svg',
        notFav: 'img/Heart.svg'
    }

    if (event.target.src.includes(favoriteState.notFav)) {
        event.target.src = favoriteState.fav
        saveFav(event.target.id)
    } else {
        event.target.src = favoriteState.notFav
        removeFav(event.target.id)
    }
}

function saveFav(id) {
    const favArr = getFav() || []
    if (!favArr.includes(id)) {
        favArr.push(id)
        const favArrJSON = JSON.stringify(favArr)
        localStorage.setItem('favMovies', favArrJSON)
    }
}

function removeFav(id) {
    const favArr = getFav() || []
    if (favArr.includes(id)) {
        const newFavArr = favArr.filter(i => i !== id)
        const newFavArrJSON = JSON.stringify(newFavArr)
        localStorage.setItem('favMovies', newFavArrJSON)
    }
}

function getFav() {
    return JSON.parse(localStorage.getItem('favMovies'))
}

function showFav() {
    if (checkBox.checked == true) {
        renderFav()
    } else {
        cleanMovies()
        getAllPopularMovies()
    }
}

function checkFav(id) {
    const favArr = getFav() || []
    return favArr.includes(`${id}`)
}

async function getAllPopularMovies() {
    const movies = await getPopularMovies()
    movies.forEach(movie => getMovies(movie))
}

window.onload = function() {
    getAllPopularMovies()
  }

function getMovies(movie) {
    const { original_title, backdrop_path, vote_average, release_date, overview, isFavorited, id } = movie

    const movieCard = document.createElement('div')
    movieCard.classList.add('movie-card')
    main.appendChild(movieCard)

    const movieInfo = document.createElement('div')
    movieInfo.classList.add('movie-info')
    movieCard.appendChild(movieInfo)

    const movieThumb = document.createElement('div')
    movieThumb.classList.add('movie-thumb')
    movieInfo.appendChild(movieThumb)

    const movieImg = document.createElement('img')
    movieImg.setAttribute('src', `${imageUrl}${backdrop_path}`)
    movieThumb.appendChild(movieImg)

    const movieName = document.createElement('div')
    movieName.classList.add('movie-name')
    movieInfo.appendChild(movieName)

    const title3 = document.createElement('h3')
    title3.innerText = `${original_title} (${release_date.slice(0,4)})`
    movieName.appendChild(title3)

    const ratingFav = document.createElement('div')
    ratingFav.classList.add('rating-fav')
    movieName.appendChild(ratingFav)

    const ratingDiv = document.createElement('div')
    ratingDiv.classList.add('rating')
    ratingFav.appendChild(ratingDiv)

    const starImg = document.createElement('img')
    starImg.setAttribute('src', 'img/Star.svg')
    ratingDiv.appendChild(starImg)

    const movieRating = document.createElement('span')
    movieRating.classList.add('movie-rating')
    movieRating.innerText = vote_average
    ratingDiv.appendChild(movieRating)

    const favorite = document.createElement('div')
    favorite.classList.add('favorite')
    ratingFav.appendChild(favorite)
    
    const heartImg = document.createElement('img')
    heartImg.setAttribute('src', checkFav(id) ? 'img/Full-heart.svg' : 'img/Heart.svg')
    heartImg.setAttribute('id', `${id}`)
    heartImg.classList.add('fav-img')
    heartImg.addEventListener('click', favButtonPress)
    favorite.appendChild(heartImg)

    const favSpan = document.createElement('span')
    favSpan.classList.add('favorite')
    favSpan.innerText = 'Favoritar'
    favorite.appendChild(favSpan)

    const movieDesc = document.createElement('div')
    movieDesc.classList.add('movie-desc')
    movieCard.appendChild(movieDesc)

    const movieSpan = document.createElement('span')
    movieSpan.innerText = overview
    movieDesc.appendChild(movieSpan)
}