import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SSLCOMPaymentSuccess = () => {
  const { user } = useAuth();
  const { post, get } = useAxiosSecure();
  const navigate = useNavigate();

  const postMutation = useMutation({
    mutationFn: (payment) => post(`/payments?email=${user.email}`, payment),
    onSuccess: (data) => {
      console.log(data);
      get(
        `/send-payment-email?email=${user.email}&paymentId=${data.data.insertedId}`
      );
      Swal.fire({
        title: "Redirect to Home Page",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Redirect",
        denyButtonText: `Don't redirect`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
    onError: (err) =>
      Swal.fire({
        title: `${err.message}`,
        icon: "error",
        draggable: true,
      }),
  });

  const handleSubmit = () => {
    const params = new URLSearchParams(location.search);
    const dataParam = params.get("data");

    const parsed = JSON.parse(decodeURIComponent(dataParam));
    postMutation.mutate(parsed);
  };

  return (
    <div onLoad={handleSubmit}>
      <img
        className="w-screen h-screen"
        src="https://i.ibb.co.com/4nsgRVSJ/58596576-2306-i402-024-F-m004-c9-Credit-score-flat-background.jpg"
        alt=""
      />
    </div>
  );
};

export default SSLCOMPaymentSuccess;
