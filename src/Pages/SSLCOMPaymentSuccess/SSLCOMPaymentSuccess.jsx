import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const SSLCOMPaymentSuccess = () => {
  const navigate = useNavigate();

  const handleLoad = () => {
    // e.preventDefault();
    Swal.fire({
      title: "Payment Successful",
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "Ok",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <div onLoad={handleLoad}>
      <img
        className="w-screen h-screen"
        src="https://i.ibb.co.com/4nsgRVSJ/58596576-2306-i402-024-F-m004-c9-Credit-score-flat-background.jpg"
        alt=""
      />
    </div>
  );
};

export default SSLCOMPaymentSuccess;
