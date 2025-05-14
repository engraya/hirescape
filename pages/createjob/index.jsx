import React from 'react'
import { useState } from 'react'
import { useUser } from "@/context/userContext";
import { toast } from "react-toastify";
import { createJob } from '@/lib/api';
import { useRouter } from 'next/router';
function CreateJob() {

      const { user } = useUser();
      const [loading, setLoading] = useState(false);
      const router = useRouter();
      const [form, setForm] = useState({
        title: '',
        company: '',
        salary: '',
        location: '',
        description: '',
        jobType: 'full-time',
        experienceLevel: 'junior',
        industry: '',
        applicationDeadline: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
      };
    
      const handleCreate = async (e) => {
        e.preventDefault();
        const token = user?.token;
    
        if (!token) {
          toast.error("You must be logged in to create a job.");
          return;
        }
    
        try {
          setLoading(true);
          await createJob(
            form.title,
            form.company,
            form.salary,
            form.location,
            form.jobType,
            form.experienceLevel,
            form.industry,
            form.description,
            form.applicationDeadline,
            token
          );
          toast.success("Job created successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          router.push("/jobs");
          // Optionally reset the form
          setForm({
            title: '',
            company: '',
            salary: '',
            location: '',
            description: '',
            jobType: 'full-time',
            experienceLevel: 'junior',
            industry: '',
            applicationDeadline: '',
          });
        } catch (error) {
          toast.error(error.message || "Failed to create job", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        } finally {
          setLoading(false);
        }
      };
    
  return (
    <div className="bg-white border rounded-lg shadow relative w-full max-w-4xl mx-auto mt-6">
    <form onSubmit={handleCreate} className="p-6 space-y-6">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
          <input type="text" name="title" id="title" value={form.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
          <input type="text" name="company" id="company" value={form.company} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary Range</label>
          <input type="text" name="salary" id="salary" value={form.salary} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="$23,000 - $102,000" required />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" name="location" id="location" value={form.location} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type</label>
          <select name="jobType" id="jobType" value={form.jobType} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">Experience Level</label>
          <select name="experienceLevel" id="experienceLevel" value={form.experienceLevel} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
          <input type="text" name="industry" id="industry" value={form.industry} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">Application Deadline</label>
          <input
            type="datetime-local"
            name="applicationDeadline"
            id="applicationDeadline"
            value={form.applicationDeadline}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div className="col-span-full">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            name="description"
            id="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Describe the responsibilities, team, technologies, etc."
            required
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-6 py-2 rounded-lg">
        {loading ? 'Creating...' : 'Create Job'}
        </button>
      </div>
    </form>
  </div>
  )
}

export default CreateJob