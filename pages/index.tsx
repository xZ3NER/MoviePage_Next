import { PopularMovies, PopularMoviesSwiper } from "@/components";
import { getPopularMoviesUrl } from "@/services/api-request-urls";
import { PopularMovieData } from "@/util/models/popular-movies";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";

import Head from "next/head";

// Page props types (returned by getServerSideProps)
interface HomePageProps {
  swiperMovies: PopularMovieData[];
  popularMovies: PopularMovieData[];
}

// Home page
export const HomePage: NextPage<HomePageProps> = ({
  swiperMovies,
  popularMovies,
}) => {
  // NextJS hook for navigation
  const router = useRouter();

  // Get the current page through query params
  const currPage = router.query.page;

  const onPaginationChangeHandler = (page: number) => {
    const query = router.query;
    query.page = page.toString();
    // Navigate to the same path, but with different query param (another page)
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  return (
    <>
      <Head>
        <title>Movie Vault - Home</title>
        <meta name='description' content='Movie page display' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <section>
          <PopularMoviesSwiper popularMovies={swiperMovies} />
        </section>
        <section>
          <Flex direction='column'>
            <Box padding={4} paddingBottom={0}>
              <Text>See more</Text>
            </Box>
            <PopularMovies popularMovies={popularMovies} />
            <Box
              display='flex'
              justifyContent='flex-end'
              marginBottom={10}
              marginRight={10}
            >
              <Pagination
                shadow
                color='primary'
                total={500}
                page={+currPage!}
                onChange={onPaginationChangeHandler}
              />
            </Box>
          </Flex>
        </section>
      </main>
    </>
  );
};

// Update the page on every request (in this case, when query param changes)
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query?.page || 1;

  // PopularMovies, that changes when query param changes (managed by pagination using router.push)
  const response = await fetch(getPopularMoviesUrl(+page));
  const data = await response.json();

  const popularMovies: PopularMovieData[] = data.results;

  // Throws 500 if we try to get to that page
  // const maxPages: number = data.total_pages;

  // Swiper movies (only the first page, should be in getStaticProps,
  // but we cannot have SSR and SSG at the same time on the same page)
  const swiperRes = await fetch(getPopularMoviesUrl(1));
  const swiperData = await swiperRes.json();

  const swiperMovies: PopularMovieData[] = swiperData.results;

  // Return some props for be used in the HomePage component
  return {
    props: {
      swiperMovies: swiperMovies,
      popularMovies: popularMovies,
    },
  };
};

export default HomePage;
