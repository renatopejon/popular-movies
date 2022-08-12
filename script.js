function criaDiv() {
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
    movieImg.setAttribute('src', 'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg')
    movieThumb.appendChild(movieImg)

    const movieName = document.createElement('div')
    movieName.classList.add('movie-name')
    movieInfo.appendChild(movieName)

    const title3 = document.createElement('h3')
    title3.innerText = 'Batman Maluco (2222)'
    movieName.appendChild(title3)

    const ratingFav = document.createElement('div')
    ratingFav.classList.add('rating-fav')
    movieName.appendChild(ratingFav)

    const rating = document.createElement('div')
    rating.classList.add('rating')
    ratingFav.appendChild(rating)

    const starImg = document.createElement('img')
    starImg.setAttribute('src', 'img/Star.svg')
    rating.appendChild(starImg)

    const movieRating = document.createElement('span')
    movieRating.classList.add('movie-rating')
    movieRating.innerText = '9.9'
    rating.appendChild(movieRating)

    const favorite = document.createElement('div')
    favorite.classList.add('favorite')
    ratingFav.appendChild(favorite)
    
    const heartImg = document.createElement('img')
    heartImg.setAttribute('src', 'img/Heart.svg')
    favorite.appendChild(heartImg)

    const favSpan = document.createElement('span')
    favSpan.classList.add('favorite')
    favSpan.innerText = 'Favoritar'
    favorite.appendChild(favSpan)


}
    


   
