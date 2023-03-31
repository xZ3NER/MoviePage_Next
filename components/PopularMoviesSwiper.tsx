import Image from "next/image";
import { Navigation, Pagination, A11y } from "swiper";
import styles from "@/styles/HomePage.module.scss";
import { getImageUrl } from "@/services/api-request-urls";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PopularMovieData } from "@/util/models/popular-movies";

export const PopularMoviesSwiper = ({
  popularMovies,
}: {
  popularMovies: PopularMovieData[];
}) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop
    >
      {popularMovies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div className={styles["swiper-container"]}>
            <Image
              src={getImageUrl(movie.backdrop_path)}
              alt={movie.title}
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div className={styles.details}>
              <h1>{movie.title}</h1>
              <p>{movie.release_date.split("-")[0]}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
