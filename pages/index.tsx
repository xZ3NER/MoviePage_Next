import { PopularMovies, PopularMoviesSwiper } from "@/components";
import { getPopularMoviesUrl } from "@/services/api-request-urls";
import { PopularMovieData } from "@/util/models/popular-movies";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";

import Head from "next/head";

interface HomePageProps {
  children?: React.ReactNode;
  swiperMovies: PopularMovieData[];
  popularMovies: PopularMovieData[];
  currentPage: number;
  maxPages: number;
}

export const HomePage: NextPage<HomePageProps> = ({
  swiperMovies,
  popularMovies,
  currentPage,
  maxPages,
}) => {
  const router = useRouter();

  const onPaginationChange = (page:number) => {
    const query = router.query;
    query.page = (page).toString();
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
                total={maxPages}
                onChange={onPaginationChange}
              />
            </Box>
          </Flex>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query?.page || 1;

  const response = await fetch(getPopularMoviesUrl(+page));
  const data = await response.json();

  const swiperRes = await fetch(getPopularMoviesUrl(1));
  const swiperData = await swiperRes.json();

  const popularMovies: PopularMovieData[] = data.results;
  const maxPages: number = data.total_pages;

  const swiperMovies: PopularMovieData[] = swiperData.results;

  return {
    props: {
      swiperMovies: swiperMovies,
      popularMovies: popularMovies,
      currentPage: page,
      maxPages: maxPages,
    },
  };
};

export default HomePage;
