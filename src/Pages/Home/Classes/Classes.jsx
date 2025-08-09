import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Card from "../../../shared/Card/Card";
import "swiper/css/pagination";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Classes = () => {
  const { get } = useAxiosPublic();

  const { data: Class = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => await get("/classes").then((res) => res.data),
  });

  return (
    <div className="mt-10 space-y-7">
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
        slidesPerView={3}
        loop={true}
        className="mySwiper max-w-screen-lg"
      >
        {Class.map((data) => (
          <SwiperSlide>
            <Card key={data._id} data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Classes;
