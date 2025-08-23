import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const { post } = useAxiosPublic();
  const navigate = useNavigate();

  const handleSubmit = () => {
    signInWithGoogle()
      .then(async (result) => {
        console.log(result.user);
        const user = {
          name: result.user.displayName,
          email: result.user.displayName,
          photoUrl: result.user.photoURL,
        };
        await post("/user", user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign Up successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => console.log(err));
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
