import Image from "next/image";
import { getImageUrl } from "@/services/api-request-urls";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";

import { PopularMovieData } from "@/util/models/popular-movies";
import Link from "next/link";

export const PopularMovies = ({
  popularMovies,
}: {
  popularMovies: PopularMovieData[];
}) => {
  return (
    <Box>
      <SimpleGrid
        margin='0.8em'
        spacing={3}
        columns={5}
        justifyItems='center'
        className='movies-list'
      >
        {popularMovies.map((movie) => (
          <Box
            key={movie.id}
            borderRadius='3px'
            borderWidth={"1px"}
            maxW={200}
            className='movie'
          >
            <Link href={`/${movie.id}`}>
              <Image
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                width={200}
                height={300}
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                  borderRadius: "inherit",
                }}
                priority
              />
            </Link>
            <Box
              p={1}
              mt='1'
              fontWeight='semibold'
              fontSize='0.8em'
              noOfLines={2}
            >
              <Text>{movie.title}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
