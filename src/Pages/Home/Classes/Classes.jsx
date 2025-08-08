import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Card from "../../../shared/Card/Card";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Classes = () => {
  const [Class, setClass] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/classes").then((res) => setClass(res.data));
  }, [axiosPublic]);

  return (
    <div className="mt-10 space-y-7">
      {/* text section */}
      <h1 className="text-4xl font-bold">Popular Courses</h1>
      {/* card section */}
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={3}
        data-swiper-autoplay="2000"
        className="mySwiper max-w-screen-lg"
      >
        {Class.map( data => (
          <SwiperSlide>
            <Card key={data._id} data={data}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Classes;
