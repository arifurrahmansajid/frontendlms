import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaHeading, FaDollarSign, FaAlignLeft, FaTimes, FaCheckCircle } from "react-icons/fa";
import imageUpload from "../useHooks/imageUpload";
import useContexHooks from "../useHooks/useContexHooks";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";

const TeacherClsDetaisModal = ({ classData, refetch, onClose }) => {
  const { user } = useContexHooks();
  const axiosSecure = useAxiosSecure();
  const [isUpdating, setIsUpdating] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      const { image, ...fromData } = data;
      let imgUrl = classData.image;

      if (image && image[0]) {
        imgUrl = await imageUpload(image[0]);
      }
      
      fromData.image = imgUrl;

      const res = await axiosSecure.patch(`/update-class/${classData._id}?email=${user?.email}`, fromData);
      
      if (res.data.modifiedCount > 0) {
        toast.success("Class updated successfully!", {
          className: "rounded-2xl font-bold",
          position: "top-center"
        });
        reset();
        setPreview(null);
        setSelectedFileName("");
        refetch();
        onClose();
      } else {
        toast.info("No changes were made.");
        onClose();
      }
    } catch (err) {
      console.error("Update failed:", err.message);
      toast.error("Failed to update class. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const inputClasses = "w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-gray-700 placeholder:text-gray-400";
  const labelClasses = "text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1";

  return (
    <dialog id="update_class_modal" className="modal modal-open !z-[100] backdrop-blur-sm bg-black/20">
      <div className="modal-box w-11/12 max-w-3xl p-0 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Modal Header */}
        <div className="px-8 py-6 bg-indigo-600 text-white flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black tracking-tight">Update Class</h3>
            <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mt-1">Refining Your Curriculum</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors shadow-sm"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label className={labelClasses}>Class Title</label>
              <div className="relative">
                <FaHeading className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  defaultValue={classData.title}
                  placeholder="Enter class title"
                  className={`${inputClasses} pl-12`}
                  {...register("title", { required: "Title is required" })}
                />
              </div>
              {errors.title && <p className="text-rose-500 text-xs font-bold mt-2 ml-1">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label className={labelClasses}>Enrollment Fee</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    type="number"
                    defaultValue={classData.price}
                    placeholder="0.00"
                    className={`${inputClasses} pl-12`}
                    {...register("price", { required: "Price is required" })}
                  />
                </div>
                {errors.price && <p className="text-rose-500 text-xs font-bold mt-2 ml-1">{errors.price.message}</p>}
              </div>

              {/* Image */}
              <div>
                <label className={labelClasses}>Replace Image</label>
                <div className="relative group">
                  <input
                    type="file"
                    className="hidden"
                    id="update-image-upload"
                    {...register("image", {
                      onChange: handleImageChange
                    })}
                  />
                  <label 
                    htmlFor="update-image-upload"
                    className={`w-full flex items-center justify-between border-2 border-dashed rounded-2xl px-5 py-[14px] cursor-pointer transition-all ${
                      preview 
                        ? "bg-indigo-50/50 border-indigo-400" 
                        : "bg-gray-50 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {preview ? (
                        <div className="relative h-8 w-8 rounded-lg overflow-hidden flex-shrink-0 border border-indigo-200">
                          <img src={preview} alt="preview" className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <FaCloudUploadAlt className="text-gray-300 group-hover:text-indigo-500 transition-colors text-xl flex-shrink-0" />
                      )}
                      <span className={`font-medium truncate text-sm ${preview ? "text-indigo-700" : "text-gray-400"}`}>
                        {selectedFileName || "Change photo..."}
                      </span>
                    </div>
                    {preview && <FaCheckCircle className="text-indigo-500 flex-shrink-0 ml-2" />}
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelClasses}>Description</label>
              <div className="relative">
                <FaAlignLeft className="absolute left-5 top-5 text-gray-300" />
                <textarea
                  defaultValue={classData.description}
                  placeholder="Describe your class..."
                  rows="4"
                  className={`${inputClasses} pl-12 resize-none`}
                  {...register("description", { required: "Description is required" })}
                />
              </div>
              {errors.description && <p className="text-rose-500 text-xs font-bold mt-2 ml-1">{errors.description.message}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 order-2 sm:order-1 bg-gray-100 text-gray-500 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="flex-[1.5] order-1 sm:order-2 bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none uppercase tracking-widest text-sm"
              >
                {isUpdating ? "Saving Changes..." : "Apply Updates"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

TeacherClsDetaisModal.propTypes = {
  classData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default TeacherClsDetaisModal;


