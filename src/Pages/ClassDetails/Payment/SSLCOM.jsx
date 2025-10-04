import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SSLCOM = ({ price, title, id }) => {
  const { user } = useAuth();
  const { post } = useAxiosSecure();

  const postMutation = useMutation({
    mutationFn: (payment) =>
      post(`/create-ssl-payment?email=${user.email}&name=${user.displayName}`, payment),
    onSuccess: (data) => {
      if (data?.data.gatewayUrl) window.location.replace(data.data.gatewayUrl);
    },
    onError: (err) =>
      Swal.fire({
        title: `${err.message}`,
        icon: "error",
        draggable: true,
      }),
  });

  const handleSubmit = () => {
    const payment = {
      email: user.email,
      price: price,
      date: new Date(),
      title: title,
      classId: id,
    };

    postMutation.mutate(payment);
  };

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center space-y-6">
          <img
            className="w-[400px] h-[80px] mx-auto"
            src="https://i.ibb.co.com/rf6ghBdn/logo.png"
            alt=""
          />
          <button className="btn bg-[#FDC800] text-lg" onClick={handleSubmit}>
            Proceed Payment
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default SSLCOM;
