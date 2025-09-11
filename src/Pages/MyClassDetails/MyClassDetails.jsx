import CountUp from "react-countup";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useVerifyUser from "../../hooks/useVerifyUser";

const MyClassDetails = () => {
  const { id } = useParams();
  const { get, post } = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { userType } = useVerifyUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const postMutation = useMutation({
    mutationFn: (data) =>
      post(`/addAssignment?email=${user.email}&classId=${id}`, data),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Assignment Submitted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["myClass"]);
      reset();
    },
    onError: (err) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${err.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const url = `/classProgress`;
  const url2 = `/myClassProgress`;

  const { data: classProgress = [] } = useQuery({
    queryKey: ["classProgress"],
    queryFn: async () =>
      await get(`${userType?.role=='admin'? url : url2}?email=${user.email}&classId=${id}`).then(
        (res) => res.data
      ),
    refetchOnWindowFocus: false,
  });

  const submit = (data) => {
    postMutation.mutate(data);
    document.getElementById("my_modal_5").close();
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">Class Progress</h1>
      <div className="flex flex-col lg:flex-row space-y-4 space-x-4 mt-20 justify-center">
        {/* total enrollments */}
        <div className="card w-[100%] lg:w-80 shadow-sm h-[200px] bg-linear-to-bl from-[#FDF3F0] to-[#EDFEFE]">
          <div className="card-body">
            <h2 className="card-title">Total Enrollments</h2>
            <CountUp
              className="account-balance stat-value"
              start={0}
              end={classProgress[0]?.totalEnrollment}
              enableScrollSpy
              duration={3}
              onEnd={() => console.log("Ended! 👏")}
              onStart={() => console.log("Started! 💨")}
            >
              {({ countUpRef }) => (
                <div>
                  <span className="stat-value" ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </div>
        </div>

        {/* total assignment */}
        <div className="card w-[100%] lg:w-80 shadow-sm h-[200px] bg-linear-to-bl from-[#FDF3F0] to-[#EDFEFE]">
          <div className="card-body">
            <h2 className="card-title">Total Assignment</h2>
            <CountUp
              className="account-balance"
              start={0}
              end={classProgress[0]?.totalAssignment}
              decimal=","
              duration={3}
              enableScrollSpy
              onEnd={() => console.log("Ended! 👏")}
              onStart={() => console.log("Started! 💨")}
            >
              {({ countUpRef }) => (
                <div>
                  <span className="stat-value" ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </div>
        </div>

        {/* total assignment submission */}
        <div className="card w-[100%] lg:w-80 shadow-sm h-[200px] bg-linear-to-bl from-[#FDF3F0] to-[#EDFEFE]">
          <div className="card-body">
            <h2 className="card-title">Total Assignment Submission</h2>
            <CountUp
              className="account-balance stat-value"
              start={0}
              end={classProgress[0]?.totalSubmission}
              enableScrollSpy
              duration={3}
              onEnd={() => console.log("Ended! 👏")}
              onStart={() => console.log("Started! 💨")}
            >
              {({ countUpRef }) => (
                <div>
                  <span className="stat-value" ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </div>
        </div>
      </div>

      <button
        className="btn text-white text-md bg-[#137333] rounded-full"
        onClick={() => document.getElementById("my_modal_5").showModal()}
        disabled={userType?.role=='admin'}
      >
        <FaPlus />
        Create
      </button>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Assignment</h3>
          <div className="modal-action">
            <form
              method="dialog"
              onSubmit={handleSubmit(submit)}
              className="fieldset mx-auto w-full"
            >
              <label className="label">Title</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Title"
                {...register("title", { required: true })}
              />
              {errors.title?.type === "required" && (
                <p className="text-lg text-red-500">title required</p>
              )}
              <label className="label">Deadline</label>
              <input
                type="date"
                className="input w-full"
                placeholder="Deadline"
                {...register("deadline", { required: true })}
              />
              <label className="label">Description</label>
              <textarea
                className="textarea w-full resize-none"
                placeholder="Assignment Description"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-lg text-red-500">description required</p>
              )}
              <button className="btn bg-[#FDC800] mt-4">Add Assignment</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyClassDetails;
