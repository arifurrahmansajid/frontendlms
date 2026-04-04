import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useAxiosSecure from "../../useHooks/useAxiosSecure";
import { useEffect } from "react";
import useContexHooks from "../../useHooks/useContexHooks";
import PreLoader from "../../components/PreLoader";
import {
  FaUserTie,
  FaStar,
  FaUsers,
  FaCheckCircle,
  FaPlayCircle,
  FaArrowLeft,
  FaShoppingCart,
  FaClock,
  FaMobileAlt,
  FaInfinity,
  FaCertificate,
} from "react-icons/fa";

const Details = () => {
  const { id } = useParams();
  const { setEnrollPrice, togol } = useContexHooks(); // togol=true → light, false → dark
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: classDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (classDetails?.price) setEnrollPrice(classDetails.price);
  }, [setEnrollPrice, classDetails]);

  if (isLoading) return <PreLoader />;

  if (error) {
    toast.error("Failed to load class details.");
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg font-semibold">
        Error loading class details.
      </div>
    );
  }

  if (!classDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No class details available.
      </div>
    );
  }

  const { title, name, price, image, description, schedule } = classDetails;
  const originalPrice = (parseFloat(price || 0) * 1.6).toFixed(0);

  const highlights = [
    "Full lifetime access on all devices",
    "Certificate of completion included",
    "Downloadable resources & source files",
    "Expert instructor with live Q&A",
    "Beginner to advanced content",
    "Regular content updates",
  ];

  // Theme tokens
  const pageBg = togol ? "bg-[#f7f9fa]" : "bg-[#111827]";
  const cardBg = togol ? "bg-white border-gray-100" : "bg-[#1e1e2e] border-[#2d2d3d]";
  const textPrimary = togol ? "text-[#2d2f31]" : "text-white";
  const textSecondary = togol ? "text-[#6a6f73]" : "text-gray-400";
  const divider = togol ? "border-gray-100" : "border-gray-700";
  const rowBg = togol ? "bg-gray-50" : "bg-gray-800/40";

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>
      <Helmet>
        <title>{title} | EduHub Course Details</title>
      </Helmet>

      {/* ── Hero Dark Banner ── always dark for contrast */}
      <div className="bg-[#1c1d1f] text-white py-10 md:py-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#a435f0]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#6d28d9]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium mb-6 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </button>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 space-y-5">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Link to="/allclasses" className="hover:text-[#a435f0] transition-colors">
                  All Courses
                </Link>
                <span>›</span>
                <span className="text-gray-300 truncate max-w-[200px]">{title}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                {title}
              </h1>

              {/* Short Description */}
              {description && (
                <p className="text-gray-300 text-base leading-relaxed line-clamp-3">
                  {description}
                </p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-5 text-sm">
                <div className="flex items-center gap-1.5 text-[#eceb98]">
                  <FaStar />
                  <span className="font-bold">4.8</span>
                  <span className="text-gray-400">(1,234 ratings)</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <FaUsers className="text-gray-400" />
                  <span>
                    {classDetails.enroll > 0
                      ? `${classDetails.enroll} students enrolled`
                      : "Be the first to enroll!"}
                  </span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#a435f0] flex items-center justify-center">
                  <FaUserTie className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Instructor</p>
                  <p className="font-semibold text-white">{name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10 items-start">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">

            {/* Mobile image */}
            <div className="lg:hidden rounded-2xl overflow-hidden shadow-xl">
              <img src={image} alt={title} className="w-full object-cover" />
            </div>

            {/* What You'll Learn */}
            <div className={`${cardBg} rounded-2xl p-6 shadow-sm border`}>
              <h2 className={`text-xl font-bold ${textPrimary} mb-5 flex items-center gap-2`}>
                <FaCheckCircle className="text-[#a435f0] text-base" />
                What You&apos;ll Learn
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map((point, i) => (
                  <div key={i} className={`flex items-start gap-2.5 text-sm ${textPrimary}`}>
                    <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0 text-xs" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Description */}
            <div className={`${cardBg} rounded-2xl p-6 shadow-sm border`}>
              <h2 className={`text-xl font-bold ${textPrimary} mb-4`}>
                Course Description
              </h2>
              <p className={`${textSecondary} text-sm leading-relaxed whitespace-pre-line`}>
                {description || "No description provided yet. Check back soon!"}
              </p>
            </div>

            {/* Schedule */}
            {schedule && schedule.length > 0 && (
              <div className={`${cardBg} rounded-2xl p-6 shadow-sm border`}>
                <h2 className={`text-xl font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
                  <FaPlayCircle className="text-[#a435f0] text-base" />
                  Course Schedule
                </h2>
                <ul className="space-y-3">
                  {schedule.map((item, index) => (
                    <li
                      key={index}
                      className={`flex items-center gap-3 p-3 ${rowBg} rounded-lg text-sm ${textPrimary}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-[#a435f0]/10 text-[#a435f0] flex items-center justify-center text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instructor Card */}
            <div className={`${cardBg} rounded-2xl p-6 shadow-sm border`}>
              <h2 className={`text-xl font-bold ${textPrimary} mb-5`}>
                About the Instructor
              </h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#a435f0] to-[#6d28d9] flex items-center justify-center shrink-0 shadow-lg">
                  <FaUserTie className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${textPrimary}`}>{name}</h3>
                  <p className="text-[#a435f0] text-sm font-medium mb-2">Course Instructor</p>
                  <div className={`flex items-center gap-4 text-sm ${textSecondary}`}>
                    <span className="flex items-center gap-1">
                      <FaStar className="text-[#eceb98] text-xs" /> 4.8 Rating
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUsers className="text-xs" /> {classDetails.enroll || 0}+ Students
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Sticky Purchase Card */}
          <div className="lg:sticky lg:top-6 space-y-4">

            {/* Course Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl hidden lg:block">
              <div className="relative group">
                <img
                  src={image}
                  alt={title}
                  className="w-full object-cover aspect-video"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <FaPlayCircle className="text-[#a435f0] text-2xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Box */}
            <div className={`${cardBg} rounded-2xl shadow-xl overflow-hidden border`}>
              {/* Price Header */}
              <div className="bg-gradient-to-br from-[#a435f0] to-[#6d28d9] p-5 text-white">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black tracking-tight">${price}</span>
                  <div>
                    <span className="text-white/60 text-lg line-through">${originalPrice}</span>
                    <span className="ml-2 bg-[#eceb98] text-[#2d2f31] text-xs font-black px-2 py-0.5 rounded">
                      40% OFF
                    </span>
                  </div>
                </div>
                <p className="text-white/70 text-xs mt-1 font-medium">
                  🔥 Limited time offer — don&apos;t miss out!
                </p>
              </div>

              <div className="p-5 space-y-4">
                {/* Enroll CTA */}
                <Link
                  to={`/payment/${id}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#a435f0] hover:bg-[#8710d8] text-white rounded-xl font-bold text-sm tracking-wide transition-colors duration-200 shadow-lg shadow-[#a435f0]/30"
                >
                  <FaShoppingCart />
                  Enroll Now — Pay ${price}
                </Link>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className={`flex-1 h-px ${togol ? "bg-gray-100" : "bg-gray-700"}`} />
                  <span className={`text-xs ${textSecondary} font-medium`}>includes</span>
                  <div className={`flex-1 h-px ${togol ? "bg-gray-100" : "bg-gray-700"}`} />
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {[
                    { icon: <FaInfinity className="text-[#a435f0]" />, text: "Full lifetime access" },
                    { icon: <FaMobileAlt className="text-[#a435f0]" />, text: "Access on mobile & desktop" },
                    { icon: <FaCertificate className="text-[#a435f0]" />, text: "Certificate of completion" },
                    { icon: <FaClock className="text-[#a435f0]" />, text: "Self-paced learning" },
                  ].map((feat, i) => (
                    <li key={i} className={`flex items-center gap-3 text-sm ${textPrimary}`}>
                      <span className="text-base">{feat.icon}</span>
                      {feat.text}
                    </li>
                  ))}
                </ul>

                <p className={`text-center text-xs ${textSecondary} font-medium pt-1`}>
                  🛡️ 30-Day Money-Back Guarantee
                </p>
              </div>
            </div>

            {/* Wishlist / Share */}
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`flex items-center justify-center gap-2 py-2.5 border rounded-xl text-xs font-semibold transition-colors ${
                  togol
                    ? "border-gray-200 text-gray-600 hover:border-[#a435f0] hover:text-[#a435f0]"
                    : "border-gray-700 text-gray-400 hover:border-[#a435f0] hover:text-[#a435f0]"
                }`}
              >
                ♡ Wishlist
              </button>
              <button
                className={`flex items-center justify-center gap-2 py-2.5 border rounded-xl text-xs font-semibold transition-colors ${
                  togol
                    ? "border-gray-200 text-gray-600 hover:border-[#a435f0] hover:text-[#a435f0]"
                    : "border-gray-700 text-gray-400 hover:border-[#a435f0] hover:text-[#a435f0]"
                }`}
              >
                ↗ Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
