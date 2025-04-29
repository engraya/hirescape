import { useQuery } from "react-query";
import { GiCharacter } from "react-icons/gi";
import { getUsers } from "@/lib/api";
import { useUser } from "@/context/userContext";
import Loader from "@/components/Loader";
const Users = () => {
  const { user } = useUser(); // Assuming user contains the token after login
  // Fetch users using React Query's useQuery
  const { data: users, isLoading, isError, error } = useQuery(
    "users",
    () => getUsers(user?.token), // Pass the token from the user context
    {
      enabled: !!user?.token, // Only fetch if the token is available
    }
  );

  if (isLoading) return <div className="min-h-screen bg-slate-100 flex items-center justify-center">
    <Loader />
  </div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex justify-between px-4 pt-4">
        <h2 className="text-2xl font-bold">Users</h2>
      </div>
      <div className="p-4">
        <div className="m-auto w-full overflow-x-auto rounded-lg border bg-white p-4">
          <div className="my-3 grid grid-cols-2 items-center gap-2 p-2 text-sm font-semibold text-slate-600 sm:grid-cols-3 lg:grid-cols-6">
            <span>Name</span>
            <span className="hidden sm:block">First Name</span>
            <span className="hidden sm:block">Last Name</span>
            <span className="hidden sm:block">Email</span>
            <span className="hidden md:block">Created Jobs</span>
            <span className="hidden md:block">Applied Jobs</span>
          </div>
          <ul>
            {users?.map((user) => (
              <li
                key={user._id}
                className="my-2 grid grid-cols-2 items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm hover:bg-slate-100 sm:grid-cols-3 lg:grid-cols-6"
              >
                <div className="flex items-center">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <GiCharacter className="text-blue-500" />
                  </div>
                  <p className="pl-3 font-medium text-gray-800 whitespace-nowrap">
                    {user.firstName + " " + user.lastName}
                  </p>
                </div>
                <p className="hidden sm:block text-slate-700 truncate">{user.firstName}</p>
                <p className="hidden sm:block text-slate-700 truncate">{user.lastName}</p>
                <p className="hidden sm:block text-slate-700 truncate">{user.email}</p>
                <p className="hidden md:block text-slate-700">{user.createdJobs?.length || 0}</p>
                <p className="hidden md:block text-slate-700">{user.appliedJobs?.length || 0}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Users;
