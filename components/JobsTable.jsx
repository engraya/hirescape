import React, { useEffect, useState, useCallback } from 'react';
import JobSvg from './JobSvg'
import Pagination from './Pagination'
import { getJobs, applyToJob, getUserAppliedJobs } from '@/lib/api';
import ApplyJobModal from './Modals/ApplyJobModal';
import { useUser } from "@/context/userContext";
import { toast } from "react-toastify";
import { MdVerified } from "react-icons/md";
function JobsTable() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useUser(); // Adjust if your auth context is different

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applyLoading, setApplyLoading] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);


  const [appliedJobIds, setAppliedJobIds] = useState([]);


  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const [allJobs, userJobs] = await Promise.all([
        getJobs(), // All jobs
        getUserAppliedJobs(user?.token) // Applied jobs
      ]);
      setJobs(allJobs || []);
      setAppliedJobIds(userJobs.map(job => job._id)); // Extract job IDs
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);




  const handleApply = async () => {
    if (!selectedJobId) return;
    try {
      setApplyLoading(true);
      const token = user?.token; 
      await applyToJob(selectedJobId, token);
      toast.success('Application successful!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      fetchJobs();
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } finally {
      setApplyLoading(false);
      setIsModalOpen(false);
      setSelectedJobId(null);
    }
  };
  

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);


  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };


  return (
 <div className="w-full flex items-center justify-center min-h-full px-4 pt-4">
      <div className="container">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Job Listings</h2>
                <p className="text-gray-500 mt-1">Browse and manage open positions available on the HireScape platform.</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="bg-[#0EA5E9] hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out">
                  Add Job
                </button>
              </div>
            </div>
            {/* Search and Filter */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input type="text" className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full" placeholder="Search Jobs..." />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Job", "Salary", "Location", "Type", "Experience", "Industry", "Deadline", "Actions"].map(header => (
                    <th
                      key={header}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header === "Actions" ? "text-right" : ""}`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                  <td colSpan="8">
                    <div className="flex justify-center items-center py-8">
                      <img
                        className="w-10 h-10 animate-spin"
                        src="https://www.svgrepo.com/show/70469/loading.svg"
                        alt="Loading icon"
                      />
                    </div>
                  </td>
                </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : jobs.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No jobs found.
                    </td>
                  </tr>
                ) : (
                  jobs.map(job => (
                    <tr key={job._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <JobSvg />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-500">{job.company || "Unknown Company"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.salary || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.location || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.jobType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.experienceLevel}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.industry || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(job.applicationDeadline).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {appliedJobIds.includes(job._id) ? (
                            <div className="inline-flex items-center justify-between space-x-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm"> 
                              <MdVerified className="text-green-500" />
                              <div className="select-none">Applied</div>
                            </div>
                          ) : (
                          <button
                            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-1 px-2 rounded"
                            onClick={() => {
                              setSelectedJob(job);
                              setSelectedJobId(job._id); // <-- Add this line
                              setIsModalOpen(true);
                            }}
                          >
                            Apply
                          </button>

                          )}
                        </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <Pagination />
        </div>
      </div>
      
      {/* ApplyJob Modal */}
      <ApplyJobModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={handleApply}
        loading={applyLoading}
      />
    </div>

  )
}

export default JobsTable