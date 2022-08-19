import { config } from "../configs/config.js";

const baseUrl = config.api_base_url
const apiKey = config.api_key
const imageUrl = config.image_base_url

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

export const API = {
    getPopularMovies,
    searchMoviesTitle,
    searchMoviesId
}