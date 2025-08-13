import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const Instructor = () => {
  const { get } = useAxiosPublic();

  const { data: instructorData = [] } = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => await get("/teacher").then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {/* card section */}
      <Swiper
        autoplay={true}
        pagination={true}
        modules={[Pagination, Autoplay]}
        style={{
          "--swiper-pagination-color": "#FDC800",
        }}
        className="mySwiper mt-20"
      >
        {instructorData.map((i) => (
          <SwiperSlide>
            <div className="card bg-base-100 w-[500px] shadow-2xl flex flex-row items-start mx-auto">
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

      {/* button */}
      <div className="justify-self-center mt-20">
        <button
          type="submit"
          className="btn rounded-4xl bg-transparent border-[#002147] text-[#002147] hover:bg-[#002147] hover:text-white"
        >
          Become an Instructor
        </button>
      </div>
    </div>
  );
};

export default Instructor;
