// Model structure for typescript
export class MovieDetailsData {
  id: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  popularity: string;
  homepage: string;
  genres: { name: string; id: string }[];
  vote_average: number;
  overview: string;

  constructor(
    id: string,
    title: string,
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    popularity: string,
    homepage: string,
    genres: { name: string; id: string }[],
    vote_average: number,
    overview: string
  ) {
    this.id = id;
    this.title = title;
    this.poster_path = poster_path;
    this.backdrop_path = backdrop_path;
    this.release_date = release_date;
    this.popularity = popularity;
    this.homepage = homepage;
    this.genres = genres;
    this.vote_average = vote_average;
    this.overview = overview;
  }
}
