import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import web from "../../../assets/web.jpg";
import cProgramming from "../../../assets/c.jpg";
import mobileApp from "../../../assets/mobileApp.jpg";

const Banner = () => {
  const images = [
    {
      title: 'Learn Web Development',
      image: web
    },
    {
      title: 'Learn Structured Programming',
      image: cProgramming
    },
    {
      title: 'Learn Mobile App Development',
      image: mobileApp
    },
  ];
  return (
    <Carousel>
      {images.map(image => (
        <div className="h-[600px]">
          <img
            src={image.image}
            alt=""
          />
          <p className="legend">{image.title}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
