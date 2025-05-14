import React, { useState } from 'react';

function CreateJobModal({ isOpen, onClose, onCreateJob }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onCreateJob) {
      onCreateJob(form);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white border rounded-lg shadow relative w-full max-w-4xl mx-auto">
      <div className="flex items-start justify-between p-5 border-b rounded-t">
        <h3 className="text-xl font-semibold">Create New Job</h3>
        <button
          type="button"
          className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto"
          onClick={onClose}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              rows={5}
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
            Create Job
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default CreateJobModal;
