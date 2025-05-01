import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaNetworkWired } from "react-icons/fa";
import { MdAddChart, MdPerson, MdShoppingCart } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { HiUsers } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { useUser } from '@/context/userContext';
import { toast } from "react-toastify";


const Sidebar = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  const { user, logout } = useUser(); 

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

  // Define sidebar items
  const sidebarItems = [
    { href: "/", icon: <FaHome size={22} /> },
    { href: "/dashboard", icon: <AiFillDashboard size={22} /> },
    { href: "/users", icon: <HiUsers size={22} /> },
    { href: "/jobs", icon: <MdAddChart size={22} /> },
    { href: "/createdjobs", icon: <MdWork size={22} /> },
    { href: "/applied", icon: <FaNetworkWired size={22} /> },
    { href: "/logout", icon: <TbLogout size={22} /> },
  ];

  return (
    <div className="flex">
      <div className="fixed flex h-screen w-20 flex-col justify-between border-r bg-white p-4">
        <div className="flex flex-col items-center">
          {sidebarItems.map(({ href, icon }, index) => (
            <div key={index}>
            {href === "/logout" ? (
              <div
                onClick={handleLogout}
                className={`my-4 inline-block cursor-pointer rounded-lg p-3 
                  ${pathname === href ? "bg-[#0EA5E9] text-white" : "bg-slate-100 text-slate-600 hover:bg-gray-300"}`}
              >
                {icon}
              </div>
            ) : (
              <Link href={href}>
                <div
                  className={`my-4 inline-block cursor-pointer rounded-lg p-3 
                    ${pathname === href ? "bg-[#0EA5E9] text-white" : "bg-slate-100 text-slate-600 hover:bg-gray-300"}`}
                >
                  {icon}
                </div>
              </Link>
            )}
          </div>
         
          ))}
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
