/* Requests related to the TMDB API */

export const getApiKey = () => {
  return process.env.REACT_APP_MOVIES_API_KEY;
};

export const getImageUrl = (path: string) => {
  return `https://image.tmdb.org/t/p/original${path}`;
};

export const getPostConfig = (method: string, body: object) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...body,
    }),
  };
};

export const getPopularMoviesUrl = (page: number) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${getApiKey()}&page=${page}`;
};

export const getMovieDetailsUrl = (movieId: number) => {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${getApiKey()}`;
};
