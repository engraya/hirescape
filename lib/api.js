import axios from "axios";

const API_BASE_URL = "https://jobnest-jx9f.onrender.com/api";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Register User function
export const registerUser = async (firstName, lastName, email, password, confirmPassword) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

// Get Users function
export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/users`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log("Users",response.data.users); // Log the response data for debugging
    return response.data?.users;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};


// Get Jobs function
export const getJobs = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs`);
    return response.data?.jobs;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch jobs");
  }
};

// Get jobs created by the logged-in user
export const getUserCreatedJobs = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs/user/created`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include user token
      },
    });
    return response.data?.jobs;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user jobs");
  }
};


// Get jobs the user has applied to
export const getUserAppliedJobs = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs/user/applied`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include user token
      },
    });
    return response.data?.jobs;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch applied jobs");
  }
};


// Apply to a job
export const applyToJob = async (jobId, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/jobs/apply/${jobId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include user token
        },
      }
    );
    return response.data?.message || "Application successful";
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to apply for job");
  }
};


// Delete an applied job by the user
export const deleteAppliedJobByUser = async (jobId, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/jobs/applied/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.message || "Applied job deleted successfully";
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete applied job");
  }
};

// Delete a created job by the user
export const deleteCreatedJobByUser = async (jobId, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/jobs/created/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.message || "Created job deleted successfully";
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete created job");
  }
};



