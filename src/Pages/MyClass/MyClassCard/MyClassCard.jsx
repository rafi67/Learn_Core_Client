import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";

const MyClassCard = ({ data }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const image_hosting_api_key = import.meta.env.VITE_image_hosting_key;

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_api_key}`;

  const deleteMutation = useMutation({
    mutationFn: () =>
      axiosSecure.delete(`deleteClass/${data._id}?email=${user.email}`),
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Class has been deleted.",
        icon: "success",
      });
      queryClient.invalidateQueries(["myClass"]);
    },
    onError: () => {
      Swal.fire({
        title: "Failed",
        text: "Unable to delete class.",
        icon: "error",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updateClass) =>
      axiosSecure.patch(`/updateClass?email=${user.email}&classId=${data._id}`, updateClass),
    onSuccess: () => {
      Swal.fire({
        title: "Updated!",
        text: "Class has been Successfully updated.",
        icon: "success",
      });
      queryClient.invalidateQueries(["myClass"]);
    },
    onError: (err) => {
      Swal.fire({
        title: "Failed!",
        text: `${err.message}`,
        icon: "error",
      });
    },
  });

  const handleUpdate = async (d) => {
    const imageFile = { image: d.photo[0] };
    let res;

    const updateClass = {
      title: d.title,
      price: d.price,
      description: d.description,
      imageUrl: data.imageUrl,
    };

    if (d?.photo && d.photo.length > 0) {
      res = await axios.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });
      updateClass.imageUrl = res.data.data.display_url;
    }
    updateMutation.mutate(updateClass);
    document.getElementById(`${data._id}`).close();
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate();
      }
    });
  };

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
          <button
            className="btn bg-orange-500 text-white border-0"
            onClick={() => document.getElementById(`${data._id}`).showModal()}
          >
            Update
          </button>
          <button
            className="btn btn-warning text-white border-0"
            onClick={handleDelete}
          >
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
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={`${data._id}`} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Class Information</h3>
          <div className="modal-action">
            <form
              method="dialog"
              onSubmit={handleSubmit(handleUpdate)}
              className="fieldset w-full"
            >
              <legend className="fieldset-legend">Title</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Title"
                name="title"
                defaultValue={data.title}
                {...register("title", { required: true })}
              />
              {errors.title?.type === "required" && (
                <p className="text-lg text-red-500">title required</p>
              )}
              <legend className="fieldset-legend">Price</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Price"
                {...register("price", { required: true })}
                defaultValue={data.price}
              />
              {errors.price?.type === "required" && (
                <p className="text-lg text-red-500">price required</p>
              )}
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea w-full resize-none"
                placeholder="Write Description here"
                defaultValue={data.description}
                {...register("description", { required: true })}
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-lg text-red-500">description required</p>
              )}
              <legend className="fieldset-legend">Image</legend>
              <input
                type="file"
                className="file-input file-input-md w-full"
                {...register("photo")}
              />
              <button className="btn bg-orange-500 text-white mt-4">
                Update Class
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyClassCard;
