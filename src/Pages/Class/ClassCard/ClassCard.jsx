import { Link } from "react-router";

const ClassCard = ({ data }) => {
  return (
    <div className="card w-screen mx-auto md:w-[98%] lg:w-[335px] rounded-none bg-gray-100">
      <figure>
        <img src={data.imageUrl} alt="" className="w-full h-[320px]" />
      </figure>
      <div className="card-body">
        <h1 className="text-xl font-semibold">{data.name}</h1>
        <h2 className="card-title line-clamp-1">{data.title}</h2>
        <p className="line-clamp-2">{data.description}</p>
        <div className="divider"></div>
        <p><span className="font-semibold">Price:</span> {data.price} BDT</p>
        <p><span className="font-semibold">Total Enrollment:</span> {data.totalEnrollment}</p>
        <div className="card-actions justify-end">
          <Link to={`/classDetails/${data._id}`} className="btn bg-[#FDC800] border-0">Enroll</Link>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
