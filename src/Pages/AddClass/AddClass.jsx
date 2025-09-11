import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

const AddClass = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { post } = useAxiosSecure();

  const image_hosting_api_key = import.meta.env.VITE_image_hosting_key;

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_api_key}`;

  const mutation = useMutation({
    mutationFn: (addClass) => {
      post(`/addClass?email=${user.email}`, addClass);
    },
    onSuccess: () => {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Class added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
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

  const submit = async (data) => {
    const imageFile = { image: data.photo[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: { "content-type": "multipart/form-data" },
    });
    const addClass = {
      title: data.title,
      price: data.price,
      description: data.description,
      imageUrl: res.data.data.display_url,
    };

    mutation.mutate(addClass);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <title>Add Class</title>
      <div className="hero-content w-[50%] flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(submit)} className="fieldset">
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
                type="text"
                className="input"
                placeholder="Email"
                value={user.email}
                readOnly
              />
              <legend className="fieldset-legend">Price</legend>
              <input
                type="text"
                className="input"
                placeholder="Price"
                {...register("price", { required: true })}
              />
              {errors.price?.type === "required" && (
                <p className="text-lg text-red-500">price required</p>
              )}
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea resize-none"
                placeholder="Write Description here"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-lg text-red-500">description required</p>
              )}
              <legend className="fieldset-legend">Image</legend>
              <input
                type="file"
                className="file-input file-input-md"
                {...register("photo", { required: true })}
              />
              {errors.photo?.type === "required" && (
                <p className="text-lg text-red-500">image required</p>
              )}
              <button className="btn btn-neutral mt-4">Add Class</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
