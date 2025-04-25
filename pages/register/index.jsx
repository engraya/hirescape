import Link from "next/link";
import { useState } from "react";
import { GiTripleCorn } from "react-icons/gi";

function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex justify-between px-4 pt-4">
      <div className="min-h-screen flex items-center justify-center mx-auto">
        <div className="py-3 sm:max-w-xs sm:mx-auto">
          <div className="min-h-96 px-8 py-6 mt-4 text-left rounded-xl shadow-lg">
            <div className="flex flex-col justify-center items-center h-full select-none">
              <div className="flex flex-col items-center justify-center gap-2 mb-8">
                  <GiTripleCorn size={22} />
                <p className="m-0 text-[16px] font-semibold text-gray-900">Register a New Account</p>
                <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">Get started with our app, just start section and enjoy experience.
                </span>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold text-xs text-gray-400 ">Email</label>
                <input className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500" placeholder="Email" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400 ">Password</label>
              <input type="password" className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500" placeholder="••••••••" />
            </div>
            <div classname="mt-5">
              <button className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none">Login</button>
            </div>
            <div className="flex items-center justify-between mt-3">
            <p className="text-center text-sm text-gray-600">
                Don't have an account? 
                <Link href="/register" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">Sign up</Link>
            </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default RegisterPage