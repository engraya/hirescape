import React from 'react'

function DeleteJobModal({ isOpen, onClose, onApply, loading }) {
  return (
    <>
    {isOpen && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all max-w-xs w-full">
          <h3 className="text-lg font-bold text-center mb-4">
            Are you sure you want to delete this job?
          </h3>
          <div className="flex justify-center gap-4">
            <button
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className={`flex items-center justify-center gap-2 bg-gradient-to-r from-pink-400 to-red-500 text-white font-bold py-2 px-4 rounded ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              onClick={onApply}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  )
}

export default DeleteJobModal