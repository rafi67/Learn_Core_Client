import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Card from "./Card/Card";
import "swiper/css/pagination";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loading from "../../../shared/Loading/Loading";

const Classes = () => {
  const { get } = useAxiosPublic();

  const { data: Class = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => await get("/classes").then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesPerView(3);
      } else if (width >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };
    handleResize(); // call the function once on mount
    window.addEventListener("resize", handleResize); // listen for resize events

    return () => window.removeEventListener("resize", handleResize); // remove the event listener on unmount
  }, []);

  if(isLoading) return <Loading/>

  return (
    <div className="w-screen lg:max-w-screen-lg mt-10 space-y-7 mx-auto">
      {/* text section */}
      <h1 className="text-4xl font-bold">Popular Courses</h1>
      {/* card section */}
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={true}
        style={{
          "--swiper-navigation-color": "#FDC800",
          "--swiper-pagination-color": "#FDC800",
        }}
        slidesPerView={slidesPerView}
        loop={true}
        centeredSlides={true}
        className="mySwiper"
      >
        {Class.map((data) => (
          <SwiperSlide key={data._id}>
            <Card data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Classes;
