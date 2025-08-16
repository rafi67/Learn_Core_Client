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
      title: "Learn App Development",
      image: "https://i.ibb.co.com/RpsVhFbf/mobile-App.jpg",
    },
    {
      title: "Learn Ethical Hacking",
      image: "https://i.ibb.co.com/Cp7cCrcJ/ethical-hacking.jpg",
    },
  ];

  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        useKeyboardArrows={true}
        emulateTouch={true}
      >
        {images.map((image) => (
          <div>
            <img src={image.image} alt="" />
            <p className="legend">{image.title}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
