import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { StarRating } from "react-flexible-star-rating";

const Feedback = () => {
  const { get } = useAxiosPublic();
  const { data: feedback = [] } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => await get("/feedback").then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="mt-16">
      <h1 className="text-5xl font-bold text-center mb-4">Feedback</h1>
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
        slidesPerView={1}
        loop={true}
        className="mySwiper max-w-screen-lg"
      >
        {feedback.map((f) => (
          <SwiperSlide style={{ height: "500px" }} key={f._id}>
            <div className="hero bg-base-200 max-w-[60%] h-[55%] m-auto relative top-30">
              <div className="hero-content">
                <img
                  src={f.photoUrl}
                  className="max-w-sm rounded-full shadow-2xl border-8 border-white relative left-50 -top-30"
                />
                {/* rating */}
                {/* <StarRating dimension={5} isReadOnly={true} initialRating={f.rating} /> */}
                <div className="top-15 -left-21 relative text-center">
                  <p className="text-md font-bold">{f.name}</p>
                  <h1 className="text-lg font-bold">{f.title}</h1>
                  <p className="text-md text-justify">{f.feedbackText}</p>
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
