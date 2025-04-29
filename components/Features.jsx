import React from "react";

function Features() {
  return (
    <section id="features" className="py-20 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
          Features
        </h2>
        <div className="flex flex-col sm:flex-row sm:-mx-3 mt-12">
          {/* Feature 1 */}
          <div className="flex-1 px-3">
            <div
              className="p-10 rounded-lg bg-white border border-gray-200 mb-8 shadow-md"
              style={{ boxShadow: "0 10px 28px rgba(0,0,0,.05)" }}
            >
              <p className="font-semibold text-xl text-[#0EA5E9]">Post & Manage Jobs</p>
              <p className="mt-4 text-gray-600">
                Easily create, update, and delete job listings with a powerful dashboard for complete control over postings.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex-1 px-3">
            <div
              className="p-10 rounded-lg bg-white border border-gray-200 mb-8 shadow-md"
              style={{ boxShadow: "0 10px 28px rgba(0,0,0,.05)" }}
            >
              <p className="font-semibold text-xl text-[#0EA5E9]">Applicant Tracking</p>
              <p className="mt-4 text-gray-600">
                Keep tabs on applications in real time. View applicant profiles, sort by qualifications, and manage responses efficiently.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex-1 px-3">
            <div
              className="p-10 rounded-lg bg-white border border-gray-200 mb-8 shadow-md"
              style={{ boxShadow: "0 10px 28px rgba(0,0,0,.05)" }}
            >
              <p className="font-semibold text-xl text-[#0EA5E9]">AI Matching</p>
              <p className="mt-4 text-gray-600">
                Leverage smart matching technology to connect the right candidates to the right roles—fast and accurately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
