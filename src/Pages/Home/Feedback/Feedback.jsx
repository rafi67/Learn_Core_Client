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
          <SwiperSlide key={f._id}>
            <div className="hero bg-base-200 max-h[500px]">
              <div className="hero-content flex-col items-start">
                <img
                  src={f.photoUrl}
                  className="max-w-sm rounded-lg shadow-2xl"
                />
                <p className="py-6 text-2xl font-bold">{f.name}</p>
                {/* rating */}
                <StarRating dimension={10} isReadOnly={true} initialRating={f.rating} />
                <div>
                  <h1 className="text-5xl font-bold">{f.title}</h1>
                  <p className="py-6">{f.feedbackText}</p>
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
