import { config } from "./configs/config.js";

const baseUrl = config.api_base_url
const apiKey = config.api_key
const imageUrl = config.image_base_url
const main = document.querySelector('.main')
const searchBtn = document.querySelector('.search-icon')
const input = document.querySelector('.search-field')


searchBtn.addEventListener('click', searchMovies)

input.addEventListener('keypress', function(event) {
    if (event.key == 'Enter') {
        event.preventDefault()
        searchBtn.click()
    }
})

async function getPopularMovies(page = 1) {
    let data = []
    try {
        const response = await fetch(`${baseUrl}movie/popular?api_key=${apiKey}&language=pt-BR&page=${page}`)
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

async function searchMovies() {
    const searchValue = input.value
    if (searchValue != '') {
        cleanMovies()
        const movies = await searchMoviesTitle(searchValue)
        movies.forEach(movie => getMovies(movie))
    }
}

function cleanMovies() {
    main.innerHTML = ''
}

window.onload = async () => {
    const movies = await getPopularMovies()
    movies.forEach(movie => getMovies(movie))
}

function getMovies(movie) {
    const { original_title, backdrop_path, vote_average, release_date, overview, isFavorited } = movie

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
    heartImg.setAttribute('src', isFavorited ? 'img/Full-heart.svg' : 'img/Heart.svg')
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



   
