import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import Loading from "../../shared/Loading/Loading";
import right from "../../assets/right.png";
import { useState } from "react";

const ClassDetails = () => {
  const { get } = useAxiosSecure();

  const { id } = useParams();

  const [selected, setSelected] = useState(1);

  const { data: classDetails = [], isLoading } = useQuery({
    queryKey: ["classDetails"],
    queryFn: async () =>
      await get(`/classDetails/${id}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  console.log(classDetails);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full my-20 flex items-start justify-center space-x-10">
      <div className="hero bg-base-200 w-[50%]">
        <div className="hero-content flex-col lg:flex-col">
          <img src={classDetails[0].imageUrl} className="w-[96%]" />
          {/* tab section */}
          <div role="tablist" className="tabs tabs-border">
            <a
              role="tab"
              onClick={() => setSelected(1)}
              className={`tab ${selected == 1 && "tab-active"}`}
            >
              Overview
            </a>
            <a
              role="tab"
              onClick={() => setSelected(2)}
              className={`tab ${selected == 2 && "tab-active"}`}
            >
              Teacher
            </a>
          </div>
          {/* overview and instructor section */}
          {selected == 1 ? (
            <div>
              <div className="flex space-x-2">
                <div className="flex items-center space-x-1">
                  <img className="w-[30px] h-[30px]" src={right} alt="" />
                  <p>
                    <span className="font-bold">Students:</span>{" "}
                    {classDetails[0].totalEnrollment}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <img className="w-[30px] h-[30px]" src={right} alt="" />
                  <p>
                    <span className="font-bold">Instructor:</span>{" "}
                    {classDetails[0].name}
                  </p>
                </div>
              </div>
              <h1 className="text-xl font-bold">{classDetails[0].title}</h1>
              <p className="py-6">{classDetails[0].description}</p>
            </div>
          ) : (
            <div>
              <div className="card bg-gray-100 flex flex-col lg:flex-row items-center lg:items-start mx-auto">
                <figure>
                  <img
                    className="rounded-full w-[130px] h-[130px]"
                    src={classDetails[0].photo}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body lg:w-[70%]">
                  <h2 className="card-title">{classDetails[0].name}</h2>
                  <h2 className="card-title">{classDetails[0].designation}</h2>
                  <p className="text-justify">{classDetails[0].experience}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* pay section */}
      <div className="hero bg-base-200 w-[30%] flex flex-col items-start border-1 border-gray-300 p-4 space-y-4">
        <div role="tablist" className="tabs tabs-border">
          <a
            role="tab"
            className="tab tab-active text-2xl font-semibold cursor-default"
          >
            Price
          </a>
        </div>
        <p className="text-2xl font-semibold">{classDetails[0].price} BDT</p>
        <button className="btn bg-[#FDC800] w-full text-lg">Pay</button>
      </div>
    </div>
  );
};

export default ClassDetails;
