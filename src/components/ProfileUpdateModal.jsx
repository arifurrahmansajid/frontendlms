import { useForm } from "react-hook-form";
import useContexHooks from "../useHooks/useContexHooks";
import PropTypes from "prop-types";
import { FaCloudUploadAlt, FaFan } from "react-icons/fa";
import imageUpload from "../useHooks/imageUpload";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";
import SectionHeader from "./SectionHeader";

const ProfileUpdateModal = ({ closeModal, refetch }) => {
  const { user, updateUserProfile } = useContexHooks();
  const [loader, setLoader] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    const { image, ...formData } = data;
    const photourl = await imageUpload(image[0]);
    formData.image = photourl;
    await updateUserProfile(formData.name, formData.image);
    const res = await axiosSecure.patch(
      `/update-profile/${user?.email}`,
      formData
    );
    if (res.data.modifiedCount > 0) {
      toast.success("successfully update the Profile");
      setLoader(false);
      refetch();
      reset();
    }
  };
  return (
    <div>
      <dialog id="my_modal_4" className="modal" open>
        <div className="modal-box w-11/12 max-w-5xl">
          <SectionHeader title={"Update Your Profile"}></SectionHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="photoUrl" className="block">
                Photo
              </label>
              <input
                type="file"
                {...register("image", { required: "Image is required" })}
                className="file-input file-input-bordered w-full"
              />
              <span className="input-group-icon">
                <FaCloudUploadAlt size={20} className="text-gray-500" />
              </span>
              {errors.photoUrl && (
                <p className="text-red-500">{errors.photoUrl.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user?.email}
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
                readOnly
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="number" className="block">
                Phone Number
              </label>
              <input
                id="number"
                type="tel"
                {...register("number", {
                  required: "Phone number is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.number && (
                <p className="text-red-500">{errors.number.message}</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-[#4CAF50] hover:bg-[#388E3C] w-full text-white px-6 py-3 rounded-lg text-lg font-medium transition-all flex justify-center"
              >
                {loader ? <FaFan className="animate-spin" /> : "Update Profile"}
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProfileUpdateModal;
ProfileUpdateModal.propTypes = {
  closeModal: PropTypes.func,
  refetch: PropTypes.func,
};
