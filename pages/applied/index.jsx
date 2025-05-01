import { AiFillDelete } from "react-icons/ai";
import { useState, useEffect, useCallback } from "react";
import { GiShoppingBag } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import { getUserAppliedJobs } from "@/lib/api"; // Assuming it's correctly defined
import { useUser } from "@/context/userContext";
import DeleteJobModal from "@/components/Modals/DeleteJobModal";
import { deleteAppliedJobByUser } from "@/lib/api";
import { toast } from "react-toastify";
function AppliedJobs() {
  const { user } = useUser(); // Adjust if your auth context is different
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);


  const fetchUserJobs = useCallback(async () => {
    setLoading(true);
    try {
      const userJobs = await getUserAppliedJobs(user?.token);
      setJobs(userJobs);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch user applied jobs");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserJobs();
  }, [fetchUserJobs]);

  const handleOpenModal = (jobId) => {
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  const handleApply = async () => {
    if (!selectedJobId) return;
    setDeleteLoading(true);
    try {
      await deleteAppliedJobByUser(selectedJobId, user?.token);
      handleCloseModal();
      fetchUserJobs()
      toast.success('Job Deleted successful!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } catch (err) {
      console.error("Delete failed:", err.message);
      toast.error(err.message, {
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
      setDeleteLoading(false);
    }
  };

  


  return (
    <div className="min-h-screen bg-slate-100">
    <div className="flex justify-between px-4 pt-4">
      <h2 className="text-2xl font-bold">Applied Jobs</h2>
    </div>
    <div className="p-4">
      <div className="m-auto w-full overflow-y-auto rounded-lg border bg-white p-4">
        <div className="my-3 grid grid-cols-2 items-center p-2 text-sm font-semibold text-slate-600 sm:grid-cols-3 md:grid-cols-6">
          <span>Title</span>
          <span className="hidden sm:block">Company</span>
          <span className="hidden md:block">Location</span>
          <span className="hidden md:block">Salary</span>
          <span className="hidden md:block">Applicants</span>
          <span className="hidden md:block">Date</span>
        </div>
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            <div className="flex justify-center items-center py-8">
              <img
                className="w-10 h-10 animate-spin"
                src="https://www.svgrepo.com/show/70469/loading.svg"
                alt="Loading icon"
              />
             </div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No jobs created by you yet.</div>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li
                key={job._id}
                className="my-2 grid grid-cols-2 items-center rounded-lg bg-slate-50 p-3 text-sm hover:bg-slate-100 sm:grid-cols-3 md:grid-cols-6"
              >
                <div className="flex items-center">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <GiShoppingBag className="text-blue-500" />
                  </div>
                  <div className="pl-3">
                    <p className="font-bold text-slate-700">{job.title}</p>
                  </div>
                </div>
                <p className="hidden sm:block text-slate-700">{job.company || "N/A"}</p>
                <p className="hidden md:block text-slate-600">{job.location || "N/A"}</p>
                <p className="hidden md:block text-slate-700">{job.salary || "N/A"}</p>
                <p className="hidden md:block text-slate-700">{job.applicants?.length || 0}</p>
                <div className="hidden md:flex items-center justify-between">
                  <p>
                  {new Date(job.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                  })}
                  </p>
                  <button
                      onClick={() => handleOpenModal(job._id)}
                      className="inline-flex items-center justify-between space-x-1 bg-red-500 text-white px-2 py-0.5 rounded-md text-sm"
                    >
                      <AiFillDelete className="text-gray-100" />
                      <div className="select-none">Delete</div>
                    </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
     {/* DeleteJob Modal */}
     <DeleteJobModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={handleApply}
        loading={deleteLoading}
      />
  </div>
  )
}

export default AppliedJobs