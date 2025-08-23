import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

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
    if (show == "password") setShow("text");
    else setShow("password");
  };

  const { signInUser } = useAuth();

  const navigate = useNavigate();

  const from = navigate.state?.from || "/";

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
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                })}
              />
              {errors.password?.type === "pattern" && (
                <p className="text-lg text-red-500">
                  Password must have one lower case, one number and one special
                  character and at least
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
              <button className="btn bg-[#FDC800] mt-4">Sign In</button>
              <Link className="text-[14px]" to='/signUp'>Don't have an account, create new</Link>
              <div className="divider">OR</div>
              <SocialLogin />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
