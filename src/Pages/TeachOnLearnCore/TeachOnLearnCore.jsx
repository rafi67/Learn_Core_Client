import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useVerifyUser from "../../hooks/useVerifyUser";

const TeachOnLearnCore = () => {
  const { user } = useAuth();
  const { post } = useAxiosSecure();
  const { userType } = useVerifyUser();

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

  const submit = (data) => {
    const teacherRequest = {
      experience: data.experience,
      title: data.title,
      category: data.category,
      status: "pending",
    };

    postMutation.mutate(teacherRequest);
  };

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
                    {...register("experience", { required: true })}
                  >
                    <option disabled={true}>Select an Experience</option>
                    <option>Beginner</option>
                    <option>Experienced</option>
                    <option>Mid-Level</option>
                  </select>
                  {errors.experience?.type === "required" && (
                    <p className="text-lg text-red-500">experience required</p>
                  )}
                </fieldset>
                <legend className="fieldset-legend">Title</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Title"
                  name="title"
                  {...register("title", { required: true })}
                />
                {errors.title?.type === "required" && (
                  <p className="text-lg text-red-500">title required</p>
                )}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Category</legend>
                  <select
                    defaultValue="Select a Category"
                    className="select"
                    {...register("category", { required: true })}
                  >
                    <option disabled={true}>Select a Category</option>
                    <option>Software Engineer</option>
                    <option>Database Engineer</option>
                    <option>Mobile app Developer</option>
                  </select>
                  {errors.category?.type === "required" && (
                    <p className="text-lg text-red-500">category required</p>
                  )}
                </fieldset>
                <button
                  className="btn btn-neutral mt-4"
                  disabled={
                    userType?.role === "student" || userType?.role === "admin"
                  }
                >
                  Submit for Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachOnLearnCore;
