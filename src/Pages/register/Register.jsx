import Lottie from "lottie-react";
import registerLottie from "../register/register.json";
import { FaEye, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useContexHooks from "../../useHooks/useContexHooks";
import { useState } from "react";
import { PiEyeClosedFill } from "react-icons/pi";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Register = () => {
  const navigate = useNavigate();
  const [passTogol, setPassTogol] = useState(true);
  const queryClient = useQueryClient();
  const { createUser, googleLogin, updateUserProfile, setUser } = useContexHooks();
  const axiosPublic = useAxiosPublic();
  
  const createPost = async (newpost) => {
    const response = await axiosPublic.post("/users", newpost);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const successNofity = () => {
    toast.success("Successfully Created Account!", {
      position: "top-center",
    });
  };

  const errorNofity = (text = "Error Notification") => {
    toast.error(text, {
      position: "top-left",
    });
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const onSubmit = (data) => {
    const { name, imgUrl, email, password } = data;

    if (!passwordRegex.test(password)) {
      errorNofity(
        "Your password must be at least 6 characters long and include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        if (result.user) {
          setUser(result.user);
          const userInfo = {
            name: name,
            email: email.toLowerCase(),
            image: imgUrl,
            role: "student",
          };
          mutation.mutateAsync(userInfo);
          updateUserProfile(name, imgUrl).then(() => {
            successNofity();
            navigate("/");
            reset();
            setUser((prev) => ({
              ...prev,
              displayName: name,
              photoURL: imgUrl,
            }));
          });
        }
      })
      .catch((err) => errorNofity(err.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email.toLowerCase(),
          image: user.photoURL,
          role: "student",
        };
        mutation.mutateAsync(userInfo);
        navigate("/");
        toast.success("Successfully logged in with Google!", {
          position: "top-center",
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-left",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>EduHub | Register</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Lottie Animation Section */}
        <div className="w-full lg:w-1/2 p-8 hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="w-full max-w-md">
            <Lottie animationData={registerLottie} loop={true} />
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Join Our Community!</h2>
              <p className="text-gray-600 mt-2">Create an account to start your learning journey</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 mt-2">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Photo URL
                </label>
                <input
                  id="imgUrl"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  {...register("imgUrl", { required: "Photo URL is required" })}
                />
                {errors.imgUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.imgUrl.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={passTogol ? "password" : "text"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-10"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setPassTogol(!passTogol)}
                  >
                    {passTogol ? <PiEyeClosedFill size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Must be 6+ characters with uppercase, lowercase, number, and special character
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg mt-4"
            >
              Create Account
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR CONTINUE WITH</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <FaGoogle className="text-blue-600" size={18} />
            Register with Google
          </button>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-blue-600 hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;