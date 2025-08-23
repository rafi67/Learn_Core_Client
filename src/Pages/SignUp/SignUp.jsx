import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";
import Swal from "sweetalert2";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState("password");

  const showPassword = (e) => {
    e.preventDefault();
    if (show == "password") setShow("text");
    else setShow("password");
  };

  const { createUser, updateUserProfile } = useAuth();

  const { post } = useAxiosPublic();

  const navigate = useNavigate();

  const image_hosting_api_key = import.meta.env.VITE_image_hosting_key;

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_api_key}`;

  const submit = (data) => {
    const imageFile = { image: data.photo[0] };
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);
        const res = await axios.post(image_hosting_api, imageFile, {
          headers: { "content-type": "multipart/form-data" },
        });

        if (res.data.success) {
          reset();
          const user = {
            name: data.name,
            email: data.email,
            photoUrl: res.data.data.display_url,
          };

          updateUserProfile(user.name, user.photoUrl);

          await post("/user", user);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sign Up successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <title>Sign Up</title>
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Unlock your potential with Learn Core and start mastering new
            skills today. Sign up now to begin your journey toward growth and
            success!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(submit)} className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Name"
                {...register("name", { required: true, maxLength: 20 })}
              />
              {errors.name?.type === "required" && (
                <p className="text-lg text-red-500">name required</p>
              )}
              <label className="label">Photo</label>
              <input
                type="file"
                className="file-input file-input-md"
                {...register("photo", { required: true })}
              />
              {errors.photo?.type === "required" && (
                <p className="text-lg text-red-500">photo required</p>
              )}
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email?.type === "required" && (
                <p className="text-lg text-red-500">email required</p>
              )}
              <label className="label">Password</label>
              <button onClick={showPassword}>
                <img
                  src="https://img.icons8.com/?size=100&id=85028&format=png&color=000000"
                  alt="show password"
                  className="w-[20px] h-[20px] relative left-72 top-9 z-20"
                />
              </button>
              <input
                type={show}
                className="input"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern:
                    /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                })}
              />
              {errors.password?.type === "pattern" && (
                <p className="text-lg text-red-500">
                  Password Minimum Length is 8
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-lg text-red-500">
                  Password must have one lower case, one number and one special
                  characterr
                </p>
              )}
              {errors.password?.type === "required" && (
                <p className="text-lg text-red-500">password required</p>
              )}
              <button className="btn bg-[#FDC800] mt-4">Sign Up</button>
              <div className="divider">OR</div>
              <SocialLogin />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
