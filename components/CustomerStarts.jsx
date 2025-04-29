import React from 'react';

function CustomerStats() {
  return (
    <section id="stats" className="py-20 lg:pt-32">
      <div className="container mx-auto text-center">
        <p className="uppercase tracking-wider text-gray-600">Our success speaks for itself</p>
        <div className="flex flex-col sm:flex-row mt-8 lg:px-24">
          <div className="w-full sm:w-1/3">
            <p className="text-4xl lg:text-6xl font-semibold text-[#0EA5E9]">+75%</p>
            <p className="font-semibold mb-6">Job Post Engagement</p>
            <p className="text-gray-600">Our clients see a 75% increase in applicant engagement within the first month of using Hirescape.</p>
          </div>
          <div className="w-full sm:w-1/3">
            <p className="text-4xl lg:text-6xl font-semibold text-[#0EA5E9]">+50%</p>
            <p className="font-semibold mb-6">Applications Per Job</p>
            <p className="text-gray-600">Companies using Hirescape receive 50% more applications per job post compared to industry standards.</p>
          </div>
          <div className="w-full sm:w-1/3">
            <p className="text-4xl lg:text-6xl font-semibold text-[#0EA5E9]">+30%</p>
            <p className="font-semibold mb-6">Successful Hires</p>
            <p className="text-gray-600">On average, employers make 30% more successful hires with candidates that match the job requirements.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerStats;
