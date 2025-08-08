import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  const images = [
    {
      title: "Learn Web Development",
      image: "https://i.ibb.co.com/6cFGNP5q/web.jpg",
    },
    {
      title: "Learn Structured Programming",
      image: "https://i.ibb.co.com/vtJqPPQ/c.jpg",
    },
    {
      title: "Learn Mobile App Development",
      image: "https://i.ibb.co.com/RpsVhFbf/mobile-App.jpg",
    },
    {
      title: "Learn Ethical Hacking",
      image: "https://i.ibb.co.com/Cp7cCrcJ/ethical-hacking.jpg",
    },
  ];

  return (
    <div>
      {/* carousel */}
      <Carousel autoPlay={true} infiniteLoop={true} useKeyboardArrows={true} emulateTouch={true}>
        {images.map((image) => (
          <div className="h-[570px]">
            <img src={image.image} alt="" />
            <p className="legend">{image.title}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
