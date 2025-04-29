"use client";

import Link from "next/link";
import { useState } from "react";
import { GiTripleCorn } from "react-icons/gi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { registerUser } from "@/lib/api";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: ({ firstName, lastName, email, password, confirmPassword }) => registerUser(firstName, lastName, email, password, confirmPassword),
    onSuccess: () => {
      toast.success('Registration successful!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.warn("Please fill out all fields.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      return;
    }

    registerMutation.mutate({ firstName, lastName, email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex justify-between px-4">
        <div className="min-h-screen flex items-center justify-center mx-auto">
          <div className="w-full py-3">
            <div className="w-full px-8 py-3 text-left rounded-xl shadow-lg">
              <div className="flex flex-col justify-center items-center h-full select-none">
                <div className="flex flex-col items-center justify-center gap-2">
                  <GiTripleCorn size={22} />
                  <p className="m-0 text-[16px] font-semibold text-gray-900">Register a New Account</p>
                  <span className="m-0 text-xs max-w-[90%] text-center text-gray-700">
                    Get started with our app, just start section and enjoy the experience.
                  </span>
                </div>

                <div className="w-full flex flex-col gap-2 mt-6">
                  <label className="font-semibold text-xs text-gray-800">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500"
                    placeholder="First Name"
                  />
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="font-semibold text-xs text-gray-800">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500"
                    placeholder="Last Name"
                  />
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="font-semibold text-xs text-gray-800">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500"
                    placeholder="Email"
                  />
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="font-semibold text-xs text-gray-800">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500"
                      placeholder="••••••••"
                    />
                    <div
                      className="absolute right-3 top-1/3 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="font-semibold text-xs text-gray-800">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500"
                      placeholder="••••••••"
                    />
                    <div
                      className="absolute right-3 top-1/3 transform -translate-y-1/2 cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleRegister}
                  disabled={registerMutation.isLoading}
                  className="py-1 px-8 bg-[#0EA5E9] hover:bg-[#215268] focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
                >
                  {registerMutation.isLoading ? (
                    <div className="flex justify-center items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                        />
                      </svg>
                      <span>Registering...</span>
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-center text-sm text-gray-600 gap-3">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#0EA5E9] hover:text-blue-800 font-semibold transition-colors duration-200">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
