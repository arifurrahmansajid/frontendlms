import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaFan,
} from "react-icons/fa";
import SectionHeader from "./SectionHeader";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useContexHooks from "../useHooks/useContexHooks";

const Contact = () => {
  const [sentEmail, setSentEmail] = useState(false);
  const { togol } = useContexHooks();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setSentEmail(false);
    toast.info("Contact form is currently disabled. Please use the contact details above.");
    reset();
  };

  return (
    <div className="my-4">
      <Helmet>
        <title>EduHub | Contact info</title>
      </Helmet>
      <div className="container mx-auto px-6">
        <SectionHeader title={"Contact Us"} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Details */}
          <div className="flex flex-col gap-6">
            <h3
              className={`text-2xl font-semibold ${
                togol ? "text-gray-700" : "text-white"
              }`}
            >
              Get in Touch
            </h3>
            <p className={`${togol ? "text-gray-600" : "text-white"}`}>
              Feel free to reach out to us for any inquiries, feedback, or
              assistance.
            </p>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-[#4CAF50] text-2xl" />
              <p className={`${togol ? "text-gray-700" : "text-white"}`}>
                123 Main Street, Dhaka, Bangladesh
              </p>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-[#4CAF50]  text-2xl" />
              <p className={`${togol ? "text-gray-700" : "text-white"}`}>
                +880 123 456 7890
              </p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-[#4CAF50]  text-2xl" />
              <p className={`${togol ? "text-gray-700" : "text-white"}`}>
                mhneloy708@gmail.com
              </p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="text-white bg-[#4CAF50]  p-3 rounded-full hover:bg-blue-700"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-white bg-[#4CAF50] p-3 rounded-full hover:bg-blue-700"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-white bg-[#4CAF50] p-3 rounded-full hover:bg-blue-700"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">
              Mail Us Your Message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  name="to_name"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  {...register("to_name", { required: "Name is required" })}
                />
                {errors.to_name && (
                  <p className="text-red-500">{errors.to_name.message}</p>
                )}
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  name="from_email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  {...register("from_email", { required: "Email is required" })}
                />
                {errors.from_email && (
                  <p className="text-red-500">{errors.from_email.message}</p>
                )}
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your Message</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Enter your message"
                  className="textarea textarea-bordered w-full"
                  {...register("message", { required: "Message is required" })}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500">{errors.message.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#4CAF50] hover:bg-[#388E3C] w-full text-white px-6 py-3 rounded-lg text-lg font-medium transition-all flex justify-center"
              >
                {sentEmail ? (
                  <FaFan className="animate-spin" />
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
