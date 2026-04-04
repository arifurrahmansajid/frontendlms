import PropTypes from "prop-types";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
// import StarRatings from "react-star-ratings";
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import useContexHooks from "../useHooks/useContexHooks";
import PreLoader from "./PreLoader";

const FeedbackModal = ({ classId, closeFeedbackModal }) => {
  const { user } = useContexHooks();
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(3);
  // fetch the class by classId
  const {
    data: singleClass,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["singleClass"],
    queryFn: async () => {
      const res = axiosSecure.get(`/classes/${classId}`);
      return (await res).data;
    },
  });

  const createPost = async (newPost) => {
    const res = await axiosSecure.post(`/student-feedback/${classId}`, newPost);
    return res.data;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      toast.success("Feedback submitted successfully:", data);
      closeFeedbackModal();
      reset();
    },
    onError: (error) => {
      toast.error("Error submitting feedback:", error);
    },
  });

  if (isFetching) {
    return <PreLoader />;
  }
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  const handleRatingChange = (newRation) => {
    setRating(newRation);
  };
  // Handle form submission
  const handleOnnSubmit = (data) => {
    data.rating = rating;
    data.name = user?.displayName;
    data.email = user?.email;
    data.photo = user?.photoURL;
    data.classId = classId;
    data.title = singleClass.title;
    console.log(data);
    mutation.mutateAsync(data);
  };
  return (
    <div>
      <dialog id="my_modal_4" className="modal" open>
        <div className="modal-box w-11/12 max-w-5xl">
          <form onSubmit={handleSubmit(handleOnnSubmit)}>
            {/* Star Rating Field */}
            <div className="my-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Rate Us
              </label>
              <ReactStars
                count={5}
                onChange={handleRatingChange}
                size={40}
                activeColor="#009933"
              />
              ,
            </div>
            {/* Feedback Textarea */}
            <div className="my-4">
              <label
                htmlFor="feedback"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Your Feedback
              </label>
              <textarea
                id="feedback"
                {...register("description", {
                  required: "Feedback Text is required",
                })}
                placeholder="Enter your feedback here..."
                className="textarea textarea-bordered w-full h-24"
                required
              />
              {errors && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit and Close Buttons */}
            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-200"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                className="btn btn-secondary py-2 px-4 rounded-md border-[#4CAF50] text-gray-700 bg-gray-200 hover:bg-[#4CAF50] hover:border-[#4CAF50] transition duration-200"
                onClick={closeFeedbackModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default FeedbackModal;
FeedbackModal.propTypes = {
  closeFeedbackModal: PropTypes.func,
  classId: PropTypes.string,
};
