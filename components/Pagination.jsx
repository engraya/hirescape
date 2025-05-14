function Pagination({ currentPage, totalJobs, jobsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
      <div className="flex items-center justify-between flex-col sm:flex-row">
        <div className="mb-4 sm:mb-0">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * jobsPerPage + 1}</span>
            {" "}to{" "}
            <span className="font-medium">
              {Math.min(currentPage * jobsPerPage, totalJobs)}
            </span>{" "}
            of <span className="font-medium">{totalJobs}</span> results
          </p>
        </div>
        <div>
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md"
            >
              Prev
            </button>
            {pages.map((num) => (
              <button
                key={num}
                onClick={() => onPageChange(num)}
                className={`px-4 py-2 border text-sm font-medium ${
                  num === currentPage
                    ? "bg-indigo-50 text-indigo-600 border-indigo-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-r-md"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default Pagination