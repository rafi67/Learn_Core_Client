import { Link } from "react-router";

const MyClassCard = ({ data }) => {
  return (
    <div className="card w-screen mx-auto md:w-[98%] lg:w-[335px] rounded-none bg-gray-100">
      <figure>
        <img src={data.imageUrl} alt="" className="w-full h-[320px]" />
      </figure>
      <div className="card-body">
        <h1 className="text-xl font-semibold">{data.name}</h1> {/* name */}
        <h1 className="text-lg font-semibold">Email: {data.email}</h1>{" "}
        {/* name */}
        <h2 className="card-title line-clamp-1">{data.title}</h2>
        {/* title */}
        <p className="line-clamp-2">{data.description}</p> {/* description */}
        <div className="divider"></div>
        <p>
          <span className="font-semibold">Status:</span>
          {" " + data.status}
        </p>
        <p>
          <span className="font-semibold">Price:</span> {data.price} BDT
        </p>
        <div className="card-actions justify-end">
          <button className="btn bg-orange-500 text-white border-0">
            Update
          </button>
          <button className="btn btn-warning text-white border-0">
            Delete
          </button>
          <Link
            to={`/teacherDashboard/myclassDetails/${data._id}`}
            className="btn bg-gray-400 text-white border-0"
            disabled={data.status === "pending"}
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyClassCard;
