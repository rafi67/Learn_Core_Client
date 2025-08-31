import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CheckoutForm = ({ price, id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: clientSecret = "" } = useQuery({
    queryKey: ["clientSecret"],
    queryFn: async () =>
      await axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          console.log("client secret:", res.data.clientSecret);
          return res.data.clientSecret;
        }),
    refetchOnWindowFocus: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "anonymous",
            name: user.displayName || "anonymous",
          },
        },
      });

    if (paymentError) {
      console.log([paymentError]);
      document.getElementById("my_modal_5").close();
      Swal.fire({
        title: "Payment Failed! Try again",
        icon: "error",
        draggable: true,
      });
    } else if (paymentIntent.status === "succeeded") {
      const payment = {
        email: user.email,
        price: price,
        date: new Date(),
        transactionId: paymentIntent.id,
        classId: id,
      };
      const res = await axiosSecure.post("/payments", payment);
      console.log(res.data);
      document.getElementById("my_modal_5").close();
      Swal.fire({
        title: "Payment Successful",
        icon: "success",
        draggable: true,
      });
      navigate("/studentDashBoard/myEnrollClass");
    }
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box space-y-6">
        <h3 className="font-bold text-lg">Checkout</h3>
        <div className="w-full">
          <form method="dialog" onSubmit={handleSubmit} className="space-y-6">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#aab7c4",
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <button
              className="btn w-1/3 bg-[#FDC800] text-lg"
              type="submit"
              disabled={!stripe || !clientSecret}
            >
              Pay
            </button>
            <p className="text-red-600">{error}</p>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CheckoutForm;
