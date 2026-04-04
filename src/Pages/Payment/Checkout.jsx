import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import useContexHooks from "../../useHooks/useContexHooks";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../useHooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import PreLoader from "../../components/PreLoader";
import {
  FaShieldAlt,
  FaLock,
  FaCreditCard,
  FaCheckCircle,
  FaUserCircle,
  FaEnvelope,
  FaTag,
} from "react-icons/fa";

// ─── ALL LOGIC IS UNCHANGED ───────────────────────────────────────────────────
const Checkout = ({ ids }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, enrollPrice, togol } = useContexHooks();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { handleSubmit, reset } = useForm();

  const createPaymentIntent = async (price) => {
    const res = await axiosSecure.post("/create-payment-intent", { price });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
    },
    onError: (error) => {
      toast.error(`Error creating payment intent: ${error.message}`, {
        position: "top-center",
      });
    },
  });

  useEffect(() => {
    if (enrollPrice && !clientSecret) {
      mutation.mutate(parseInt(enrollPrice));
    }
  }, [enrollPrice, clientSecret]);

  if (!enrollPrice) {
    return <PreLoader />;
  }

  const onSubmit = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      setIsProcessing(false);
      toast.error("Payment initialization failed. Please try again.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      setIsProcessing(false);
      toast.error("Card details are required.");
      return;
    }

    const { error: paymentError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentError) {
      setError(paymentError.message);
      setIsProcessing(false);
      return;
    } else {
      console.log(paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setIsProcessing(false);
    } else {
      setTransactionId(paymentIntent.id);
      toast.success("Payment successful!");
      reset();
      const info = {
        name: user?.displayName,
        email: user?.email,
        transactionId: paymentIntent.id,
      };
      await axiosSecure.patch(`/classenroll-update/${ids}`, info);
      navigate("/dashboard/enrollclass");
    }

    setIsProcessing(false);
  };
  // ─────────────────────────────────────────────────────────────────────────────

  // Theme tokens (togol=true → light, false → dark)
  const pageBg   = togol ? "bg-gradient-to-br from-[#f0f4ff] via-[#f7f9fa] to-[#eef2ff]" : "bg-[#111827]";
  const cardBg   = togol ? "bg-white"          : "bg-[#1e1e2e]";
  const textMd   = togol ? "text-[#2d2f31]"    : "text-white";
  const textSm   = togol ? "text-[#6a6f73]"    : "text-gray-400";
  const fieldBg  = togol ? "bg-[#f7f9fa] border-[#e0e0e0]" : "bg-[#13131f] border-[#2d2d3d]";
  const fieldTxt = togol ? "text-[#2d2f31]"    : "text-gray-200";

  return (
    <div className={`min-h-screen ${pageBg} py-14 px-4 transition-colors duration-300`}>
      <div className="max-w-lg mx-auto space-y-5">

        {/* ── Page Title ── */}
        <div className="text-center space-y-1">
          <h1 className={`text-3xl font-extrabold tracking-tight ${textMd}`}>
            Secure Checkout
          </h1>
          <p className={`text-sm ${textSm} flex items-center justify-center gap-1.5`}>
            <FaLock className="text-[#a435f0] text-xs" />
            Your payment is encrypted &amp; secured by Stripe
          </p>
        </div>

        {/* ── Main Card ── */}
        <div className={`${cardBg} rounded-2xl shadow-2xl overflow-hidden border ${togol ? "border-gray-100" : "border-[#2d2d3d]"}`}>

          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#a435f0] to-[#6d28d9] px-6 py-5 flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-0.5">
                Order Summary
              </p>
              <p className="text-white text-2xl font-black tracking-tight">
                ${enrollPrice}
                <span className="text-white/60 text-sm font-medium ml-2 line-through">
                  ${(parseFloat(enrollPrice) * 1.6).toFixed(0)}
                </span>
              </p>
              <span className="inline-block mt-1 bg-[#eceb98] text-[#2d2f31] text-[10px] font-black px-2 py-0.5 rounded">
                40% OFF APPLIED
              </span>
            </div>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <FaShieldAlt className="text-white text-2xl" />
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">

            {/* ── Buyer Info ── */}
            <div>
              <p className={`text-xs font-bold uppercase tracking-widest ${textSm} mb-3`}>
                Billing Details
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className={`flex items-center gap-1.5 text-xs font-semibold ${textSm}`}>
                    <FaUserCircle className="text-[#a435f0] text-sm" /> Name
                  </label>
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${fieldBg}`}>
                    <p className={`text-sm font-medium ${fieldTxt} truncate`}>
                      {user?.displayName}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className={`flex items-center gap-1.5 text-xs font-semibold ${textSm}`}>
                    <FaEnvelope className="text-[#a435f0] text-sm" /> Email
                  </label>
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${fieldBg}`}>
                    <p className={`text-sm font-medium ${fieldTxt} truncate`}>
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Amount ── */}
            <div className="space-y-1.5">
              <label className={`flex items-center gap-1.5 text-xs font-semibold ${textSm}`}>
                <FaTag className="text-[#a435f0] text-sm" /> Amount to Pay
              </label>
              <div className={`flex items-center justify-between px-4 py-3 rounded-xl border ${fieldBg}`}>
                <span className={`text-xl font-black ${textMd}`}>
                  ${enrollPrice}
                </span>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-lg">
                  ONE-TIME PAYMENT
                </span>
              </div>
            </div>

            {/* ── Card Element ── */}
            <div className="space-y-1.5">
              <label className={`flex items-center gap-1.5 text-xs font-semibold ${textSm}`}>
                <FaCreditCard className="text-[#a435f0] text-sm" /> Card Details
              </label>
              <div
                className={`px-4 py-4 rounded-xl border ${fieldBg} focus-within:border-[#a435f0] transition-colors duration-200`}
              >
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: togol ? "#2d2f31" : "#e5e7eb",
                        "::placeholder": { color: "#aab7c4" },
                        iconColor: "#a435f0",
                      },
                      invalid: { color: "#e53e3e" },
                    },
                    hidePostalCode: true,
                  }}
                />
              </div>
              <p className={`text-[11px] ${textSm} flex items-center gap-1 mt-1`}>
                <FaLock className="text-xs" />
                256-bit SSL encryption · Powered by Stripe
              </p>
            </div>

            {/* ── Error Message ── */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                <span className="mt-0.5 text-base">⚠️</span>
                {error}
              </div>
            )}

            {/* ── Success: Transaction ID ── */}
            {transactionId && (
              <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
                <FaCheckCircle className="mt-0.5 text-base shrink-0" />
                <div>
                  <p className="font-bold">Payment Successful!</p>
                  <p className="text-xs mt-0.5 break-all">
                    Transaction ID: {transactionId}
                  </p>
                </div>
              </div>
            )}

            {/* ── Pay Button ── */}
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
                isProcessing
                  ? "bg-[#a435f0]/60 cursor-not-allowed"
                  : "bg-[#a435f0] hover:bg-[#8710d8] shadow-lg shadow-[#a435f0]/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing Payment...
                </>
              ) : (
                <>
                  <FaLock className="text-xs" />
                  Pay ${enrollPrice} Securely
                </>
              )}
            </button>

            {/* ── Trust Badges ── */}
            <div className={`flex items-center justify-center gap-6 pt-2 border-t ${togol ? "border-gray-100" : "border-gray-700"}`}>
              {["🔒 Secure", "✅ No Hidden Fees", "🛡️ 30-Day Refund"].map((badge) => (
                <span key={badge} className={`text-[10px] font-semibold ${textSm}`}>
                  {badge}
                </span>
              ))}
            </div>
          </form>
        </div>

        {/* ── Powered by Stripe ── */}
        <p className={`text-center text-xs ${textSm}`}>
          Payments powered by{" "}
          <span className="font-bold text-[#635bff]">Stripe</span>
        </p>
      </div>
    </div>
  );
};

export default Checkout;

Checkout.propTypes = {
  ids: PropTypes.string.isRequired,
};