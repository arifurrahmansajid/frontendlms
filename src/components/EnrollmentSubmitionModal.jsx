import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useContexHooks from "../useHooks/useContexHooks";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const EnrollmentSubmitionModal = ({
  assignmentId,
  classId,
  closeModal,
  refetch,
}) => {
  const { user } = useContexHooks();
  const AxiosSecure = useAxiosSecure();

  const createPorst = async (newpost) => {
    const res = await AxiosSecure.post(`/assignment-submit`, newpost);
    return res.data;
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: createPorst,
    onSuccess: () => {
      toast.success("Submission successful!");
      refetch();
      reset();
    },
    onError: () => {
      toast.error("Failed to submit assignment.");
    },
  });

  const handleAssignment = (data) => {
    console.log(data, assignmentId);
    const info = {
      assignmentId,
      classId,
      email: user?.email,
      assignment_url: data.assignmentUrl,
    };
    console.log(info);
    mutation.mutateAsync(info);
  };

  return (
    <div>
      <dialog id="my_modal_4" className="modal" open>
        <div className="modal-box w-11/12 max-w-4xl rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Submit Your Assignment
          </h2>
          <form onSubmit={handleSubmit(handleAssignment)} className="space-y-4">
            <div className="form-control">
              <label
                htmlFor="assignmentUrl"
                className="block text-sm font-medium mb-1"
              >
                Assignment URL
              </label>
              <input
                id="assignmentUrl"
                type="url"
                placeholder="Enter your assignment URL"
                {...register("assignmentUrl", {
                  required: "Assignment URL is required",
                })}
                className={`input input-bordered w-full border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.assignmentUrl ? "border-red-500" : ""
                }`}
              />
              {errors.assignmentUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.assignmentUrl.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#4CAF50] hover:bg-[#388E3C] w-full  text-white px-6 py-3 rounded-lg text-lg font-medium transition-all text-center"
            >
              Submit Assignment
            </button>
          </form>
          <div className="modal-action mt-4">
            <button
              className="btn btn-secondary py-2 px-4 rounded-md border-[#4CAF50] text-gray-700 bg-gray-200 hover:bg-[#4CAF50] hover:border-[#4CAF50] transition duration-200"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

EnrollmentSubmitionModal.propTypes = {
  assignmentId: PropTypes.string,
  classId: PropTypes.string,
  closeModal: PropTypes.func,
  refetch: PropTypes.func,
};

export default EnrollmentSubmitionModal;
