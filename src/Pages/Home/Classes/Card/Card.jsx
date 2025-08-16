
const Card = ({data}) => {
  return (
    <div className="card w-screen mx-auto md:w-[98%] lg:w-[335px] rounded-none bg-gray-100">
      <figure>
        <img
          src={data.imageUrl}
          alt=""
          className="w-full h-[320px]"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-1">{data.title}</h2>
        <p className="line-clamp-2">
          {data.description}
        </p>
        <div className="card-actions justify-end">
          <button className="btn bg-[#FDC800] border-0">Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
