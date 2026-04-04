import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import { useParams } from "react-router-dom";

// done;
const stiprePromise = loadStripe(import.meta.env.VITE_stripe_publishabel_key);

const Payment = () => {
  const { id } = useParams();
  return (
    <Elements stripe={stiprePromise}>
      <Checkout ids={id} />
    </Elements>
  );
};

export default Payment;
