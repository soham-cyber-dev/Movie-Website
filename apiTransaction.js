const MOVIE_DB_API            = '6bf3b3542f9ff12290736047042a751d';
const MOVIE_DB_ENDPOINT       = 'https://api.themoviedb.org';
const MOVIE_DB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w500';

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            return res.json();
        })
        .then(onComplete)
        .catch(onError);
}

function generateMovieDBUrl(path) {
    return `${MOVIE_DB_ENDPOINT}/3${path}?api_key=${MOVIE_DB_API}`;
}

function getTopRatedMovies(callback) {
    const url = generateMovieDBUrl('/movie/top_rated');
    requestMovies(url, callback, handleGeneralError);
}

function getTrendingMovies(callback) {
    const url = generateMovieDBUrl('/trending/movie/day');
    requestMovies(url, callback, handleGeneralError);
}

function searchUpcomingMovies(callback) {
    const url = generateMovieDBUrl('/movie/upcoming');
    requestMovies(url, callback, handleGeneralError);
}

function searchPopularMovie(callback) {
    const url = generateMovieDBUrl('/movie/popular');
    requestMovies(url, callback, handleGeneralError);
}

function searchMovie(value) {
    const url = generateMovieDBUrl('/search/movie') + '&query=' + encodeURIComponent(value);
    requestMovies(url, renderSearchMovies, handleGeneralError);
}

function getVideosByMovieId(movieId) {
    const url = generateMovieDBUrl(`/movie/${movieId}/videos`);
    requestMovies(url, createVideoTemplate, handleGeneralError);
}
