// TopCards.tsx
import React, { useEffect, useState } from "react";
import {
  getUsers,
  getJobs,
  getUserCreatedJobs,
  getUserAppliedJobs,
} from "@/lib/api"; // Adjust the import path to your project structure

const TopCards = ({ token }) => {
  const [usersCount, setUsersCount] = useState(null);
  const [jobsCount, setJobsCount] = useState(null);
  const [createdJobsCount, setCreatedJobsCount] = useState(null);
  const [appliedJobsCount, setAppliedJobsCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        const [users, jobs, createdJobs, appliedJobs] = await Promise.all([
          getUsers(token),
          getJobs(token),
          getUserCreatedJobs(token),
          getUserAppliedJobs(token),
        ]);
        setUsersCount(users.length);
        setJobsCount(jobs.length);
        setCreatedJobsCount(createdJobs.length);
        setAppliedJobsCount(appliedJobs.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCounts();
    }
  }, [token]);

  const cardItems = [
    { label: "Total Users", value: usersCount, change: "+8%" },
    { label: "Total Jobs", value: jobsCount, change: "+2%" },
    { label: "Created Jobs", value: createdJobsCount, change: "+5%" },
    { label: "Applied Jobs", value: appliedJobsCount, change: "+3%" },
  ];

  return (
    <div className="grid gap-4 p-4 lg:grid-cols-8">
      {cardItems.map((item, index) => (
        <div
          key={index}
          className="col-span-1 flex w-full justify-between rounded-lg border bg-white p-4 lg:col-span-2"
        >
          <div className="flex w-full flex-col pb-4">
            {loading ? (
              <div className="h-6 w-16 animate-pulse rounded bg-gray-200 mb-2"></div>
            ) : (
              <p className="text-2xl font-bold">{item.value}</p>
            )}
            <p className="text-gray-700">{item.label}</p>
          </div>
          {loading ? (
            <div className="my-1 h-8 w-12 animate-pulse rounded-lg bg-gray-200" />
          ) : (
            <p className="my-1 flex min-w-[55px] items-center justify-center rounded-lg bg-blue-200 p-2 font-semibold">
              <span>{item.change}</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopCards;
