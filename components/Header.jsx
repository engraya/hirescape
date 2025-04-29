import React from "react";
import { useUser } from '@/context/userContext';
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const Header = () => {
    const { user, logout } = useUser(); 
    const router = useRouter();

      const handleLogout = () => {
        logout(); // Clear user from context/localStorage
        toast.success('Logged out successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        router.push("/"); // Redirect to home
      };
  return (
    <div className="flex justify-between px-4 pt-4">
      <h2 className="hidden md:flex text-2xl font-bold">Dashboard</h2>
      <h2>Welcome back, <span className='text-base font-bold'>{user?.user?.firstName}</span></h2>
      <button
        className="flex justify-center items-center py-1 px-4 text-sm bg-red-600 hover:bg-red-800 rounded text-white"
        onClick={handleLogout}
      >
        <span className="font-semibold">
            Logout
        </span>
     </button>
    </div>
  );
};

export default Header;
