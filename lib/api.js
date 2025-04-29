import axios from "axios";

const API_BASE_URL = "https://jobnest-jx9f.onrender.com/api/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
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
      const response = await axios.post(`${API_BASE_URL}/register`, {
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
    const response = await axios.get(`${API_BASE_URL}/users`, {
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
