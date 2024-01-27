import { useEffect } from "react";
import { useSwiper } from "swiper/react";

export const SliderTimer = () => {
  const swiper = useSwiper();
  useEffect(() => {
    swiper.loopCreate();
    const intervalId = setInterval(() => swiper.slideNext(1500), 2000);
    return () => clearInterval(intervalId);
  }, []);
  return null;
};
