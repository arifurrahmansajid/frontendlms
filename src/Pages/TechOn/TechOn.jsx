import { useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaCheckCircle, FaLock, FaUsers, FaVideo } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useContexHooks from "../../useHooks/useContexHooks";
import imageUpload from "../../useHooks/imageUpload";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../useHooks/useAxiosSecure";
import PreLoader from "../../components/PreLoader";
import useAdmin from "../../privateRouts/useAdmin";
import Container from "../../Sharecomponent/Container";
import { useState } from "react";
import instructorImg from "../../assets/become_instructor.png";

const TeachOn = () => {
  const { user, togol } = useContexHooks();
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();
  const [currentStep, setCurrentStep] = useState(1); // 1 = Fee, 2 = Form
  const [previewImage, setPreviewImage] = useState(null);

  const {
    data: isTeacher,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/teacherReq/${user?.email}`);
        return res.data;
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch classes."
        );
      }
    },
  });

  const createPost = async (newpost) => {
    const response = await axiosSecure.post("/teacher", newpost);
    return response.data;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Your application has been submitted successfully!", {
        position: "top-center",
      });
      reset();
      refetch();
    },
    onError: (error) => {
      toast.error(`Submission failed: ${error.message}`, {
        position: "top-center",
      });
    },
  });

  const onSubmit = async (data) => {
    const { image, ...formData } = data;
    try {
      const imgUrl = await imageUpload(image[0]);
      formData.image = imgUrl;
    } catch (err) {
      toast.error("Image upload failed. Please try again.");
      return;
    }
    formData.status = "pending";
    formData.email = user.email;
    try {
      mutation.mutateAsync(formData);
    } catch (err) {
      console.error("Submission failed:", err.message);
    }
  };

  if (isFetching) return <PreLoader />;
  if (error) return <p className="text-2xl text-red-500">{error.message}</p>;

  const handlePurchase = () => {
    toast.info("Package selected! Now fill out your profile.", { position: "top-center" });
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>EduHub | Teach on</title>
      </Helmet>

      {/* Modern Hero Section */}
      <div className="bg-gradient-to-br from-[#2d2f31] to-[#1a1c1e] py-20 md:py-28 text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tighter">
              Share your knowledge.<br />Inspire the world.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of expert instructors teaching millions of students and earning real income.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

            {/* Left Side - Benefits */}
            <div className="lg:w-5/12 space-y-12">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src={instructorImg} 
                  alt="Become an Instructor" 
                  className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>

              <div className="space-y-10">
                <div className="flex gap-5">
                  <div className="bg-purple-100 p-4 rounded-2xl h-fit">
                    <FaVideo className="text-[#a435f0] text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#2d2f31] mb-3">Teach your way</h3>
                    <p className="text-[#6a6f73] leading-relaxed">
                      Publish the course you want, in the way you want, and always have full control over your content.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="bg-purple-100 p-4 rounded-2xl h-fit">
                    <FaUsers className="text-[#a435f0] text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#2d2f31] mb-3">Inspire learners</h3>
                    <p className="text-[#6a6f73] leading-relaxed">
                      Help students explore their passions, gain valuable skills, and advance their careers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Application Portal */}
            <div className="lg:w-7/12">
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">

                {/* Status Message */}
                {(isTeacher === "pending" || isTeacher === "approved") && (
                  <div className={`mb-10 p-8 rounded-2xl text-center ${
                    isTeacher === "approved" 
                      ? "bg-green-50 border border-green-200" 
                      : "bg-blue-50 border border-blue-200"
                  }`}>
                    <FaCheckCircle className={`mx-auto mb-5 w-16 h-16 ${isTeacher === "approved" ? "text-green-600" : "text-blue-600"}`} />
                    <h2 className="text-3xl font-bold mb-3 text-[#2d2f31]">
                      {isTeacher === "approved" ? "Congratulations!" : "Application Under Review"}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {isTeacher === "approved" 
                        ? "You are now an official instructor. Start creating your first course today!" 
                        : "Thank you for applying. Our team is reviewing your application and will notify you soon."}
                    </p>
                  </div>
                )}

                {(!isTeacher || isTeacher === "reject") && (
                  <>
                    {/* Fixed Modern Stepper */}
                    <div className="flex items-center justify-center mb-12">
                      {/* Step 1: PACKAGE */}
                      <div className="flex flex-col items-center">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm
                          ${currentStep === 1 
                            ? 'bg-[#2d2f31] text-white' 
                            : currentStep > 1 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-200 text-gray-400'
                          }`}>
                          {currentStep > 1 ? (
                            <FaCheckCircle className="text-2xl" />
                          ) : (
                            <span className="text-2xl font-semibold">1</span>
                          )}
                        </div>
                        <p className={`mt-3 text-sm font-semibold tracking-widest ${currentStep === 1 ? 'text-[#2d2f31]' : 'text-gray-500'}`}>
                          PACKAGE
                        </p>
                      </div>

                      {/* Connecting Line */}
                      <div className="flex-1 max-w-[140px] h-px bg-gray-300 mx-8 mt-6" />

                      {/* Step 2: PROFILE */}
                      <div className="flex flex-col items-center">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm
                          ${currentStep === 2 
                            ? 'bg-[#2d2f31] text-white' 
                            : 'bg-gray-200 text-gray-400'
                          }`}>
                          <span className="text-2xl font-semibold">2</span>
                        </div>
                        <p className={`mt-3 text-sm font-semibold tracking-widest ${currentStep === 2 ? 'text-[#2d2f31]' : 'text-gray-500'}`}>
                          PROFILE
                        </p>
                      </div>
                    </div>

                    {currentStep === 1 ? (
                      /* Step 1: Package Selection */
                      <div className="space-y-8">
                        <div className="text-center mb-8">
                          <h2 className="text-3xl font-bold text-[#2d2f31]">Instructor Application Package</h2>
                          <p className="text-gray-600 mt-3">One-time fee to unlock instructor features</p>
                        </div>

                        <div className="border-2 border-[#a435f0] bg-[#a435f0]/5 rounded-3xl p-10 relative overflow-hidden">
                          <div className="absolute top-6 right-6 bg-[#a435f0] text-white text-xs font-bold px-5 py-1.5 rounded-full">POPULAR</div>
                          
                          <div className="flex justify-between items-end mb-8">
                            <div>
                              <p className="text-lg font-semibold text-gray-700">Standard Application</p>
                              <p className="text-5xl font-bold text-[#2d2f31] mt-1">$5</p>
                            </div>
                            <span className="text-sm text-gray-500">one time</span>
                          </div>

                          <ul className="space-y-4 mb-10">
                            <li className="flex items-center gap-3 text-gray-700">
                              <FaCheckCircle className="text-green-500 flex-shrink-0" /> Professional review within 48 hours
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                              <FaCheckCircle className="text-green-500 flex-shrink-0" /> Full access to powerful course builder
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                              <FaCheckCircle className="text-green-500 flex-shrink-0" /> Dedicated instructor support
                            </li>
                          </ul>

                          <button 
                            onClick={handlePurchase}
                            className="w-full py-4 bg-[#a435f0] hover:bg-[#8710d8] text-white font-semibold text-lg rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg"
                          >
                            <FaLock /> Purchase & Continue
                          </button>
                        </div>

                        <p className="text-center text-xs text-gray-400">🔒 Secure payment powered by Stripe</p>
                      </div>
                    ) : (
                      /* Step 2: Application Form */
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-[#2d2f31] mb-2">Full Name</label>
                            <input
                              type="text"
                              {...register("name", { required: "Name is required" })}
                              placeholder="Enter your full name"
                              className="w-full px-5 py-3.5 border border-gray-300 focus:border-[#a435f0] rounded-2xl focus:ring-0 outline-none transition-all"
                            />
                            {errors.name && <p className="text-red-600 text-sm mt-1.5">{errors.name.message}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-[#2d2f31] mb-2">Profile Photo</label>
                            <label className="border-2 border-dashed border-gray-300 hover:border-[#a435f0] transition-all rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden bg-gray-50/50">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                {...register("image", { 
                                    required: "Image is required",
                                    onChange: (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setPreviewImage(reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }
                                })}
                              />
                              
                              {previewImage ? (
                                <div className="relative w-full aspect-square max-h-[200px] rounded-xl overflow-hidden">
                                    <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FaCloudUploadAlt className="text-white text-3xl" />
                                        <p className="text-white text-xs font-bold ml-2">Change Photo</p>
                                    </div>
                                </div>
                              ) : (
                                <>
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <FaCloudUploadAlt className="text-3xl text-[#a435f0]" />
                                    </div>
                                    <p className="text-sm text-[#2d2f31] font-bold">Click or drag to upload your profile picture</p>
                                    <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG (Max 5MB)</p>
                                </>
                              )}
                            </label>
                            {errors.image && <p className="text-red-600 text-sm mt-2 font-bold flex items-center gap-1"><span className="w-1 h-1 bg-red-600 rounded-full" /> {errors.image.message}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-[#2d2f31] mb-2">Experience Level</label>
                            <select
                              {...register("experience", { required: "Experience is required" })}
                              className="w-full px-5 py-3.5 border border-gray-300 focus:border-[#a435f0] rounded-2xl focus:ring-0 outline-none"
                            >
                              <option value="">Select your experience level</option>
                              <option value="beginner">Beginner (0-1 year)</option>
                              <option value="mid-level">Mid-Level (1-3 years)</option>
                              <option value="experienced">Experienced (3+ years)</option>
                            </select>
                            {errors.experience && <p className="text-red-600 text-sm mt-1.5">{errors.experience.message}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-[#2d2f31] mb-2">Teaching Title</label>
                            <input
                              type="text"
                              {...register("title", { required: "Title is required" })}
                              placeholder="e.g. Senior React Developer & UI/UX Designer"
                              className="w-full px-5 py-3.5 border border-gray-300 focus:border-[#a435f0] rounded-2xl focus:ring-0 outline-none"
                            />
                            {errors.title && <p className="text-red-600 text-sm mt-1.5">{errors.title.message}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-[#2d2f31] mb-2">Primary Category</label>
                            <select
                              {...register("category", { required: "Category is required" })}
                              className="w-full px-5 py-3.5 border border-gray-300 focus:border-[#a435f0] rounded-2xl focus:ring-0 outline-none"
                            >
                              <option value="">Choose main teaching category</option>
                              <option value="web-development">Web Development</option>
                              <option value="digital-marketing">Digital Marketing</option>
                              <option value="data-science">Data Science</option>
                              <option value="graphic-design">Graphic Design</option>
                            </select>
                            {errors.category && <p className="text-red-600 text-sm mt-1.5">{errors.category.message}</p>}
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={mutation.isLoading || isAdmin}
                          className="w-full py-4 bg-[#2d2f31] hover:bg-black text-white font-semibold text-lg rounded-2xl transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
                        >
                          {mutation.isLoading ? "Submitting Application..." : "Submit Application for Review"}
                        </button>
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TeachOn;