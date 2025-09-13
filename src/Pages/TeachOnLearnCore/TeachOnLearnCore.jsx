import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useVerifyUser from "../../hooks/useVerifyUser";

const TeachOnLearnCore = () => {
  const { user } = useAuth();
  const { post, get, patch } = useAxiosSecure();
  const { userType } = useVerifyUser();

  const { data: Status = [], refetch } = useQuery({
    queryKey: ["Status"],
    queryFn: async () =>
      get(`/status?email=${user.email}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const postMutation = useMutation({
    mutationFn: (teacherRequest) =>
      post(`/teacherRequest?email=${user.email}`, teacherRequest),
    onSuccess: () => {
      Swal.fire({
        title: "Submitted!",
        text: "Teacher request has been submitted successfully.",
        icon: "success",
      });
      refetch();
      reset();
    },
    onError: (err) => {
      Swal.fire({
        title: "Failed to submit teacher request",
        text: `${err.message}`,
        icon: "error",
      });
    },
  });
  const patchMutation = useMutation({
    mutationFn: (status) =>
      patch(`/anotherTeacherRequest?email=${user.email}`, {status: status}),
    onSuccess: () => {
      Swal.fire({
        title: "Submitted!",
        text: "Teacher request has been resubmitted successfully.",
        icon: "success",
      });
      refetch();
    },
    onError: (err) => {
      Swal.fire({
        title: "Failed to submit teacher request",
        text: `${err.message}`,
        icon: "error",
      });
    },
  });

  const submit = (data) => {
    const teacherRequest = {
      experience: data.experience,
      title: data.title,
      category: data.category,
      status: "pending",
    };

    postMutation.mutate(teacherRequest);
  };

  const resubmit = (e) => {
    e.preventDefault();
    patchMutation.mutate('pending');
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <title>Teach on LearnCore</title>
      <div className="hero-content w-[50%] flex-col lg:flex-row-reverse">
        {!(userType?.role == "teacher") && (
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <div className="avatar relative mx-auto">
                <div className="w-24 rounded-full">
                  <img src={user.photoURL} />
                </div>
              </div>
              <form onSubmit={handleSubmit(submit)} className="fieldset">
                <legend className="fieldset-legend">Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Name"
                  value={user.displayName}
                  readOnly
                />
                <legend className="fieldset-legend">Email</legend>
                <input
                  type="email"
                  className="input"
                  placeholder="email"
                  value={user.email}
                  readOnly
                />
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Experience</legend>
                  <select
                    defaultValue="Select an Experience"
                    className="select"
                    disabled={Status[0]?.status === "rejected"}
                    {...register("experience", { required: true })}
                  >
                    <option disabled={true}>Select an Experience</option>
                    <option>Beginner</option>
                    <option>Experienced</option>
                    <option>Mid-Level</option>
                  </select>
                  {errors.experience?.type === "required" && Status[0]?.status !== "rejected" && (
                    <p className="text-lg text-red-500">experience required</p>
                  )}
                </fieldset>
                <legend className="fieldset-legend">Title</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Title"
                  name="title"
                  disabled={Status[0]?.status === "rejected"}
                  {...register("title", { required: true })}
                />
                {errors.title?.type === "required" && Status[0]?.status !== "rejected" && (
                  <p className="text-lg text-red-500">title required</p>
                )}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Category</legend>
                  <select
                    defaultValue="Select a Category"
                    className="select"
                    disabled={Status[0]?.status == "rejected"}
                    {...register("category", { required: true })}
                  >
                    <option disabled={true}>Select a Category</option>
                    <option>Software Engineer</option>
                    <option>Database Engineer</option>
                    <option>Mobile app Developer</option>
                  </select>
                  {errors.category?.type === "required" && Status[0]?.status !== "rejected" && (
                    <p className="text-lg text-red-500">category required</p>
                  )}
                </fieldset>
                {Status[0]?.status == "rejected" ? (
                  <button
                    className="btn btn-neutral mt-4"
                    onClick={resubmit}
                  >
                    Submit for another
                  </button>
                ) : (
                  <button
                    className="btn btn-neutral mt-4"
                    disabled={
                      userType?.role === "student" || userType?.role === "admin" || Status[0]?.status === "pending"
                    }
                  >
                    Submit for Review
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachOnLearnCore;
