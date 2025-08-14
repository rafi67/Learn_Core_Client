import ReactPlayer from "react-player";

const CampusVideo = () => {
  return (
    <div className="justify-items-center mt-20">
      <h1 className="text-4xl font-semibold mb-10">Watch Campus Life Video Tour</h1>
      <ReactPlayer controls={true} style={{width: "50%", height: "400px", margin: "auto 0 auto 0"}} config={{youtube:{
        color: 'red',
      }}} src="https://www.youtube.com/watch?v=IBSIckQWTVg" />
    </div>
  );
};

export default CampusVideo;
