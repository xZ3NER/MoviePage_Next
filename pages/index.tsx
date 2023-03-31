import { PopularMoviesSwiper } from "@/components";
import { getPopularMoviesUrl } from "@/services/api-request-urls";
import { PopularMovieData } from "@/util/models/popular-movies";
import { GetStaticProps, NextPage } from "next";

import Head from "next/head";

interface HomePageProps {
  children?: React.ReactNode;
  popularMovies: PopularMovieData[];
}

export const HomePage: NextPage<HomePageProps> = ({ popularMovies }) => {
  return (
    <>
      <Head>
        <title>Movie Vault</title>
        <meta name='description' content='Movie page display' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <section>
          <PopularMoviesSwiper popularMovies={popularMovies} />
        </section>
        <section>
          
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(getPopularMoviesUrl(1));
  const data = await response.json();
  const popularMovies: PopularMovieData[] = data.results;

  return {
    props: {
      popularMovies: popularMovies,
    },
    revalidate: 3600,
  };
};

export default HomePage;
