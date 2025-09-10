import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const { post } = useAxiosSecure();
  const navigate = useNavigate();

  const handleSubmit = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          photoUrl: result.user.photoURL,
        };
        post("/user", user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign Up successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) =>
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${err.message}`,
          showConfirmButton: false,
          timer: 1500,
        })
      );
  };

  return (
    <div>
      <button onClick={handleSubmit} className="btn w-full mt-4">
        <img
          src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
          alt=""
          className="w-[30px] h-[30px]"
        />
        Google
      </button>
    </div>
  );
};

export default SocialLogin;
