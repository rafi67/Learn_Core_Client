import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router";
import Swal from "sweetalert2";

const PaymentCancel = () => {
  const { pathname } = useLocation();
  const [message, setMessage] = useState(null);

    useQuery({
        queryKey: ["paymentCancelOrFailed", message],
        queryFn: () => showAlert(),
        refetchOnWindowFocus: false,
    });

  const showAlert = () => {
    if (pathname === "/cancel") setMessage("Payment Cancel");
    else setMessage("Payment Failed");

    if (message != null) {
      Swal.fire({
        title: `${message}`,
        icon: "error",
        draggable: true,
      });
    }
  };
  
  return (
    <div>
      <img
        className="w-screen h-screen"
        src="https://i.ibb.co.com/VWwyn0pV/12083608-Wavy-Bus-26-Single-11-1.jpg"
        alt=""
      />
    </div>
  );
};

export default PaymentCancel;
