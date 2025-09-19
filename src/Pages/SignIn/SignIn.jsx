import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState("password");

  const showPassword = (e) => {
    e.preventDefault();
    setShow(show === "text" ? "password" : "text");
  };

  const { signInUser, setSelected } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const submit = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign In successful",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        setSelected(0);
        navigate(from);
      })
      .catch(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Invalid email or password",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <title>Sign In</title>
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign In now!</h1>
          <p className="py-6">
            Welcome back to Learn Core — your learning journey continues here.
            Sign in now to access your courses and keep growing.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(submit)} className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-lg text-red-500">email required</p>
              )}
              <fieldset className="fieldset">
                <label className="label">Password</label>
                <button
                  className="absolute top-34 right-16 z-20"
                  onClick={showPassword}
                >
                  {show === "text" ? (
                    <FaRegEyeSlash className="text-xl" />
                  ) : (
                    <FaRegEye className="text-xl" />
                  )}
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
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  })}
                />
                {errors.password?.type === "pattern" && (
                  <p className="text-lg text-red-500">
                    Password must have one lower case, one number and one
                    special character and at least one upper case.
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-lg text-red-500">
                    Password Minimum Length is 20
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-lg text-red-500">
                    Password Minimum Length is 8
                  </p>
                )}
                {errors.password?.type === "required" && (
                  <p className="text-lg text-red-500">password required</p>
                )}
              </fieldset>
              <button className="btn bg-[#FDC800] mt-4">Sign In</button>
              <Link className="text-[14px]" to="/signUp">
                Don't have an account, create new
              </Link>
            </form>
            <div className="divider">OR</div>
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
