const config = {
    api_key: '3851a9c055b4040356f6ef865d1d56a6',
    api_base_url: 'https://api.themoviedb.org/3/',
    image_base_url: 'https://image.tmdb.org/t/p/w1280'
}

const baseUrl = config.api_base_url
const apiKey = config.api_key
const imageUrl = config.image_base_url

const movies = [
    {
        image: 'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
        title: 'Batman',
        rating: 9.2,
        year: 2022,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        isFavorited: false
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg',
        title: 'Avengers',
        rating: 9.2,
        year: 2019,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        isFavorited: false
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
        title: 'Doctor Strange',
        rating: 9.2,
        year: 2022,
        description: "Lorem Ipsdsadadadadaaum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        isFavorited: true
    },
]

async function getPopularMovies(page = 1) {
    let data = []
    try {
        const response = await fetch(`${baseUrl}movie/popular?api_key=${apiKey}&page=${page}`)
        const responseData = await response.json()
        data = responseData.results
        console.log(data);
    } catch (error) {
        console.log('O erro é: ', error)
    }
    return data
}

getPopularMovies()


window.onload = function() {
    getPopularMovies().forEach(movie => getMovies(movie))
}

function getMovies(movie) {
    const { original_title, backdrop_path, vote_average, release_date, overview, isFavorited } = movie

    const main = document.getElementById('main')

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
    


   
