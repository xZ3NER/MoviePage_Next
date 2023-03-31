export class PopularMovieData {
  id: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  popularity: string;

  constructor(
    id: string,
    title: string,
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    popularity: string
  ) {
    this.id = id;
    this.title = title;
    this.poster_path = poster_path;
    this.backdrop_path = backdrop_path;
    this.release_date = release_date;
    this.popularity = popularity;
  }
}
