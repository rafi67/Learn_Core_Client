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
    <div className="mt-20 mb-20">
      <h1 className="text-4xl font-bold text-center">Our Skilled Instructor</h1>
      {/* card section */}
      <Swiper
        autoplay={true}
        pagination={true}
        modules={[Pagination, Autoplay]}
        style={{
          "--swiper-pagination-color": "#FDC800",
        }}
        className="mySwiper mt-10"
      >
        {instructorData.map((i) => (
          <SwiperSlide>
            <div className="card bg-gray-100 w-[500px] flex flex-row items-start mx-auto">
              <figure>
                <img
                  className="rounded-full w-[130px] h-[130px]"
                  src={i.photo}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body w-[70%]">
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
