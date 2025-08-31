import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useParams } from "react-router";
import Loading from "../../shared/Loading/Loading";
import right from "../../assets/right.png";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./Payment/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);

const ClassDetails = () => {
  const { get, post } = useAxiosSecure();

  const { id } = useParams();
  const { user } = useAuth();
  const [selected, setSelected] = useState(1);

  const { data: paid = false } = useQuery({
    queryKey: ["paid"],
    queryFn: async () =>
      await post("/verifyPayment", {
        email: user.email,
        classId: id,
      }).then((res) => {
        console.log(res.data);
        return res.data.isPaid;
      }),
    refetchOnWindowFocus: false,
  });

  const { data = [], isLoading } = useQuery({
    queryKey: ["classDetails"],
    queryFn: async () =>
      await get(`/classDetails/${id}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  return data.map((classDetails) => (
    <div
      key={classDetails._id}
      className="w-full my-20 flex flex-col lg:flex-row items-start justify-center space-y-4 lg:space-y-0 lg:space-x-10"
    >
      <div className="hero bg-base-200 w-full lg:w-[50%]">
        <div className="hero-content flex-col lg:flex-col">
          <img src={classDetails.imageUrl} className="w-[96%]" />
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
                    <span className="font-bold text-sm lg:text-lg">
                      Students:
                    </span>{" "}
                    {classDetails.totalEnrollment}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <img className="w-[30px] h-[30px]" src={right} alt="" />
                  <p>
                    <span className="font-bold text-sm lg:text-lg">
                      Instructor:
                    </span>{" "}
                    {classDetails.name}
                  </p>
                </div>
              </div>
              <h1 className="text-md lg:text-xl font-bold">
                {classDetails.title}
              </h1>
              <p className="text-md text-justify lg:text-lg py-6">
                {classDetails.description}
              </p>
            </div>
          ) : (
            <div>
              <div className="card bg-gray-100 flex flex-col lg:flex-row items-center lg:items-start mx-auto">
                <figure>
                  <img
                    className="rounded-full w-[130px] h-[130px]"
                    src={classDetails.photo}
                    alt={`${classDetails.title}`}
                  />
                </figure>
                <div className="card-body lg:w-[70%]">
                  <h2 className="card-title">{classDetails.name}</h2>
                  <h2 className="card-title">{classDetails.designation}</h2>
                  <p className="text-justify">{classDetails.experience}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* pay section */}
      <div className="hero bg-base-200 w-full lg:w-[30%] flex flex-col items-start border-1 border-gray-300 p-4 space-y-4">
        {!paid ? (
          <>
            <div role="tablist" className="tabs tabs-border">
              <a
                role="tab"
                className="tab tab-active text-2xl font-semibold cursor-default"
              >
                Price
              </a>
            </div>

            <p className="text-2xl font-semibold">{classDetails.price} BDT</p>

            <button
              className="btn bg-[#FDC800] w-full text-lg"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Pay
            </button>
          </>
        ) : (
          <Link to="/studentDashboard/myEnrollClass" className="btn bg-[#FDC800] w-full text-lg">
            Class Details
          </Link>
        )}
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {!paid && (
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <Elements stripe={stripePromise}>
              <CheckoutForm id={id} price={classDetails.price} />
            </Elements>
          </div>
        </dialog>
      )}
    </div>
  ));
};

export default ClassDetails;
