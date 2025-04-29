"use client";

import Link from "next/link";
import { useState } from "react";
import { GiTripleCorn } from "react-icons/gi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useUser } from "@/context/userContext"; // adjust as needed
import { loginUser } from "@/lib/api"; // adjust as needed

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login } = useUser();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => loginUser(email, password),
    onSuccess: (userData) => {
      login(userData);
      toast.success('Login successful!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error( error.message || "Login failed", {
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

  const handleLogin = () => {
    if (!email || !password) {
      toast.warn("Please enter both email and password.", {
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
    loginMutation.mutate({ email, password });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex justify-between px-4">
        <div className="min-h-screen flex items-center justify-center mx-auto">
          <div className="w-full py-3">
            <div className="min-h-96 px-8 py-6 text-left rounded-xl shadow-lg">
              <div className="flex flex-col justify-center items-center h-full select-none">
                <div className="flex flex-col items-center justify-center gap-2">
                  <GiTripleCorn size={22} />
                  <p className="m-0 text-[16px] font-semibold text-gray-900">Login to your Account</p>
                  <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                    Get started with our app, just start section and enjoy experience.
                  </span>
                </div>

                <div className="w-full flex flex-col gap-2 mt-6">
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

                <button
                  onClick={handleLogin}
                  disabled={loginMutation.isLoading}
                  className="py-1 px-8 bg-[#0EA5E9] hover:bg-[#215268] text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg cursor-pointer"
                >
                  {loginMutation.isLoading ? (
                    <div className="flex justify-center items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                        />
                      </svg>
                      <span>Logging in</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-center text-sm text-gray-600 space-x-3">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="text-[#0EA5E9] hover:text-blue-800 font-semibold transition-colors duration-200"
                    >
                      Sign up
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

export default LoginPage;
