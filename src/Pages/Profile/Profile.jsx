import Lottie from "lottie-react";
import { FaEnvelope, FaPhoneAlt, FaUser } from "react-icons/fa";
import userAnimation from "./profile.json";
import PreLoader from "../../components/PreLoader";
import useAxiosSecure from "../../useHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useContexHooks from "../../useHooks/useContexHooks";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import ProfileUpdateModal from "../../components/ProfileUpdateModal";

const Profile = () => {
  const { user, logOut } = useContexHooks();
  const [openModal, setOpenModal] = useState(false);

  const axiosSecure = useAxiosSecure();

  // Fetch basic profile info
  const {
    data: profile,
    isFetching: profileFetching,
    refetch: refetchProfile,
    error: profileError,
  } = useQuery({
    queryKey: ["profileData", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      try {
        const res = await axiosSecure.get(`/user/profile/${user.email}`);
        return res.data;
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch profile overview."
        );
      }
    },
    enabled: !!user?.email,
  });

  // Dynamically fetch Role-Based stats (Admin, Teacher, Student)
  const { data: stats, isFetching: statsFetching } = useQuery({
    queryKey: ["profileStats", profile?.role, user?.email],
    enabled: !!profile?.role || !!user?.email,
    queryFn: async () => {
      const role = profile?.role?.toLowerCase() || "student";

      if (role === "admin") {
        const res = await axiosSecure.get("/totalCount");
        return {
          title: "Platform Overview",
          stat1Label: "Total Users",
          stat1Value: res.data.alluser || 0,
          stat2Label: "Classes Approved",
          stat2Value: res.data.allClasses || 0,
        };
      } else if (role === "teacher") {
        const res = await axiosSecure.get(`/findClass/${user?.email}`);
        const classes = res.data || [];
        const totalEnroll = classes.reduce((acc, curr) => acc + (parseInt(curr.enroll) || 0), 0);
        return {
          title: "Teaching Impact",
          stat1Label: "Classes Created",
          stat1Value: classes.length,
          stat2Label: "Total Students",
          stat2Value: totalEnroll,
        };
      } else {
        // Fallback or student
        const res = await axiosSecure.get(`/Enrollclasses/${user?.email}`);
        const enrolled = res.data || [];
        return {
          title: "Learning Progress",
          stat1Label: "Courses Enrolled",
          stat1Value: enrolled.length,
          stat2Label: "Active Learning",
          stat2Value: enrolled.length > 0 ? enrolled.length : 0, 
        };
      }
    },
  });

  if (profileFetching) {
    return <PreLoader />;
  }

  if (profileError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <p className="text-2xl font-bold text-red-500 mb-2">Error Loading Profile</p>
        <p className="text-red-400">{profileError.message || "An unknown error occurred."}</p>
      </div>
    );
  }

  const { name, role, email, phone } = profile || {};

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Helmet>
        <title>EduHub | My Profile</title>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-10">
          {/* Cover Banner */}
          <div className="h-56 bg-gradient-to-r from-[#2d2f31] via-[#3a3e42] to-[#2d2f31] relative">
            <div className="absolute inset-0 opacity-20" 
                 style={{ 
                   backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.9) 2px, transparent 0)', 
                   backgroundSize: '50px 50px' 
                 }}>
            </div>
          </div>

          <div className="px-8 md:px-12 pb-10">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 gap-8">
              {/* Avatar */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-white rounded-full shadow-xl"></div>
                <img
                  src={user?.photoURL || "https://i.ibb.co.com/8mPyLrB/user.png"}
                  alt={name || "User"}
                  className="relative w-40 h-40 rounded-full object-cover border-[6px] border-white shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left mt-6 md:mt-0">
                <h1 className="text-4xl font-bold text-[#2d2f31] tracking-tight">
                  {name || "Anonymous Member"}
                </h1>
                
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-3">
                  <span className="px-5 py-1.5 bg-[#a435f0]/10 text-[#a435f0] text-sm font-semibold uppercase tracking-widest rounded-full">
                    {role || "Student"}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 font-medium">Verified Member</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-0">
                <button
                  onClick={handleOpenModal}
                  className="px-8 py-3 bg-[#2d2f31] text-white font-semibold rounded-2xl hover:bg-black transition-all active:scale-95 shadow-lg"
                >
                  Edit Profile
                </button>
                <button
                  onClick={logOut}
                  className="px-8 py-3 border border-red-500 text-red-500 font-semibold rounded-2xl hover:bg-red-50 transition-all active:scale-95"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Overview Stats */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative min-h-[220px]">
              {statsFetching ? (
                <div className="flex w-full h-full items-center justify-center min-h-[150px]">
                  <span className="loading loading-spinner text-[#a435f0] loading-lg"></span>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-[#2d2f31] mb-8">{stats?.title || "Overview"}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100 flex flex-col justify-center items-center">
                      <p className="text-4xl font-bold text-[#a435f0]">{stats?.stat1Value || 0}</p>
                      <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-wide">{stats?.stat1Label}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100 flex flex-col justify-center items-center">
                      <p className="text-4xl font-bold text-emerald-500">{stats?.stat2Value || 0}</p>
                      <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-wide">{stats?.stat2Label}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Account Details */}
          <div className="lg:col-span-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-[#a435f0]/10 rounded-2xl">
                  <FaUser className="text-[#a435f0] text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2d2f31]">Account Information</h2>
                  <p className="text-gray-500">Manage your personal details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                  <p className="text-[#2d2f31] text-xl font-semibold">{name || "Not Specified"}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-[#a435f0]" />
                    <p className="text-[#2d2f31] text-xl font-semibold break-all">{email || "Not Linked"}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Phone Number</label>
                  <div className="flex items-center gap-3">
                    <FaPhoneAlt className="text-[#a435f0]" />
                    <p className="text-[#2d2f31] text-xl font-semibold">{phone || "Not Provided"}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">System Role</label>
                  <p className="text-[#2d2f31] text-xl font-semibold capitalize">{role || "Student"}</p>
                </div>
              </div>

              {/* Note Section */}
              <div className="mt-14 pt-10 border-t border-gray-100">
                <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
                  <p className="text-sm leading-relaxed text-amber-800">
                    <span className="font-bold">Pro Tip: </span> 
                    {role === "admin" 
                      ? "As an admin, ensure your contact details remain up-to-date so platform notifications can reach you securely."
                      : role === "teacher" 
                        ? "Keeping your profile updated helps students trust your courses and allows us to recommend you correctly."
                        : "Keeping your profile updated helps us recommend better courses and allows instructors to reach out when needed."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <ProfileUpdateModal refetch={refetchProfile} closeModal={handleCloseModal} />
      )}
    </div>
  );
};

export default Profile;