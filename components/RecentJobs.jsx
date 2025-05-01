import { useEffect, useState } from "react";
import { GiShoppingBag } from "react-icons/gi";
import { getJobs } from "@/lib/api";

const SkeletonJob = () => (
  <li className="my-3 flex items-center gap-4 rounded-lg bg-slate-100 p-2 animate-pulse">
    <div className="h-10 w-10 rounded-lg bg-rose-200"></div>
    <div className="flex flex-col gap-2">
      <div className="h-4 w-32 rounded bg-slate-300" />
      <div className="h-3 w-20 rounded bg-slate-200" />
    </div>
    <div className="ml-auto h-4 w-16 rounded bg-slate-200 hidden lg:block" />
  </li>
);

const RecentOrders = ({ token }) => {
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        setLoading(true);
        const jobs = await getJobs(token);
        console.log("Jobs:", jobs);
        const sorted = jobs
          .filter((job) => job?.createdAt)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 8);
        setRecentJobs(jobs);
      } catch (err) {
        console.error("Failed to fetch recent jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentJobs();
  }, [token]);

  return (
    <div className="relative col-span-1 m-auto h-[50vh] w-full overflow-scroll rounded-lg border bg-white p-4 lg:h-[70vh]">
      <h1 className="text-lg font-semibold mb-2">Recent Jobs</h1>

      {loading ? (
        <ul>
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonJob key={idx} />
          ))}
        </ul>
      ) : recentJobs.length > 0 ? (
        <ul>
          {recentJobs.map((job) => (
            <li
              key={job._id}
              className="my-3 flex cursor-pointer items-center rounded-lg bg-slate-50 p-2 hover:bg-slate-100"
            >
              <div className="rounded-lg bg-rose-50 p-2">
                <GiShoppingBag className="text-rose-500" />
              </div>
              <div className="pl-4">
                <p className="font-bold text-slate-700">{job.title}</p>
                <p className="text-sm text-slate-400">{job.company}</p>
              </div>
              <p className="absolute right-6 text-sm text-gray-600 md:hidden lg:flex">
                {job.salary || "N/A"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No recent jobs found.</p>
      )}
    </div>
  );
};

export default RecentOrders;
