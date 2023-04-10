import { getImageUrl } from "@/services/api-request-urls";
import { MovieDetailsData } from "@/util/models/movie-details";
import { Card, CardBody, Stack, Heading, Text, Box } from "@chakra-ui/react";
import { ArrowBackIcon, StarIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const MovieDetails = ({ movie }: { movie: MovieDetailsData }) => {
  const router = useRouter();

  const ratingValue = parseInt(movie.vote_average.toString().charAt(0));
  let stars: JSX.Element[] = [];

  for (let i: number = 0; i < ratingValue; i++) {
    stars.push(<StarIcon />);
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow='hidden'
      variant='outline'
      borderRadius={"none"}
      border={"none"}
      paddingTop='3.8em'
    >
      <Image
        style={{ objectFit: "cover", width: "auto", height: "auto" }}
        width={200}
        height={400}
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        priority
      />

      <Stack>
        <CardBody>
          <Heading size='md'>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              {movie.title} ({movie.release_date.split("-")[0]})
              <ArrowBackIcon
                onClick={() => {
                  router.back();
                }}
                style={{ cursor: "pointer" }}
              />
            </Box>
          </Heading>

          <Text py='2'>
            {movie.genres.map((genre) => (
              <span key={genre.id} style={{ marginRight: "1em" }}>
                {genre.name}
              </span>
            ))}
          </Text>
          <Text as='b'>Overview</Text>
          <Text py='2'>{movie.overview}</Text>
          <Text as='b'>Rating {ratingValue} / 10</Text>
          <Box>
            {stars.map((starIcon, index) => (
              <span key={index}>{starIcon}</span>
            ))}
          </Box>
        </CardBody>
      </Stack>
    </Card>
  );
};
