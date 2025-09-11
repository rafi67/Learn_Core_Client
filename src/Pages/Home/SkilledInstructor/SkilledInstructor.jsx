import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const SkilledInstructor = () => {
  const { get } = useAxiosPublic();

  const { data: instructorData = [] } = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => await get("/teacher").then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-screen xl:max-w-screen-lg mx-auto mt-20 mb-20">
      <h1 className="text-4xl font-bold text-center mb-10">Our Skilled Instructor</h1>
      {/* card section */}
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay={true}
        modules={[Pagination, Autoplay]}
        style={{
          "--swiper-navigation-color": "#FDC800",
          "--swiper-pagination-color": "#FDC800",
        }}
        slidesPerView={1}
        centeredSlides={true}
        className="mySwiper"
      >
        {instructorData.map((i) => (
          <SwiperSlide>
            <div className="card bg-gray-100 h-[200px] w-[80%] xl:w-[500px] flex flex-col lg:flex-row items-center lg:items-center mx-auto">
              <figure className="ml-2">
                <img
                  className="rounded-full w-[130px] h-[130px]"
                  src={i.photo}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body lg:w-[70%]">
                <h2 className="card-title">{i.name}</h2>
                <h2 className="card-title">{i.title}</h2>
                <p className="text-justify">{i.experience}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SkilledInstructor;
