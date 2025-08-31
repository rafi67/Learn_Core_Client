import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const ClassCard = ({ data }) => {
  const { setClassId } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    setClassId(data._id);
    navigate('/classDetails');
  };

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
        <p>
          <span className="font-semibold">Price:</span> {data.price} BDT
        </p>
        <p>
          <span className="font-semibold">Total Enrollment:</span>{" "}
          {data.totalEnrollment}
        </p>
        <div className="card-actions justify-end">
          <button onClick={handleSubmit} className="btn bg-[#FDC800] border-0">
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
