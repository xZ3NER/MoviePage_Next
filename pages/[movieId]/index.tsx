import { MovieDetails } from "@/components";
import {
  getMovieDetailsUrl,
  getPopularMoviesUrl,
} from "@/services/api-request-urls";
import { MovieDetailsData } from "@/util/models/movie-details";
import { PopularMovieData } from "@/util/models/popular-movies";
import { Box } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

// DetailPage props types
interface DetailPageProps {
  movie: MovieDetailsData;
}

// /:movieId page (dynamic page)
const MovieDetailPage: NextPage<DetailPageProps> = ({ movie }) => {
  return (
    <>
      {/* Instead of Head, can use an Layout component that have a Head above a children prop */}
      <Head>
        <title>{movie.title}</title>
      </Head>
      <Box boxShadow='xl' marginBottom='8'>
        <MovieDetails movie={movie} />
      </Box>
    </>
  );
};

// Obtain all possible params that movieId can be
// (Since there are a lot of movies, it will only fetch
// the first page ids, and use fallback: "blocking")
export const getStaticPaths: GetStaticPaths = async () => {
  const firstPageMovies = await fetch(getPopularMoviesUrl(1));
  const data = await firstPageMovies.json();

  const movies: PopularMovieData[] = data.results;

  // Only set the possible params with the first page
  const params = movies.map((movie) => ({
    params: { movieId: movie.id.toString() },
  }));

  // Set fallback to "blocking", so when the user navigates to a page
  // with params that it's not on the default values, it will SSR instead
  // of showing a 404 not found page
  return {
    paths: params,
    fallback: "blocking",
  };
};

// Obtain the movie detail with the id on the params
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const movieId = params?.movieId!;

  const response = await fetch(getMovieDetailsUrl(+movieId));
  const data: MovieDetailsData = await response.json();

  return {
    props: {
      movie: data,
    },
  };
};

export default MovieDetailPage;

// If you want to access the latest review value after the user update it,
// you should use getServerSideProps and access the params from it context,
// with that, the value will update on each user request
