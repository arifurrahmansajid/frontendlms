import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import teacherAnimation from "./LottieFiles/teacher.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useContexHooks from "../../../useHooks/useContexHooks";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCloudUploadAlt, FaChalkboardTeacher, FaDollarSign, FaAlignLeft, FaHeading, FaCheckCircle } from "react-icons/fa";
import imageUpload from "../../../useHooks/imageUpload";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddClass = () => {
  const { user } = useContexHooks();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const [preview, setPreview] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const createPost = async (newpost) => {
    const response = await axiosSecure.post("/addClass", newpost);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["teacherPosts"]);
      toast.success("Class added successfully!", {
        position: "top-center",
        className: "rounded-2xl font-bold"
      });
      reset();
      setPreview(null);
      setSelectedFileName("");
      navigation("/dashboard/myclass");
    },
    onError: (error) => {
      toast.error(`Submission failed: ${error.message}`, {
        position: "top-center",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
    const { image, ...fromData } = data;
    const imgUrl = await imageUpload(image[0]);
    fromData.image = imgUrl;
    fromData.status = "pending";
    fromData.enroll = 0;
    fromData.assignments = 0;
    fromData.submitedAssignments = 0;
    try {
      mutation.mutateAsync(fromData);
    } catch (err) {
      console.error("Submission failed:", err.message);
    }
  };

  const inputClasses = "w-full bg-white/50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-gray-700 placeholder:text-gray-400";
  const labelClasses = "text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1";

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-6 lg:p-10">
      <Helmet>
        <title>EduHub | Add Class</title>
      </Helmet>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Column: Info & Animation */}
          <div className="w-full lg:w-5/12 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest">
                <FaChalkboardTeacher />
                Instructor Portal
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1]">
                Launch Your <br />
                <span className="text-indigo-600">Next Great Class</span>
              </h1>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Share your knowledge with the world. Fill out the details below to create a high-impact learning experience for your students.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-500/5 blur-3xl rounded-full" />
              <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                <Lottie animationData={teacherAnimation} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-2xl font-black text-gray-900 line-clamp-1">Global</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Reach Students</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-2xl font-black text-gray-900 line-clamp-1">Secure</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Payment System</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
              
              <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-8">
                {/* Title Input */}
                <div>
                  <label className={labelClasses}>Class Title</label>
                  <div className="relative">
                    <FaHeading className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input
                      type="text"
                      placeholder="e.g. Master Modern Web Development"
                      className={`${inputClasses} pl-12`}
                      {...register("title", { required: "Title is required" })}
                    />
                  </div>
                  {errors.title && <p className="text-rose-500 text-xs font-bold mt-2 ml-1">{errors.title.message}</p>}
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Instructor Name</label>
                    <input
                      type="text"
                      value={user?.displayName}
                      {...register("name")}
                      readOnly
                      className={`${inputClasses} bg-gray-50 border-gray-100 cursor-not-allowed`}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Contact Email</label>
                    <input
                      type="email"
                      value={user?.email}
                      {...register("email")}
                      readOnly
                      className={`${inputClasses} bg-gray-50 border-gray-100 cursor-not-allowed`}
                    />
                  </div>
                </div>

                {/* Price & Image Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Enrollment Fee</label>
                    <div className="relative">
                      <FaDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input
                        type="number"
                        placeholder="0.00"
                        className={`${inputClasses} pl-12`}
                        {...register("price", { required: "Price is required" })}
                      />
                    </div>
                    {errors.price && <p className="text-rose-500 text-xs font-bold mt-2 ml-1">{errors.price.message}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>Cover Image</label>
                    <div className="relative group">
                      <input
                        type="file"
                        className="hidden"
                        id="image-upload"
                        {...register("image", { 
                          required: "Image is required",
                          onChange: handleImageChange 
                        })}
                      />
                      <label 
                        htmlFor="image-upload"
                        className={`w-full flex items-center justify-between border-2 border-dashed rounded-2xl px-5 py-[14px] cursor-pointer transition-all ${
                          preview 
                            ? "bg-indigo-50/50 border-indigo-400" 
                            : "bg-white border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30"
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
                            {selectedFileName || "Choose image..."}
                          </span>
                        </div>
                        {preview && <FaCheckCircle className="text-indigo-500 flex-shrink-0 ml-2" />}
                      </label>
                    </div>
                    {errors.image && <p className="text-rose-500 text-xs font-bold mt-2 ml-1">{errors.image.message}</p>}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={labelClasses}>Course Syllabus / Description</label>
                  <div className="relative">
                    <FaAlignLeft className="absolute left-5 top-5 text-gray-300" />
                    <textarea
                      placeholder="What will students learn in this class?"
                      rows="4"
                      className={`${inputClasses} pl-12 resize-none`}
                      {...register("description", { required: "Description is required" })}
                    />
                  </div>
                  {errors.description && <p className="text-rose-500 text-xs font-bold mt-2 ml-1">{errors.description.message}</p>}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-indigo-600 text-white font-black py-5 rounded-[1.5rem] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none uppercase tracking-widest text-sm"
                  >
                    {mutation.isPending ? "Publishing Class..." : "Publish My Class"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;


