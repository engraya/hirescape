import { GiShoppingBag } from "react-icons/gi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { mockJobs } from "@/mockData/mockJobs";
import { MdVerified } from "react-icons/md";
const Jobs = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex justify-between px-4 pt-4">
        <h2 className="text-2xl font-bold">Created Jobs</h2>
      </div>
      <div className="p-4">
        <div className="m-auto w-full overflow-y-auto rounded-lg border bg-white p-4">
          <div className="my-3 grid grid-cols-2 items-center p-2 text-sm font-semibold text-slate-600 sm:grid-cols-3 md:grid-cols-5">
            <span>Title</span>
            <span className="hidden sm:block">Company</span>
            <span className="hidden md:block">Location</span>
            <span className="hidden md:block">Salary</span>
            <span className="hidden md:block">Applicants</span>
          </div>
          <ul>
            {mockJobs.map((job) => (
              <li
                key={job.id}
                className="my-2 grid grid-cols-2 items-center rounded-lg bg-slate-50 p-3 text-sm hover:bg-slate-100 sm:grid-cols-3 md:grid-cols-5"
              >
                <div className="flex items-center">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <GiShoppingBag className="text-blue-500" />
                  </div>
                  <div className="pl-3">
                    <p className="font-bold text-slate-700">{job.title}</p>
                  </div>
                </div>
                <p className="hidden sm:block text-slate-700">{job.company}</p>
                <p className="hidden md:block text-slate-600">{job.location}</p>
                <p className="hidden md:block text-slate-700">{job.salary}</p>
                <div className="hidden md:flex items-center justify-between">
                  <p>{job.applicants}</p>
                  <div className="inline-flex items-center justify-between space-x-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm">
                    <MdVerified className="text-green-500" />
                    <div className="select-none">
                      Applied
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
