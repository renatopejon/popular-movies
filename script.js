import { config } from "../configs/config.js";
import { API } from "../services/api.js"
import { LocalStorage } from "../services/localStorage.js";

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

async function searchMovies() {
    const searchValue = input.value
    if (searchValue != '') {
        cleanMovies()
        const movies = await API.searchMoviesTitle(searchValue)
        movies.forEach(movie => getMovies(movie))
    }
}

function cleanMovies() {
    main.innerHTML = ''
}

function favButtonPress(event) {
    const favSpan = document.querySelector('div.favorite > span')
    const favoriteState = {
        fav: 'img/Full-heart.svg',
        notFav: 'img/Heart.svg'
    }

    if (event.target.src.includes(favoriteState.notFav)) {
        event.target.src = favoriteState.fav
        favSpan.innerText = 'Desfavoritar'
        LocalStorage.saveFav(event.target.id)
    } else {
        event.target.src = favoriteState.notFav
        favSpan.innerText = 'Favoritar'
        LocalStorage.removeFav(event.target.id)
    }
}

function showFav() {
    if (checkBox.checked == true) {
        renderFav()
    } else {
        cleanMovies()
        getAllPopularMovies()
    }
}

async function renderFav() {
    cleanMovies()
    const favArr = LocalStorage.getFav() || []
    favArr.forEach(async (id) => {
        let idNum = Number(id)
        const movie = await API.searchMoviesId(idNum)
        getMovies(movie)
    })
}

async function getAllPopularMovies() {
    const movies = await API.getPopularMovies()
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
    heartImg.setAttribute('src', LocalStorage.checkFav(id) ? 'img/Full-heart.svg' : 'img/Heart.svg')
    heartImg.setAttribute('id', `${id}`)
    heartImg.classList.add('fav-img')
    heartImg.addEventListener('click', favButtonPress)
    favorite.appendChild(heartImg)

    const favSpan = document.createElement('span')
    favSpan.classList.add('favorite')
    favSpan.innerText = LocalStorage.checkFav(id) ? 'Desavoritar' : 'Favoritar'
    favorite.appendChild(favSpan)

    const movieDesc = document.createElement('div')
    movieDesc.classList.add('movie-desc')
    movieCard.appendChild(movieDesc)

    const movieSpan = document.createElement('span')
    movieSpan.innerText = overview
    movieDesc.appendChild(movieSpan)
}