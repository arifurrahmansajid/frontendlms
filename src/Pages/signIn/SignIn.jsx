import Lottie from "lottie-react";
import signin from "./signin.json";
import { FaEye, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useContexHooks from "../../useHooks/useContexHooks";
import { useState } from "react";
import { PiEyeClosedFill } from "react-icons/pi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../useHooks/useAxiosPublic";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();
  const [passTogol, setPassTogol] = useState(true);
  const { loginUser, googleLogin } = useContexHooks();

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

  const successNofity = () => {
    toast.success("Successfully Login!", {
      position: "top-center",
    });
  };

  const errorNofity = (error = "password or email is not valid") => {
    toast.error(error, {
      position: "top-left",
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    loginUser(email, password)
      .then((result) => {
        if (result.user) {
          successNofity();
          reset();
          if (location.state) {
            navigate(location.state);
          } else {
            navigate("/");
          }
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
        console.log(userInfo);
        mutation.mutateAsync(userInfo);
        if (location.state) {
          navigate(location.state);
        } else {
          navigate("/");
        }
        successNofity();
      })
      .catch((error) => {
        errorNofity(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>EduHub | SignIn</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Lottie Animation Section */}
        <div className="w-full lg:w-1/2 p-8 hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="w-full max-w-md">
            <Lottie animationData={signin} loop={true} />
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
              <p className="text-gray-600 mt-2">Sign in to access your personalized learning dashboard</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
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
              <div className="flex justify-end mt-1">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              Sign In
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
            Sign in with Google
          </button>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-blue-600 hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;