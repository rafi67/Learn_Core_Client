import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Feedback = () => {
  const { get } = useAxiosPublic();
  const { data: feedback = [] } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => await get("/feedback").then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-screen xl:max-w-screen-lg mx-auto mt-16">
      <h1 className="text-xl md:text-2xl lg:text-5xl font-bold text-center mb-4">Feedback</h1>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={true}
        style={{
          margin: "auto",
          "--swiper-navigation-color": "#FDC800",
          "--swiper-pagination-color": "#FDC800",
        }}
        slidesPerView={1}
        loop={true}
        className="mySwiper"
      >
        {feedback.map((f) => (
          <SwiperSlide style={{height: "500px"}} key={f._id}>
            <div className="hero bg-base-200 w-screen lg:max-w-[60%] h-[55%] m-auto relative top-30">
              <div className="hero-content">
                <img
                  src={f.photoUrl}
                  className="w-[200px] h-[200px] xl:max-w-sm rounded-full shadow-2xl border-8 border-white relative mx-auto left-15 lg:left-50 -top-30"
                />
                <div className="top-15 -left-21 relative text-center">
                  <p className="text-[12px] md:text-lg lg:text-xl font-bold">{f.name}</p>
                  <h1 className="text-sm lg:text-lg font-bold">{f.title}</h1>
                  <p className="text-sm lg:text-md line-clamp-2 lg:line-clamp-none text-justify">{f.feedbackText}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feedback;
