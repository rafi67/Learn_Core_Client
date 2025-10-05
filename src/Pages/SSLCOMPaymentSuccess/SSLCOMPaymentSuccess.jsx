import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SSLCOMPaymentSuccess = () => {
  const { user } = useAuth();
  const { get } = useAxiosSecure();
  const navigate = useNavigate();
  const { paymentId } = useParams();

  const { data = [] } = useQuery({
    queryKey: ["paymentEmail"],
    queryFn: () =>
      get(`/send-payment-email?email=${user.email}&paymentId=${paymentId}`)
        .then(() => {
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
        })
        .catch((err) =>
          Swal.fire({
            title: `${err.message}`,
            icon: "error",
            draggable: true,
          })
        ),
    refetchOnWindowFocus: false,
  });

  return (
    <div key={data}>
      <img
        className="w-screen h-screen"
        src="https://i.ibb.co.com/4nsgRVSJ/58596576-2306-i402-024-F-m004-c9-Credit-score-flat-background.jpg"
        alt=""
      />
    </div>
  );
};

export default SSLCOMPaymentSuccess;
