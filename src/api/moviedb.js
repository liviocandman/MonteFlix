import axios from 'axios'
import { apiKey } from '../constants'

//endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?language=pt-BR?api_key=${apiKey}`
const popularMoviesEndpoint = `${apiBaseUrl}/movie/popular?language=pt-BR?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?language=pt-BR?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?language=pt-BR?api_key=${apiKey}`
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`

//dynamic endpoints
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?language=pt-BR`
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?language=pt-BR`
const movieVideosEndpoint = id => `${apiBaseUrl}/movie/${id}/videos?language=pt-BR`
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?language=pt-BR`



const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}`
const personDetailsTranslateEndpoint = id => `${apiBaseUrl}/person/${id}?language=pt-BR`
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?language=pt-BR`


export const image500 = path=> path? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path=> path? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path=> path? `https://image.tmdb.org/t/p/w185${path}` : null;


const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzk2NTY2ZWM3MjIyZDUxN2M5MDczOTNjOGZhMTQ1ZCIsInN1YiI6IjY0N2Y0NTMxMGUyOWEyMmJkZmVkMmMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DK4zVI9AD5V1NKLgDHsDvZMKVY_U49Snt_dUWTuaUZU'
        },
        url: endpoint,
        params: params? params : {}
    }

    try{
        const response = await axios.request(options);
        return response.data
    }catch(err){
        console.log(err);
        return {}
    }
}

export const fetchTrendingMovies = () =>{
    return apiCall(trendingMoviesEndpoint);
}
export const fetchPopularMovies = () =>{
    return apiCall(popularMoviesEndpoint);
}
export const fetchTopRatedMovies = () =>{
    return apiCall(topRatedMoviesEndpoint);
}
export const fetchUpcomingMovies = () =>{
    return apiCall(upcomingMoviesEndpoint);
}
export const searchMovies = params=>{
    return apiCall(searchMoviesEndpoint, params)
}

export const fetchMovieDetails = id =>{
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchMovieCredits = id =>{
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies= id =>{
    return apiCall(similarMoviesEndpoint(id))
}
export const fetchMovieVideos= id =>{
    return apiCall(movieVideosEndpoint(id))
}
export const fetchPersonDetails= id =>{
    return apiCall(personDetailsEndpoint(id))
}
export const fetchPersonDetailsTranslate= id =>{
    return apiCall(personDetailsTranslateEndpoint(id))
}
export const fetchPersonMovies= id =>{
    return apiCall(personMoviesEndpoint(id))
}

