import { Navigation, Pagination, A11y } from "swiper";
import styles from "@/styles/HomePage.module.scss";
import { PopularMovieData } from "@/util/models/popular-movies";
import { SwiperImage } from "./SwiperImage";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
            <SwiperImage src={movie.backdrop_path} alt={movie.title}/>
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
