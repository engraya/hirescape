import React from 'react';

function Footer() {
  return (
    <footer className="container mx-auto px-3 mt-48 text-gray-800 bg-gray-100 py-6">
      <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-3 mx-auto">
        <div className="p-5">
          <h3 className="font-bold text-xl text-[#0EA5E9]">Hirescape</h3>
          <p className="mt-3 text-sm text-gray-600">
            Empowering businesses to find the best talent. Let us help you grow.
          </p>
        </div>
        <div className="p-5">
          <div className="text-sm uppercase text-[#0EA5E9] font-bold">Resources</div>
          <a className="my-3 block" href="/#">Job Postings</a>
          <a className="my-3 block" href="/#">How It Works</a>
          <a className="my-3 block" href="/#">Blog</a>
        </div>
        <div className="p-5">
          <div className="text-sm uppercase text-[#0EA5E9] font-bold">Support</div>
          <a className="my-3 block" href="/#">Help Center</a>
          <a className="my-3 block" href="/#">Privacy Policy</a>
          <a className="my-3 block" href="/#">Terms & Conditions</a>
        </div>
        <div className="p-5">
          <div className="text-sm uppercase text-[#0EA5E9] font-bold">Contact Us</div>
          <a className="my-3 block" href="/#">1234 Hiring St, San Francisco, CA</a>
          <a className="my-3 block" href="mailto:contact@hirescape.com">contact@hirescape.com</a>
        </div>
      </div>
      <div className="flex justify-center items-center mx-auto my-5 text-center text-gray-600">
        © 2025 Hirescape. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
