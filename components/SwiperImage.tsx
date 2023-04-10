import Image from "next/image";
import { useState } from "react";
import { getImageUrl } from "@/services/api-request-urls";

export const SwiperImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      src={
        imageError
          ? "https://aeroclub-issoire.fr/wp-content/uploads/2020/05/image-not-found.jpg"
          : getImageUrl(src)
      }
      alt={alt}
      fill
      style={{ objectFit: "cover", objectPosition: "center" }}
      priority
      onError={() => setImageError(true)}
    />
  );
};
